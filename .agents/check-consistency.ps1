[CmdletBinding()]
param(
    [string]$Root = (Join-Path $PSScriptRoot '..')
)

$ErrorActionPreference = 'Stop'
$Root = (Resolve-Path -LiteralPath $Root).Path
$errors = [System.Collections.Generic.List[string]]::new()

function Add-Error([string]$Message) {
    $script:errors.Add($Message)
}

function Resolve-RepoPath([string]$RelativePath) {
    $normalized = $RelativePath -replace '/', [IO.Path]::DirectorySeparatorChar
    return Join-Path $Root $normalized
}

function Read-Text([string]$RelativePath) {
    return Get-Content -Raw -LiteralPath (Resolve-RepoPath $RelativePath)
}

function Get-DeclaredVersion([string]$Text, [string]$Path) {
    $match = [regex]::Match($Text, '(?m)^version:\s*([^\s]+)\s*$')
    if (-not $match.Success) {
        $match = [regex]::Match($Text, 'version:\s*([^\s|]+)\s*\|')
    }
    if (-not $match.Success) {
        Add-Error "No version declaration found in $Path."
        return $null
    }
    return $match.Groups[1].Value.Trim("'").Trim('"')
}

$manifestRelative = '.agents/manifest.json'
$manifest = Get-Content -Raw -LiteralPath (Resolve-RepoPath $manifestRelative) | ConvertFrom-Json

foreach ($artifact in $manifest.canonical_artifacts) {
    $path = [string]$artifact.path
    $absolute = Resolve-RepoPath $path
    if (-not (Test-Path -LiteralPath $absolute -PathType Leaf)) {
        Add-Error "Manifest path '$path' does not exist."
        continue
    }
    $actual = Get-DeclaredVersion (Read-Text $path) $path
    if ($actual -and $actual -ne [string]$artifact.version) {
        Add-Error "Manifest version for '$path' is '$($artifact.version)', but the artifact declares '$actual'."
    }
}

$expectedCanonicalArtifacts = @{
    '.agents/software-workflow.md' = 'software-workflow.md'
    '.agents/AGENTS.md' = 'AGENTS.md'
    '.agents/context/project.md' = 'context/project.md'
    '.agents/prompts/plan-create-task.md' = 'prompts/plan-create-task.md'
    '.agents/tasks/_template.md' = 'tasks/_template.md'
}
$canonicalByPath = @{}
foreach ($artifact in @($manifest.canonical_artifacts)) {
    $path = [string]$artifact.path
    if ($expectedCanonicalArtifacts.ContainsKey($path)) {
        if ($canonicalByPath.ContainsKey($path)) {
            Add-Error "Manifest contains duplicate canonical artifact identity '$path'."
        } else {
            $canonicalByPath[$path] = $artifact
        }
    }
}
foreach ($expectedPath in $expectedCanonicalArtifacts.Keys) {
    if (-not $canonicalByPath.ContainsKey($expectedPath)) {
        Add-Error "Manifest is missing expected canonical artifact '$expectedPath'."
    }
}

foreach ($adapterProperty in $manifest.runtime_adapters.psobject.Properties) {
    $adapter = $adapterProperty.Value
    foreach ($path in $adapter.source_files) {
        $path = [string]$path
        if (-not (Test-Path -LiteralPath (Resolve-RepoPath $path) -PathType Leaf)) {
            Add-Error "Manifest runtime source path '$path' does not exist."
            continue
        }
        $actual = Get-DeclaredVersion (Read-Text $path) $path
        if ($actual -and $actual -ne [string]$adapter.version) {
            Add-Error "Manifest version for runtime adapter '$($adapterProperty.Name)' is '$($adapter.version)', but '$path' declares '$actual'."
        }
    }

    $source = [string]$adapter.bootstrap.source
    $target = [string]$adapter.bootstrap.materialization_target
    if (-not (Test-Path -LiteralPath (Resolve-RepoPath $source) -PathType Leaf)) {
        Add-Error "Manifest bootstrap source path '$source' does not exist."
    }
    if ($source -eq $target) {
        Add-Error "Runtime adapter '$($adapterProperty.Name)' conflates retained source '$source' with materialization target '$target'."
    }
}

$readme = Read-Text 'README.md'
$antigravityReadme = Read-Text '.agents/runtime-adapters/antigravity/README.md'
$antigravitySource = '.agents/runtime-adapters/antigravity/rules/antigravity-code-agent-workflow.md'
$staleSource = '.agents/runtime-adapters/antigravity/rules/code-agent-workflow.md'
$target = '.agents/rules/code-agent-workflow.md'

$readmeVersions = @{}
foreach ($expectedPath in $expectedCanonicalArtifacts.Keys) {
    if ($canonicalByPath.ContainsKey($expectedPath)) {
        $readmeVersions[$expectedCanonicalArtifacts[$expectedPath]] = [string]$canonicalByPath[$expectedPath].version
    }
}
foreach ($entry in $readmeVersions.GetEnumerator()) {
    $pattern = '\|\s*`' + [regex]::Escape($entry.Key) + '`\s*\|\s*([^|]+)\s*\|'
    $match = [regex]::Match($readme, $pattern)
    if (-not $match.Success) {
        Add-Error "README version entry for '$($entry.Key)' is missing."
    } elseif ($match.Groups[1].Value.Trim() -ne $entry.Value) {
        Add-Error "README version for '$($entry.Key)' is '$($match.Groups[1].Value.Trim())', but the manifest declares '$($entry.Value)'."
    }
}

if ($readme.Contains($staleSource) -or $antigravityReadme.Contains($staleSource)) {
    Add-Error "A retained Antigravity source reference still uses the stale path '$staleSource'."
}
foreach ($document in @(@('README.md', $readme), @('.agents/runtime-adapters/antigravity/README.md', $antigravityReadme))) {
    if (-not $document[1].Contains($antigravitySource)) {
        Add-Error "$($document[0]) does not identify the retained Antigravity source '$antigravitySource'."
    }
    if (-not $document[1].Contains($target)) {
        Add-Error "$($document[0]) does not identify the Antigravity materialization target '$target'."
    }
}

$sourceText = Read-Text $antigravitySource
if (-not $sourceText.Contains($target)) {
    Add-Error "The retained Antigravity source does not identify materialization target '$target'."
}

function Test-AntigravityTreeUsesMaterializedName([string]$Text) {
    $lines = $Text -split "`r?`n"
    $inTypicalTree = $false
    $inFence = $false
    $treeState = 0

    foreach ($line in $lines) {
        if ($line -match '^Typical resulting repository:\s*$') {
            $inTypicalTree = $true
            continue
        }
        if (-not $inTypicalTree) { continue }
        if ($line -match '^```') {
            $inFence = -not $inFence
            continue
        }
        if (-not $inFence) { continue }

        if ($treeState -eq 0 -and $line -match 'runtime-adapters/') { $treeState = 1; continue }
        if ($treeState -eq 1 -and $line -match 'antigravity/') { $treeState = 2; continue }
        if ($treeState -eq 2 -and $line -match 'rules/') { $treeState = 3; continue }
        if ($treeState -eq 3) {
            return $line -match '(?<!antigravity-)code-agent-workflow\.md\s*$'
        }
    }

    return $false
}

$staleRetainedSourcePatterns = @('runtime-adapters/antigravity/rules[/\\]code-agent-workflow\.md')
if (($staleRetainedSourcePatterns | Where-Object { [regex]::IsMatch($antigravityReadme, $_) }) -or (Test-AntigravityTreeUsesMaterializedName $antigravityReadme)) {
    Add-Error "Antigravity retained source depiction uses materialized filename 'code-agent-workflow.md'; use 'antigravity-code-agent-workflow.md' beneath runtime-adapters/antigravity/rules/."
}

# Validate repository-local Markdown links in the root README. Approved template
# placeholders are content, not links, and therefore do not affect this check.
foreach ($match in [regex]::Matches($readme, '\]\(([^)#]+)(?:#[^)]*)?\)')) {
    $link = $match.Groups[1].Value
    if ($link -match '^(https?|mailto):') { continue }
    if ($link.StartsWith('.agents/') -or $link -eq 'README.md') {
        if (-not (Test-Path -LiteralPath (Resolve-RepoPath $link))) {
            Add-Error "README.md link '$link' does not resolve to a repository path."
        }
    }
}

if ($errors.Count -gt 0) {
    $errors | ForEach-Object { Write-Output "ERROR: $_" }
    exit 1
}

Write-Output 'Agents consistency check passed.'
exit 0
