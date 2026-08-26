(() => {
  const translations = {
    id: {
      "shell.fictionalDisclaimer": "Demonstrasi fiktif · Bukan untuk penggunaan klinis",
      "shell.externalCapabilityDisclaimer": "Integrasi kapabilitas eksternal hanya ilustratif.",
      "shell.pageTitle": "Demonstrator Operasional MHCS | Kasus DEMO-001",
      "shell.metaDescription": "Demonstrator operasional MHCS berbasis sudut pandang aktor untuk perjalanan layanan kesehatan fiktif yang berkelanjutan.",
      "shell.reset": "Atur Ulang Demo",
      "shell.activeCase": "DEMO KASUS AKTIF",
      "shell.demoPatient": "Pasien Demo",
      "shell.viewing": "TAMPILAN",
      "shell.presentationNavigation": "NAVIGASI PRESENTASI",
      "shell.presentationNavigationAria": "Navigasi presentasi utama",
      "shell.sharedCaseProgress": "Progres kasus bersama",
      "shell.oneSharedCase": "SATU KASUS BERSAMA",
      "shell.language": "Bahasa",
      "shell.languageId": "Bahasa Indonesia",
      "shell.languageEn": "Bahasa Inggris",
      "shell.footerLeft": "satu kasus fiktif yang digunakan bersama di seluruh tampilan aktor",
      "shell.footerRight": "Data fiktif · bukan untuk penggunaan klinis · tidak ada unggahan AI otomatis",
      "view.member": "Member (Pasien)",
      "view.operator": "Operator (Radiografer)",
      "view.doctor": "Dokter (Radiolog)",
      "view.journey": "Ringkasan Perjalanan",
      "nav.memberDescription": "Perjalanan kesehatan Anda",
      "nav.operatorDescription": "Tugas radiografi",
      "nav.doctorDescription": "Tinjauan klinis",
      "nav.journeyDescription": "Progres kasus bersama",
      "progress.screening": "Skrining",
      "progress.imaging": "Radiografi",
      "progress.review": "Tinjauan",
      "progress.referral": "Rujukan",
      "progress.followup": "Tindak lanjut",
      "progress.monitoring": "Pemantauan",

      "member.title": "Perjalanan Kesehatan Anda",
      "member.intro": "Lihat apa yang telah terjadi, yang sedang berlangsung, dan langkah berikutnya dalam perawatan Anda.",
      "member.personalView": "Tampilan pribadi",
      "member.yourNextStep": "LANGKAH BERIKUTNYA",
      "member.viewPatientUpdate": "Lihat Pembaruan Pasien",
      "member.careJourney": "PERJALANAN PERAWATAN ANDA",
      "member.progressForPatient": "Progres Pasien Demo",
      "member.stage.screening": "Skrining kesehatan",
      "member.stage.imaging": "Pemeriksaan radiografi",
      "member.stage.review": "Tinjauan klinis",
      "member.stage.referral": "Langkah layanan berikutnya",
      "member.stage.followup": "Tindak lanjut",
      "member.stage.outcome": "Outcome yang Diharapkan",
      "member.stage.monitoring": "Pemantauan Berkelanjutan",
      "member.status.completed": "Selesai",
      "member.status.recorded": "Tercatat",
      "member.status.inProgress": "Sedang berlangsung",
      "member.status.nextStep": "Langkah berikutnya",
      "member.status.waiting": "Menunggu",
      "member.status.readyReview": "Siap ditinjau",
      "member.status.notStarted": "Belum dimulai",
      "member.status.createdAwaitingCompletion": "Dibuat · menunggu penyelesaian",
      "member.status.requiredNext": "Diperlukan berikutnya",
      "member.status.willBeShown": "Akan ditampilkan di sini",
      "member.status.readyToRecord": "Siap dicatat",
      "member.status.willBeUpdated": "Akan diperbarui di sini",
      "member.status.active": "Aktif",
      "member.status.remainsVisible": "Tetap terlihat",
      "member.noteTitle": "Catatan tentang demonstrasi ini",
      "member.caseDetails": "DETAIL KASUS",
      "member.caseLabel": "Kasus",
      "member.examinationLabel": "Pemeriksaan",
      "member.informationLabel": "Informasi",
      "member.chestXray": "Rontgen Dada",
      "member.fictionalSynthetic": "Fiktif / sintetis",
      "member.whatHappensNext": "APA YANG TERJADI SELANJUTNYA",
      "member.nextHeading": "Tim perawatan Anda akan menjaga langkah berikutnya tetap terlihat.",
      "member.nextCopy": "Penyelesaian rujukan, tindak lanjut, outcome yang diharapkan, dan pemantauan rutin tetap menjadi bagian dari perjalanan ini.",
      "member.nextDetails": "Aktor layanan berikutnya: {actor}. {note} Gunakan Navigasi Presentasi untuk melihat ruang kerja lain saat mempresentasikan langkah berikutnya.",
      "member.state.0.status": "Tindakan diperlukan",
      "member.state.0.title": "Pemeriksaan lanjutan diperlukan",
      "member.state.0.copy": "Skrining kesehatan Anda telah selesai. Pemeriksaan rontgen dada fiktif adalah langkah berikutnya dalam demonstrasi ini.",
      "member.state.0.next": "Pemeriksaan radiografi",
      "member.state.0.actor": "Operator (Radiografer)",
      "member.state.0.note": "Layar ini menggunakan informasi fiktif untuk menunjukkan bagaimana perjalanan perawatan berlanjut setelah hasil skrining.",
      "member.state.1.status": "Radiografi berlangsung",
      "member.state.1.title": "Pemeriksaan radiografi",
      "member.state.1.copy": "Pemeriksaan rontgen dada Anda sedang disiapkan. Tim radiografi akan mengonfirmasi citra sebelum tinjauan klinis.",
      "member.state.1.next": "Selesaikan pemeriksaan radiografi",
      "member.state.1.actor": "Operator (Radiografer)",
      "member.state.1.note": "Citra yang dipilih tetap berada dalam sesi browser demonstrasi sampai demo diatur ulang.",
      "member.state.2.status": "Menunggu tinjauan klinis",
      "member.state.2.title": "Pemeriksaan Anda sedang ditinjau",
      "member.state.2.copy": "Pemeriksaan radiografi Anda telah selesai. Dokter (Radiolog) akan meninjau informasi berikutnya.",
      "member.state.2.next": "Tinjauan klinis",
      "member.state.2.actor": "Dokter (Radiolog)",
      "member.state.2.note": "Kapabilitas pendukung dapat membantu tim perawatan, tetapi Dokter (Radiolog) tetap bertanggung jawab atas tinjauan.",
      "member.state.3.status": "Tinjauan klinis berlangsung",
      "member.state.3.title": "Pemeriksaan Anda sedang ditinjau",
      "member.state.3.copy": "Dokter (Radiolog) sedang meninjau pemeriksaan Anda. Langkah layanan berikutnya akan dicatat setelah tinjauan profesional.",
      "member.state.3.next": "Tinjauan profesional",
      "member.state.3.actor": "Dokter (Radiolog)",
      "member.state.3.note": "Tinjauan profesional tetap diperlukan sebelum langkah layanan berikutnya dibuat.",
      "member.state.4.status": "Langkah layanan berikutnya",
      "member.state.4.title": "Rujukan diperlukan",
      "member.state.4.copy": "Tinjauan pemeriksaan Anda telah selesai. Rujukan adalah langkah layanan berikutnya yang diperlukan dan belum dibuat dalam demonstrasi ini.",
      "member.state.4.next": "Pembuatan rujukan",
      "member.state.4.actor": "Dokter (Radiolog)",
      "member.state.4.note": "Dokter (Radiolog) tetap perlu membuat rujukan sebelum layanan penerima dapat bertindak.",
      "member.state.5.status": "Rujukan dibuat",
      "member.state.5.title": "Rujukan dibuat",
      "member.state.5.copy": "Rujukan Anda telah tercatat dan layanan penerima masih perlu menyelesaikan langkah berikutnya.",
      "member.state.5.next": "Penyelesaian rujukan",
      "member.state.5.actor": "Layanan yang diperlukan di luar demonstrasi ini",
      "member.state.5.note": "Rujukan tetap terpisah dari penyelesaian layanan yang diperlukan.",
      "member.state.6.status": "Tindak lanjut diperlukan",
      "member.state.6.title": "Rujukan selesai",
      "member.state.6.copy": "Rujukan telah selesai. Tindak lanjut masih diperlukan agar perjalanan perawatan Anda terus berjalan.",
      "member.state.6.next": "Tindak lanjut",
      "member.state.6.actor": "Layanan tindak lanjut di luar demonstrasi ini",
      "member.state.6.note": "Perjalanan perawatan berlanjut setelah rujukan selesai agar pembaruan berikutnya tidak terlewat.",
      "member.state.7.status": "Tindak lanjut selesai",
      "member.state.7.title": "Tindak lanjut selesai",
      "member.state.7.copy": "Tindak lanjut Anda telah selesai. Outcome yang diharapkan secara fiktif kini dapat dicatat.",
      "member.state.7.next": "Outcome yang diharapkan",
      "member.state.7.actor": "Simulasi presentasi Ringkasan Perjalanan",
      "member.state.7.note": "Ini adalah pembaruan status fiktif, bukan hasil klinis atau rekomendasi medis.",
      "member.state.8.status": "Pemantauan Berkelanjutan",
      "member.state.8.title": "Layanan yang diperlukan telah selesai",
      "member.state.8.copy": "Layanan yang diperlukan dalam demonstrasi ini telah selesai. Lanjutkan pemantauan rutin pada titik kontak yang direncanakan berikutnya.",
      "member.state.8.next": "Lanjutkan pemantauan rutin",
      "member.state.8.actor": "Simulasi presentasi Ringkasan Perjalanan",
      "member.state.8.note": "Langkah layanan saat ini telah selesai, sementara pemantauan berkelanjutan tetap menjadi bagian dari perjalanan.",

      "operator.workstation": "Stasiun kerja demo",
      "operator.title": "Tugas Radiografi",
      "operator.waiting": "MENUNGGU",
      "operator.active": "AKTIF",
      "operator.done": "SELESAI",
      "operator.queue": "ANTREAN RADIOGRAFI",
      "operator.live": "LANGSUNG",
      "operator.openTask": "Buka Tugas",
      "operator.queueNote": "Satu kasus fiktif digunakan untuk presentasi ini. Tidak ada data pasien yang disimpan.",
      "operator.activeExam": "PEMERIKSAAN AKTIF",
      "operator.imageAcquisition": "AKUISISI CITRA",
      "operator.imageConfirmCopy": "Konfirmasi akuisisi citra fiktif ketika sumber citra siap.",
      "operator.localDemoImage": "CITRA DEMO LOKAL",
      "operator.noImageSelected": "Belum ada citra yang dipilih",
      "operator.demoImagePrompt": "Gunakan Citra Demo untuk presentasi yang andal.",
      "operator.presentationSafeInput": "INPUT AMAN UNTUK PRESENTASI",
      "operator.selectImageSource": "Pilih sumber citra",
      "operator.imageSourceCopy": "Citra yang dipilih tetap berada dalam sesi browser ini. Citra tidak diunggah, dikirim, atau disimpan.",
      "operator.uploadImage": "Unggah Citra",
      "operator.useDemoImage": "Gunakan Citra Demo",
      "operator.noImageSourceSelected": "Belum ada sumber citra yang dipilih.",
      "operator.confirmImageAcquisition": "Konfirmasi Akuisisi Citra",
      "operator.browserLocalNote": "Lokal di browser dan sementara. Tidak ada permintaan ke AI, PACS, backend, atau layanan eksternal.",
      "operator.imageAcquisitionCompleted": "Akuisisi citra selesai",
      "operator.completeInitialCopy": "Citra telah dikonfirmasi untuk kasus fiktif ini. Langkah tinjauan berikutnya kini tersedia.",
      "operator.completeAfterHandoffCopy": "Kasus telah diserahkan kepada Dokter (Radiolog) untuk tinjauan klinis manusia secara eksplisit.",
      "operator.externalCapabilityEyebrow": "KAPABILITAS EKSTERNAL · DEMO",
      "operator.externalCapabilityTitle": "Kapabilitas AI Eksternal — Demo",
      "operator.externalCapabilityCopy": "Tersedia sebagai informasi pendukung untuk presentasi. Citra tidak dikirim otomatis dan tidak ada hasil yang diimpor.",
      "operator.externalCapabilityAfterReview": "Kapabilitas eksternal tetap bersifat ilustratif. Kasus kini berada pada Dokter (Radiolog) untuk tinjauan klinis manusia.",
      "operator.openAiAnalysis": "Buka Analisis AI ↗",
      "operator.continueReview": "Lanjutkan ke Tinjauan Dokter (Radiolog)",
      "operator.safetyBoundary": "Batas presentasi:",
      "operator.safetyCopy": "ini adalah demonstrasi lokal di browser. Demonstrasi ini tidak mengunggah citra, mengirimkan ke PACS, memanggil API AI, atau melakukan pemrosesan klinis.",
      "operator.taskSummary.completed": "Akuisisi citra selesai",
      "operator.taskSummary.ready": "Siap untuk sumber citra",
      "operator.taskSummary.waiting": "Pemeriksaan lanjutan diperlukan",
      "operator.status.completed": "Selesai",
      "operator.status.inProgress": "Sedang berlangsung",
      "operator.status.waiting": "Menunggu",
      "operator.preview.confirmed": "Akuisisi dikonfirmasi · status demo lokal",
      "operator.preview.ready": "Siap untuk konfirmasi akuisisi eksplisit.",
      "operator.preview.useDemo": "Gunakan Citra Demo untuk presentasi yang andal.",
      "operator.selectedSource": "Sumber yang dipilih: {source}",
      "operator.localImage": "Citra lokal dipilih",
      "operator.safeDemoImage": "Citra demo fiktif yang aman",
      "operator.aiStatus.configured": "Dikonfigurasi untuk deployment ini · hanya terbuka melalui navigasi pengguna secara eksplisit.",
      "operator.aiStatus.notConfigured": "Belum dikonfigurasi untuk pratinjau lokal; deployment harus menyediakan AI_DEMO_URL.",
      "operator.aiStatus.opened": "Kapabilitas eksternal dibuka melalui navigasi pengguna secara eksplisit; tidak ada hasil yang diimpor otomatis.",

      "doctor.title": "Antrean Tinjauan Klinis",
      "doctor.intro": "Tinjau kasus sebagai profesional manusia sebelum tindakan layanan kesehatan yang diperlukan dibuat.",
      "doctor.reviewDesk": "Meja tinjauan",
      "doctor.queue": "ANTREAN TINJAUAN KLINIS",
      "doctor.queueNote": "Informasi berbantuan AI mendukung tinjauan profesional. Informasi tersebut tidak pernah menggantikan Dokter (Radiolog).",
      "doctor.openCase": "Buka Kasus",
      "doctor.goToOperator": "Buka Operator (Radiografer)",
      "doctor.caseEyebrow": "KASUS DEMO-001 · FIKTIF",
      "doctor.caseCopy": "Pemeriksaan radiografi siap untuk tinjauan profesional.",
      "doctor.imagingExam": "PEMERIKSAAN RADIOGRAFI",
      "doctor.imagingDetail": "Rontgen Dada · status demo lokal",
      "doctor.aiSupport": "DUKUNGAN BERBANTUAN AI",
      "doctor.aiSupportDetail": "Informasi pendukung saja · bukan diagnosis",
      "doctor.professionalReview": "TINJAUAN PROFESIONAL",
      "doctor.professionalReviewDetail": "Tinjauan manusia harus dilakukan sebelum tindakan",
      "doctor.continuity": "Demonstrasi ini hanya mencatat tinjauan dan perkembangan perawatan. Demonstrasi ini tidak menghasilkan diagnosis atau rekomendasi medis.",
      "doctor.queue.noCase.summary": "Belum ada kasus tinjauan yang siap",
      "doctor.queue.noCase.status": "Menunggu",
      "doctor.queue.ready.summary": "Citra tersedia · tinjauan diperlukan",
      "doctor.queue.ready.status": "Siap",
      "doctor.queue.reviewed.summary": "Tinjauan selesai · tindakan yang diperlukan masih menunggu",
      "doctor.queue.reviewed.status": "Ditinjau",
      "doctor.queue.completed.summary": "Tinjauan selesai · rujukan dibuat",
      "doctor.queue.completed.status": "Selesai",
      "doctor.empty.ready.eyebrow": "KASUS SIAP",
      "doctor.empty.complete.eyebrow": "TINJAUAN SELESAI",
      "doctor.empty.none.eyebrow": "BELUM ADA KASUS",
      "doctor.empty.ready.title": "Buka kasus tinjauan",
      "doctor.empty.complete.title": "Tinjauan selesai",
      "doctor.empty.none.title": "Kasus tinjauan belum tersedia",
      "doctor.empty.ready.copy": "Pemeriksaan radiografi tersedia. Buka kasus untuk melakukan tinjauan profesional secara eksplisit.",
      "doctor.empty.complete.copy": "Tinjauan profesional selesai. Buka kasus untuk meninjau konteks rujukannya.",
      "doctor.empty.none.copy": "Selesaikan akuisisi citra di ruang kerja Operator (Radiografer), lalu lanjutkan ke antrean ini.",
      "doctor.reviewStatus.completed": "Tinjauan selesai",
      "doctor.reviewStatus.required": "Tinjauan diperlukan",
      "doctor.imagingStatus.completed": "Selesai ✓",
      "doctor.imagingStatus.pending": "Menunggu",
      "doctor.supportStatus.available": "Kapabilitas Demo Eksternal",
      "doctor.supportStatus.unavailable": "Belum tersedia",
      "doctor.professionalStatus.completed": "Selesai ✓",
      "doctor.professionalStatus.required": "Diperlukan",
      "doctor.action.review.eyebrow": "TINJAUAN KLINIS OLEH DOKTER",
      "doctor.action.review.title": "Selesaikan Tinjauan Klinis oleh Dokter",
      "doctor.action.review.copy": "Gunakan kontrol eksplisit ini untuk mencatat tinjauan profesional fiktif. Dukungan berbantuan AI tidak menentukan langkah berikutnya dengan sendirinya.",
      "doctor.action.referral.eyebrow": "TINDAKAN LAYANAN KESEHATAN YANG DIPERLUKAN",
      "doctor.action.referral.title": "Buat Rujukan",
      "doctor.action.referral.copy": "Tinjauan profesional telah selesai. Buat rujukan ilustratif agar layanan yang diperlukan menjadi serah terima terpisah yang terlihat.",
      "doctor.action.created.eyebrow": "RUJUKAN DIBUAT · MENUNGGU LAYANAN",
      "doctor.action.created.title": "Rujukan dibuat",
      "doctor.action.created.copy": "Penyelesaian layanan dan tindak lanjut berlangsung di luar ruang kerja radiologi ini dalam demonstrasi fiktif.",
      "doctor.action.next.eyebrow": "TINDAKAN BERIKUTNYA YANG DIPERLUKAN",
      "doctor.action.next.title": "Buka kasus tinjauan",
      "doctor.action.next.copy": "Buka kasus ketika tersedia setelah akuisisi citra.",

      "journey.title": "Satu kasus, perawatan terhubung",
      "journey.intro": "Tampilan presentasi sekunder untuk kasus fiktif yang sama dan digunakan bersama oleh tiga aktor layanan kesehatan.",
      "journey.secondaryView": "Tampilan sekunder",
      "journey.sharedProgress": "PROGRES KASUS BERSAMA",
      "journey.currentStage": "TAHAP SAAT INI",
      "journey.presentationHandoff": "SERAH TERIMA PRESENTASI",
      "journey.whatNext": "Apa yang terjadi selanjutnya",
      "journey.activeView": "Tampilan aktif",
      "journey.nextAction": "Tindakan berikutnya yang diperlukan",
      "journey.nextPrefix": "Berikutnya:",
      "journey.returnMember": "Kembali ke Member (Pasien)",
      "journey.demoProgression": "PROGRES DEMO",
      "journey.simulationOnly": "Hanya simulasi presentasi",
      "journey.simulationCopy": "Kontrol ini mensimulasikan tahap berikutnya untuk presentasi fiktif ini. Kontrol ini tidak mewakili aktor layanan kesehatan keempat atau kepemilikan produksi.",
      "journey.healthcareState": "Status layanan kesehatan",
      "journey.coordinationBoundary": "BATAS KOORDINASI",
      "journey.boundaryTitle": "Terhubung bukan berarti menggantikan",
      "journey.boundaryCopy": "MHCS mengoordinasikan perjalanan di seluruh kapabilitas yang ada. Sistem pemerintah tetap berwenang dalam domainnya, dan profesional manusia tetap bertanggung jawab atas tinjauan klinis.",
      "journey.stage.0.label": "Skrining / Temuan",
      "journey.stage.0.state": "Temuan teridentifikasi",
      "journey.stage.0.next": "Buka tugas radiografi",
      "journey.stage.1.label": "Akuisisi Citra",
      "journey.stage.1.state": "Akuisisi citra berlangsung",
      "journey.stage.1.next": "Konfirmasi akuisisi citra",
      "journey.stage.2.label": "Kapabilitas AI Eksternal",
      "journey.stage.2.state": "Kapabilitas eksternal tersedia",
      "journey.stage.2.next": "Lanjutkan ke tinjauan Dokter (Radiolog)",
      "journey.stage.3.label": "Tinjauan Klinis oleh Dokter",
      "journey.stage.3.state": "Tinjauan profesional menunggu",
      "journey.stage.3.next": "Selesaikan Tinjauan Klinis oleh Dokter",
      "journey.stage.4.label": "Tindakan Layanan Kesehatan yang Diperlukan",
      "journey.stage.4.state": "Tindakan layanan kesehatan diperlukan",
      "journey.stage.4.next": "Buat rujukan",
      "journey.stage.5.label": "Rujukan dibuat",
      "journey.stage.5.state": "Rujukan dibuat — menunggu penyelesaian",
      "journey.stage.5.next": "Simulasikan penyelesaian rujukan",
      "journey.stage.6.label": "Rujukan selesai",
      "journey.stage.6.state": "Rujukan selesai — menunggu tindak lanjut",
      "journey.stage.6.next": "Simulasikan penyelesaian tindak lanjut",
      "journey.stage.7.label": "Tindak Lanjut / Outcome yang Diharapkan",
      "journey.stage.7.state": "Pembaruan outcome menunggu",
      "journey.stage.7.next": "Simulasikan outcome yang diharapkan",
      "journey.stage.8.label": "Pemantauan Berkelanjutan",
      "journey.stage.8.state": "Siklus pemantauan aktif",
      "journey.stage.8.next": "Lanjutkan pemantauan rutin",
      "journey.status.actionRequired": "Tindakan diperlukan",
      "journey.status.monitoringActive": "Pemantauan aktif",
      "journey.status.inProgress": "Perjalanan berlangsung",
      "journey.copy.0": "Pemeriksaan lanjutan diperlukan. Tindakan berikutnya terlihat bagi Operator (Radiografer).",
      "journey.copy.1": "Operator (Radiografer) sedang menyiapkan citra fiktif. Konfirmasi masih diperlukan.",
      "journey.copy.2": "Radiografi selesai. Kapabilitas eksternal tersedia sebagai dukungan; Dokter (Radiolog) tetap harus meninjau kasus.",
      "journey.copy.3": "Kasus siap untuk tinjauan klinis manusia secara eksplisit oleh Dokter (Radiolog).",
      "journey.copy.4": "Tinjauan profesional selesai. Tindakan layanan kesehatan yang diperlukan tetap terpisah dari hasil tinjauan.",
      "journey.copy.5": "Rujukan dibuat bukan berarti rujukan selesai. Layanan penerima masih perlu memberikan perawatan yang diperlukan.",
      "journey.copy.6": "Rujukan selesai. Tindak lanjut tetap terlihat agar perjalanan perawatan dapat berlanjut.",
      "journey.copy.7": "Tindak lanjut selesai. Catat outcome yang diharapkan, lalu pertahankan Pemantauan Berkelanjutan tetap terlihat.",
      "journey.copy.8": "Outcome yang diharapkan tercapai untuk kasus fiktif ini. Pemantauan Berkelanjutan tetap aktif.",
      "journey.progression.0": "Menunggu pembuatan rujukan",
      "journey.progression.1": "Menunggu pembuatan rujukan",
      "journey.progression.2": "Menunggu pembuatan rujukan",
      "journey.progression.3": "Menunggu pembuatan rujukan",
      "journey.progression.4": "Menunggu pembuatan rujukan",
      "journey.progression.5": "Rujukan dibuat · layanan yang diperlukan menunggu",
      "journey.progression.6": "Rujukan selesai · tindak lanjut diperlukan",
      "journey.progression.7": "Tindak lanjut selesai · outcome yang diharapkan menunggu",
      "journey.progression.8": "Outcome yang diharapkan tercapai · Pemantauan Berkelanjutan aktif",
      "journey.simulateReferral": "Simulasikan Penyelesaian Rujukan",
      "journey.simulateFollowup": "Simulasikan Penyelesaian Tindak Lanjut",
      "journey.simulateOutcome": "Simulasikan Outcome yang Diharapkan",

      "announcement.imagingOpened": "Tugas radiografi dibuka. Akuisisi citra kini menjadi tahap saat ini bagi Operator (Radiografer).",
      "announcement.localImageSelected": "Citra lokal dipilih. Citra tetap berada dalam sesi browser ini sampai demo diatur ulang.",
      "announcement.demoImageSelected": "Citra demo fiktif yang aman dipilih. Konfirmasi akuisisi untuk melanjutkan perjalanan.",
      "announcement.imageCompleted": "Akuisisi citra selesai. Kapabilitas berbantuan AI eksternal kini tersedia; tidak ada citra yang dikirim.",
      "announcement.aiUnavailable": "Tautan demo AI tidak tersedia dalam pratinjau lokal ini. Demonstrasi yang di-deploy menerimanya dari AI_DEMO_URL.",
      "announcement.doctorReview": "Tahap presentasi dilanjutkan ke tinjauan Dokter (Radiolog). Ini tidak berarti hasil AI eksternal diterima atau diverifikasi.",
      "announcement.reviewCompleted": "Tinjauan klinis manusia selesai untuk kasus fiktif ini. Tindakan layanan kesehatan yang diperlukan kini terlihat.",
      "announcement.referralCreated": "Rujukan dibuat. Rujukan dibuat ≠ Rujukan selesai; layanan penerima masih perlu bertindak.",
      "announcement.referralCompleted": "Penyelesaian rujukan disimulasikan untuk presentasi fiktif ini. Tindak lanjut tetap diperlukan.",
      "announcement.followupCompleted": "Penyelesaian tindak lanjut disimulasikan untuk presentasi fiktif ini. Outcome yang diharapkan masih menunggu.",
      "announcement.outcomeCompleted": "Outcome yang diharapkan disimulasikan untuk presentasi fiktif ini. Pemantauan Berkelanjutan tetap aktif.",
    },
    en: {
      "shell.fictionalDisclaimer": "Fictional demonstration · Not for clinical use",
      "shell.externalCapabilityDisclaimer": "External capability integration is illustrative.",
      "shell.pageTitle": "MHCS Operational Demonstrator | Case DEMO-001",
      "shell.metaDescription": "MHCS actor-POV operational demonstrator for a fictional continuous healthcare journey.",
      "shell.reset": "Reset Demo",
      "shell.activeCase": "ACTIVE DEMO CASE",
      "shell.demoPatient": "Demo Patient",
      "shell.viewing": "VIEWING",
      "shell.presentationNavigation": "PRESENTATION NAVIGATION",
      "shell.presentationNavigationAria": "Primary presentation navigation",
      "shell.sharedCaseProgress": "Shared case progress",
      "shell.oneSharedCase": "ONE SHARED CASE",
      "shell.language": "Language",
      "shell.languageId": "Bahasa Indonesia",
      "shell.languageEn": "English",
      "shell.footerLeft": "one fictional case shared across actor views",
      "shell.footerRight": "Fictional data · no clinical use · no automatic AI upload",
      "view.member": "Member (Patient)",
      "view.operator": "Operator (Radiographer)",
      "view.doctor": "Doctor (Radiologist)",
      "view.journey": "Journey Overview",
      "nav.memberDescription": "Your health journey",
      "nav.operatorDescription": "Imaging tasks",
      "nav.doctorDescription": "Clinical review",
      "nav.journeyDescription": "Shared case progress",
      "progress.screening": "Screening",
      "progress.imaging": "Imaging",
      "progress.review": "Review",
      "progress.referral": "Referral",
      "progress.followup": "Follow-up",
      "progress.monitoring": "Monitoring",

      "member.title": "Your Health Journey",
      "member.intro": "See what has happened, what is happening now, and what comes next in your care.",
      "member.personalView": "Personal view",
      "member.yourNextStep": "YOUR NEXT STEP",
      "member.viewPatientUpdate": "View Patient Update",
      "member.careJourney": "YOUR CARE JOURNEY",
      "member.progressForPatient": "Progress for Demo Patient",
      "member.stage.screening": "Health screening",
      "member.stage.imaging": "Imaging examination",
      "member.stage.review": "Clinical review",
      "member.stage.referral": "Next care step",
      "member.stage.followup": "Follow-up",
      "member.stage.outcome": "Intended outcome",
      "member.stage.monitoring": "Continued Monitoring",
      "member.status.completed": "Completed",
      "member.status.recorded": "Recorded",
      "member.status.inProgress": "In progress",
      "member.status.nextStep": "Next step",
      "member.status.waiting": "Waiting",
      "member.status.readyReview": "Ready for review",
      "member.status.notStarted": "Not started",
      "member.status.createdAwaitingCompletion": "Created · awaiting completion",
      "member.status.requiredNext": "Required next",
      "member.status.willBeShown": "Will be shown here",
      "member.status.readyToRecord": "Ready to record",
      "member.status.willBeUpdated": "Will be updated here",
      "member.status.active": "Active",
      "member.status.remainsVisible": "Remains visible",
      "member.noteTitle": "A note about this demonstration",
      "member.caseDetails": "CASE DETAILS",
      "member.caseLabel": "Case",
      "member.examinationLabel": "Examination",
      "member.informationLabel": "Information",
      "member.chestXray": "Chest X-Ray",
      "member.fictionalSynthetic": "Fictional / synthetic",
      "member.whatHappensNext": "WHAT HAPPENS NEXT",
      "member.nextHeading": "Your care team will keep the next step visible.",
      "member.nextCopy": "Referral completion, follow-up, intended outcome, and routine monitoring remain part of this journey.",
      "member.nextDetails": "Next care actor: {actor}. {note} Use Presentation Navigation to view another workspace when presenting the next step.",
      "member.state.0.status": "Action required",
      "member.state.0.title": "Further examination required",
      "member.state.0.copy": "Your health screening is complete. A fictional chest X-ray examination is the next step in this demonstration.",
      "member.state.0.next": "Imaging examination",
      "member.state.0.actor": "Operator (Radiographer)",
      "member.state.0.note": "This screen uses fictional information to show how a care journey continues beyond a screening result.",
      "member.state.1.status": "Imaging in progress",
      "member.state.1.title": "Imaging examination",
      "member.state.1.copy": "Your chest X-ray examination is being prepared. The imaging team will confirm the image before clinical review.",
      "member.state.1.next": "Complete imaging examination",
      "member.state.1.actor": "Operator (Radiographer)",
      "member.state.1.note": "The selected image stays in the demonstration browser session until the demo is reset.",
      "member.state.2.status": "Clinical review pending",
      "member.state.2.title": "Your examination is being reviewed",
      "member.state.2.copy": "Your imaging examination is complete. A Doctor (Radiologist) will review the information next.",
      "member.state.2.next": "Clinical review",
      "member.state.2.actor": "Doctor (Radiologist)",
      "member.state.2.note": "A supporting capability may assist the care team, but a Doctor (Radiologist) remains responsible for review.",
      "member.state.3.status": "Clinical review in progress",
      "member.state.3.title": "Your examination is being reviewed",
      "member.state.3.copy": "A Doctor (Radiologist) is reviewing your examination. The next care step will be recorded after professional review.",
      "member.state.3.next": "Professional review",
      "member.state.3.actor": "Doctor (Radiologist)",
      "member.state.3.note": "Professional review is still required before any next care step is created.",
      "member.state.4.status": "Next care step",
      "member.state.4.title": "Referral required",
      "member.state.4.copy": "Your examination review is complete. A referral is the next required care step and has not yet been created in this demonstration.",
      "member.state.4.next": "Referral creation",
      "member.state.4.actor": "Doctor (Radiologist)",
      "member.state.4.note": "The Doctor (Radiologist) still needs to create the referral before the receiving service can act.",
      "member.state.5.status": "Referral created",
      "member.state.5.title": "Referral arranged",
      "member.state.5.copy": "Your referral is recorded and the receiving service still needs to complete the next step.",
      "member.state.5.next": "Referral completion",
      "member.state.5.actor": "Required service outside this demonstrator",
      "member.state.5.note": "The referral remains separate from completion of the required service.",
      "member.state.6.status": "Follow-up required",
      "member.state.6.title": "Referral completed",
      "member.state.6.copy": "The referral has been completed. A follow-up is still needed to keep your care journey moving.",
      "member.state.6.next": "Follow-up",
      "member.state.6.actor": "Follow-up care outside this demonstrator",
      "member.state.6.note": "Your care journey continues after referral completion so the next update is not lost.",
      "member.state.7.status": "Follow-up completed",
      "member.state.7.title": "Follow-up completed",
      "member.state.7.copy": "Your follow-up is complete. The fictional intended outcome can now be recorded.",
      "member.state.7.next": "Intended outcome",
      "member.state.7.actor": "Journey Overview presentation simulation",
      "member.state.7.note": "This is a fictional status update, not a clinical result or medical recommendation.",
      "member.state.8.status": "Continued Monitoring",
      "member.state.8.title": "Required care completed",
      "member.state.8.copy": "The required care in this demonstration is completed. Continue routine monitoring at the next planned touchpoint.",
      "member.state.8.next": "Continue routine monitoring",
      "member.state.8.actor": "Journey Overview presentation simulation",
      "member.state.8.note": "The immediate care step is complete, while continued monitoring remains part of the journey.",

      "operator.workstation": "Demo workstation",
      "operator.title": "Imaging Tasks",
      "operator.waiting": "WAITING",
      "operator.active": "ACTIVE",
      "operator.done": "DONE",
      "operator.queue": "IMAGING QUEUE",
      "operator.live": "LIVE",
      "operator.openTask": "Open Task",
      "operator.queueNote": "One fictional case is used for this presentation. No patient data is stored.",
      "operator.activeExam": "ACTIVE EXAMINATION",
      "operator.imageAcquisition": "IMAGE ACQUISITION",
      "operator.imageConfirmCopy": "Confirm the fictional image acquisition when the image source is ready.",
      "operator.localDemoImage": "LOCAL DEMO IMAGE",
      "operator.noImageSelected": "No image selected",
      "operator.demoImagePrompt": "Use Demo Image for a reliable presentation.",
      "operator.presentationSafeInput": "PRESENTATION-SAFE INPUT",
      "operator.selectImageSource": "Select an image source",
      "operator.imageSourceCopy": "The selected image remains in this browser session. It is not uploaded, transmitted, or persisted.",
      "operator.uploadImage": "Upload Image",
      "operator.useDemoImage": "Use Demo Image",
      "operator.noImageSourceSelected": "No image source selected.",
      "operator.confirmImageAcquisition": "Confirm Image Acquisition",
      "operator.browserLocalNote": "Browser-local and transient. No AI, PACS, backend, or external request is made.",
      "operator.imageAcquisitionCompleted": "Image acquisition completed",
      "operator.completeInitialCopy": "The image is confirmed for this fictional case. The next review step is now available.",
      "operator.completeAfterHandoffCopy": "The case has been handed to the Doctor (Radiologist) for explicit human clinical review.",
      "operator.externalCapabilityEyebrow": "EXTERNAL CAPABILITY · DEMO",
      "operator.externalCapabilityTitle": "External AI Capability — Demo",
      "operator.externalCapabilityCopy": "Available as supporting information for the presentation. The image is not sent automatically and no result is imported.",
      "operator.externalCapabilityAfterReview": "The external capability remains illustrative. The case is now with the Doctor (Radiologist) for human clinical review.",
      "operator.openAiAnalysis": "Open AI Analysis ↗",
      "operator.continueReview": "Continue to Doctor (Radiologist) Review",
      "operator.safetyBoundary": "Presentation boundary:",
      "operator.safetyCopy": "this is a browser-local demonstration. It does not upload images, submit to PACS, call an AI API, or perform clinical processing.",
      "operator.taskSummary.completed": "Image acquisition completed",
      "operator.taskSummary.ready": "Ready for image source",
      "operator.taskSummary.waiting": "Further examination required",
      "operator.status.completed": "Completed",
      "operator.status.inProgress": "In progress",
      "operator.status.waiting": "Waiting",
      "operator.preview.confirmed": "Acquisition confirmed · local demo state",
      "operator.preview.ready": "Ready for explicit acquisition confirmation.",
      "operator.preview.useDemo": "Use Demo Image for a reliable presentation.",
      "operator.selectedSource": "Selected source: {source}",
      "operator.localImage": "Local image selected",
      "operator.safeDemoImage": "Safe fictional demo image",
      "operator.aiStatus.configured": "Configured for this deployment · opens only by explicit user navigation.",
      "operator.aiStatus.notConfigured": "Not configured for local preview; deployment must provide AI_DEMO_URL.",
      "operator.aiStatus.opened": "External capability opened by explicit user navigation; no result was imported automatically.",

      "doctor.title": "Clinical Review Queue",
      "doctor.intro": "Review the case as a human professional before any required healthcare action is created.",
      "doctor.reviewDesk": "Review desk",
      "doctor.queue": "CLINICAL REVIEW QUEUE",
      "doctor.queueNote": "AI-assisted information supports the professional review. It never replaces the Doctor (Radiologist).",
      "doctor.openCase": "Open Case",
      "doctor.goToOperator": "Go to Operator (Radiographer)",
      "doctor.caseEyebrow": "CASE DEMO-001 · FICTIONAL",
      "doctor.caseCopy": "Imaging examination ready for professional review.",
      "doctor.imagingExam": "IMAGING EXAMINATION",
      "doctor.imagingDetail": "Chest X-Ray · local demo state",
      "doctor.aiSupport": "AI-ASSISTED SUPPORT",
      "doctor.aiSupportDetail": "Supporting information only · not a diagnosis",
      "doctor.professionalReview": "PROFESSIONAL REVIEW",
      "doctor.professionalReviewDetail": "Human review must happen before action",
      "doctor.continuity": "This demonstration records a review and care progression only. It does not produce a diagnosis or medical recommendation.",
      "doctor.queue.noCase.summary": "No review case ready yet",
      "doctor.queue.noCase.status": "Waiting",
      "doctor.queue.ready.summary": "Imaging available · review required",
      "doctor.queue.ready.status": "Ready",
      "doctor.queue.reviewed.summary": "Review completed · required action pending",
      "doctor.queue.reviewed.status": "Reviewed",
      "doctor.queue.completed.summary": "Review completed · referral created",
      "doctor.queue.completed.status": "Completed",
      "doctor.empty.ready.eyebrow": "CASE READY",
      "doctor.empty.complete.eyebrow": "REVIEW COMPLETE",
      "doctor.empty.none.eyebrow": "NO CASE READY",
      "doctor.empty.ready.title": "Open the review case",
      "doctor.empty.complete.title": "Review completed",
      "doctor.empty.none.title": "Review case not available yet",
      "doctor.empty.ready.copy": "The imaging examination is available. Open the case to perform the explicit professional review.",
      "doctor.empty.complete.copy": "The professional review is complete. Open the case to review its referral context.",
      "doctor.empty.none.copy": "Complete image acquisition in the Operator (Radiographer) workspace, then continue to this queue.",
      "doctor.reviewStatus.completed": "Review completed",
      "doctor.reviewStatus.required": "Review required",
      "doctor.imagingStatus.completed": "Completed ✓",
      "doctor.imagingStatus.pending": "Pending",
      "doctor.supportStatus.available": "External Demo Capability",
      "doctor.supportStatus.unavailable": "Not yet available",
      "doctor.professionalStatus.completed": "Completed ✓",
      "doctor.professionalStatus.required": "Required",
      "doctor.action.review.eyebrow": "HUMAN CLINICAL REVIEW",
      "doctor.action.review.title": "Complete Human Clinical Review",
      "doctor.action.review.copy": "Use this explicit control to record a fictional professional review. AI-assisted support does not determine the next step by itself.",
      "doctor.action.referral.eyebrow": "REQUIRED HEALTHCARE ACTION",
      "doctor.action.referral.title": "Create Referral",
      "doctor.action.referral.copy": "The professional review is complete. Create the illustrative referral so the required service becomes a separate, visible handoff.",
      "doctor.action.created.eyebrow": "REFERRAL CREATED · SERVICE PENDING",
      "doctor.action.created.title": "Referral created",
      "doctor.action.created.copy": "Downstream service completion and follow-up continue outside this radiology workspace in the fictional demonstration.",
      "doctor.action.next.eyebrow": "NEXT REQUIRED ACTION",
      "doctor.action.next.title": "Open the review case",
      "doctor.action.next.copy": "Open the case when it becomes available after image acquisition.",

      "journey.title": "One case, connected care",
      "journey.intro": "A secondary presentation view of the same fictional case shared by the three healthcare actors.",
      "journey.secondaryView": "Secondary view",
      "journey.sharedProgress": "SHARED CASE PROGRESS",
      "journey.currentStage": "CURRENT STAGE",
      "journey.presentationHandoff": "PRESENTATION HANDOFF",
      "journey.whatNext": "What happens next",
      "journey.activeView": "Active view",
      "journey.nextAction": "Next required action",
      "journey.nextPrefix": "Next:",
      "journey.returnMember": "Return to Member (Patient)",
      "journey.demoProgression": "DEMO PROGRESSION",
      "journey.simulationOnly": "Presentation simulation only",
      "journey.simulationCopy": "These controls simulate downstream stages for this fictional presentation. They do not represent a fourth healthcare actor or production ownership.",
      "journey.healthcareState": "Healthcare state",
      "journey.coordinationBoundary": "COORDINATION BOUNDARY",
      "journey.boundaryTitle": "Connected does not mean replaced",
      "journey.boundaryCopy": "MHCS coordinates the journey across existing capabilities. Government systems remain authoritative within their domains, and human professionals remain responsible for clinical review.",
      "journey.stage.0.label": "Screening / Finding",
      "journey.stage.0.state": "Finding identified",
      "journey.stage.0.next": "Open imaging task",
      "journey.stage.1.label": "Imaging Acquisition",
      "journey.stage.1.state": "Image acquisition in progress",
      "journey.stage.1.next": "Confirm image acquisition",
      "journey.stage.2.label": "External AI Capability",
      "journey.stage.2.state": "External capability available",
      "journey.stage.2.next": "Continue to Doctor (Radiologist) review",
      "journey.stage.3.label": "Human Clinical Review",
      "journey.stage.3.state": "Professional review pending",
      "journey.stage.3.next": "Complete Human Clinical Review",
      "journey.stage.4.label": "Required Healthcare Action",
      "journey.stage.4.state": "Required healthcare action pending",
      "journey.stage.4.next": "Create referral",
      "journey.stage.5.label": "Referral Created",
      "journey.stage.5.state": "Referral created — completion pending",
      "journey.stage.5.next": "Simulate referral completion",
      "journey.stage.6.label": "Referral Completed",
      "journey.stage.6.state": "Referral completed — follow-up pending",
      "journey.stage.6.next": "Simulate follow-up completion",
      "journey.stage.7.label": "Follow-up / Intended Outcome",
      "journey.stage.7.state": "Outcome update pending",
      "journey.stage.7.next": "Simulate intended outcome",
      "journey.stage.8.label": "Continued Monitoring",
      "journey.stage.8.state": "Monitoring loop active",
      "journey.stage.8.next": "Continue routine monitoring",
      "journey.status.actionRequired": "Action required",
      "journey.status.monitoringActive": "Monitoring active",
      "journey.status.inProgress": "Journey in progress",
      "journey.copy.0": "Further examination is required. The next action is visible to the Operator (Radiographer).",
      "journey.copy.1": "The Operator (Radiographer) is preparing the fictional image. Confirmation is still required.",
      "journey.copy.2": "Imaging is complete. An external capability is available as support; a Doctor (Radiologist) must still review the case.",
      "journey.copy.3": "The case is ready for explicit human clinical review by the Doctor (Radiologist).",
      "journey.copy.4": "Professional review is complete. The required healthcare action remains separate from the review result.",
      "journey.copy.5": "Referral created is not referral completed. The receiving service still needs to deliver the required care.",
      "journey.copy.6": "Referral completed. Follow-up remains visible so the care journey can continue.",
      "journey.copy.7": "Follow-up is complete. Record the intended outcome, then keep Continued Monitoring visible.",
      "journey.copy.8": "The intended outcome is reached for this fictional case. Continued Monitoring remains active.",
      "journey.progression.0": "Waiting for referral creation",
      "journey.progression.1": "Waiting for referral creation",
      "journey.progression.2": "Waiting for referral creation",
      "journey.progression.3": "Waiting for referral creation",
      "journey.progression.4": "Waiting for referral creation",
      "journey.progression.5": "Referral created · Required service pending",
      "journey.progression.6": "Referral completed · Follow-up required",
      "journey.progression.7": "Follow-up completed · Intended outcome pending",
      "journey.progression.8": "Intended outcome reached · Continued Monitoring active",
      "journey.simulateReferral": "Simulate Referral Completion",
      "journey.simulateFollowup": "Simulate Follow-up Completion",
      "journey.simulateOutcome": "Simulate Intended Outcome",

      "announcement.imagingOpened": "Imaging task opened. Image acquisition is now the current step for the Operator (Radiographer).",
      "announcement.localImageSelected": "Local image selected. It remains in this browser session until the demo is reset.",
      "announcement.demoImageSelected": "Safe fictional demo image selected. Confirm acquisition to continue the journey.",
      "announcement.imageCompleted": "Image acquisition completed. An external AI-assisted capability is now available; no image was transmitted.",
      "announcement.aiUnavailable": "AI demo link is unavailable in this local preview. The deployed demonstrator receives it from AI_DEMO_URL.",
      "announcement.doctorReview": "Presentation step advanced to Doctor (Radiologist) review. This does not imply that an external AI result was received or verified.",
      "announcement.reviewCompleted": "Human clinical review completed for the fictional case. The required healthcare action is now visible.",
      "announcement.referralCreated": "Referral created. Referral created ≠ Referral completed; the receiving service still needs to act.",
      "announcement.referralCompleted": "Referral completion simulated for this fictional presentation. Follow-up remains required.",
      "announcement.followupCompleted": "Follow-up completion simulated for this fictional presentation. The intended outcome remains pending.",
      "announcement.outcomeCompleted": "Intended outcome simulated for this fictional presentation. Continued Monitoring remains active.",
    },
  };

  let currentLanguage = "id";
  let currentView = "member";
  let currentAnnouncementKey = "";
  const journeyStageKeys = Array.from({ length: 9 }, (_, index) => index);

  const views = [...document.querySelectorAll(".view-panel")];
  const viewControls = [...document.querySelectorAll("[data-view]")];
  const languageControls = [...document.querySelectorAll("[data-language]")];
  const progressItems = [...document.querySelectorAll("[data-progress-stage]")];
  const overviewItems = [...document.querySelectorAll("#overview-timeline [data-stage-index]")];
  const memberItems = [...document.querySelectorAll("[data-member-stage]")];
  const demoImageLabelKey = "operator.safeDemoImage";
  const localImageLabelKey = "operator.localImage";
  const state = { step: 0, imageSelected: false, imageLabel: "", aiOpened: false, taskOpened: false, doctorCaseOpen: false };
  const aiUrl = typeof window.MHCS_DEMO_CONFIG?.aiDemoUrl === "string" ? window.MHCS_DEMO_CONFIG.aiDemoUrl.trim() : "";

  const byId = (id) => document.getElementById(id);
  const elements = {
    notice: byId("demo-notice"),
    activeWorkspace: byId("active-workspace"),
    overviewActiveActor: byId("overview-active-actor"),
    memberStatusIcon: byId("member-status-icon"),
    memberStatus: byId("member-status"),
    memberStatusTitle: byId("member-status-title"),
    memberStatusCopy: byId("member-status-copy"),
    memberNextLabel: byId("member-next-label"),
    memberNextAction: byId("member-next-action"),
    memberNextDetails: byId("member-next-details"),
    memberScreeningState: byId("member-screening-state"),
    memberImagingState: byId("member-imaging-state"),
    memberReviewState: byId("member-review-state"),
    memberReferralState: byId("member-referral-state"),
    memberFollowupState: byId("member-followup-state"),
    memberOutcomeState: byId("member-outcome-state"),
    memberMonitoringState: byId("member-monitoring-state"),
    memberNoteCopy: byId("member-note-copy"),
    operatorWaitingCount: byId("operator-waiting-count"),
    operatorActiveCount: byId("operator-active-count"),
    operatorDoneCount: byId("operator-done-count"),
    operatorTaskSummary: byId("operator-task-summary"),
    operatorTaskStatus: byId("operator-task-status"),
    openImagingTask: byId("open-imaging-task"),
    operatorExamStatus: byId("operator-exam-status"),
    operatorTaskDetail: byId("operator-task-detail"),
    operatorCompleteCard: byId("operator-complete-card"),
    operatorCompleteCopy: byId("operator-complete-copy"),
    scanPreview: byId("scan-preview"),
    scanPreviewTitle: byId("scan-preview-title"),
    scanPreviewCopy: byId("scan-preview-copy"),
    selectedFile: byId("selected-file"),
    confirmImage: byId("confirm-image"),
    aiCard: byId("ai-capability-card"),
    aiLink: byId("ai-link"),
    aiLinkStatus: byId("ai-link-status"),
    continueReview: byId("continue-review"),
    doctorQueueCount: byId("doctor-queue-count"),
    doctorQueueSummary: byId("doctor-queue-summary"),
    doctorQueueStatus: byId("doctor-queue-status"),
    openDoctorCase: byId("open-doctor-case"),
    doctorEmptyState: byId("doctor-empty-state"),
    doctorCasePanel: byId("doctor-case-panel"),
    doctorReviewStatus: byId("doctor-review-status"),
    doctorImagingStatus: byId("doctor-imaging-status"),
    doctorSupportStatus: byId("doctor-support-status"),
    doctorProfessionalStatus: byId("doctor-professional-status"),
    doctorActionEyebrow: byId("doctor-action-eyebrow"),
    doctorActionTitle: byId("doctor-action-title"),
    doctorActionCopy: byId("doctor-action-copy"),
    doctorActionButton: byId("doctor-action-button"),
    overviewStatus: byId("overview-status"),
    overviewCurrentIcon: byId("overview-current-icon"),
    overviewCurrentTitle: byId("overview-current-title"),
    overviewCurrentCopy: byId("overview-current-copy"),
    overviewNextCopy: byId("overview-next-copy"),
    overviewNextAction: byId("overview-next-action"),
    demoProgressionStatus: byId("demo-progression-status"),
    simulateReferralCompletion: byId("simulate-referral-completion"),
    simulateFollowupCompletion: byId("simulate-followup-completion"),
    simulateIntendedOutcome: byId("simulate-intended-outcome"),
    imageInput: byId("image-input"),
  };

  const viewLabelKeys = {
    member: "view.member",
    operator: "view.operator",
    doctor: "view.doctor",
    journey: "view.journey",
  };

  const text = (key) => translations[currentLanguage][key] ?? translations.en[key] ?? key;
  const format = (key, values) => text(key).replace(/\{(\w+)\}/g, (_, name) => values[name] ?? "");

  function localize() {
    document.documentElement.lang = currentLanguage;
    document.title = text("shell.pageTitle");
    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute("content", text("shell.metaDescription"));
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      element.textContent = text(element.dataset.i18n);
    });
    document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
      element.setAttribute("aria-label", text(element.dataset.i18nAriaLabel));
    });
    languageControls.forEach((control) => {
      const active = control.dataset.language === currentLanguage;
      control.classList.toggle("is-active", active);
      control.setAttribute("aria-pressed", String(active));
    });
    elements.activeWorkspace.textContent = text(viewLabelKeys[currentView]);
    elements.overviewActiveActor.textContent = text(viewLabelKeys[currentView]);
    if (currentAnnouncementKey && !elements.notice.hidden) {
      elements.notice.textContent = text(currentAnnouncementKey);
    }
  }

  function setLanguage(language) {
    if (!translations[language]) return;
    currentLanguage = language;
    render();
  }

  function showView(name) {
    const target = byId(`view-${name}`);
    if (!target) return;

    currentView = name;
    views.forEach((view) => view.classList.toggle("is-hidden", view !== target));
    viewControls.forEach((control) => {
      const active = control.dataset.view === name;
      if (control.matches(".actor-tab")) {
        control.classList.toggle("is-active", active);
        control.setAttribute("aria-current", active ? "page" : "false");
      }
    });
    elements.activeWorkspace.textContent = text(viewLabelKeys[name]);
    elements.overviewActiveActor.textContent = text(viewLabelKeys[name]);
  }

  function announce(key) {
    currentAnnouncementKey = key;
    elements.notice.textContent = text(key);
    elements.notice.hidden = false;
  }

  function setProgress() {
    const progressStates = [
      { complete: true, current: state.step === 0 },
      { complete: state.step >= 2, current: state.step === 1 },
      { complete: state.step >= 4, current: state.step === 2 || state.step === 3 },
      { complete: state.step >= 6, current: state.step === 4 || state.step === 5 },
      { complete: state.step >= 8, current: state.step === 6 || state.step === 7 },
      { complete: state.step >= 8, current: state.step === 8 },
    ];

    progressItems.forEach((item, index) => {
      const status = progressStates[index];
      item.classList.toggle("is-complete", status.complete);
      item.classList.toggle("is-current", status.current);
      item.classList.toggle("is-pending", !status.complete && !status.current);
      item.querySelector(".progress-node").textContent = status.complete ? "✓" : String(index + 2).padStart(2, "0");
    });

    overviewItems.forEach((item) => {
      const index = Number(item.dataset.stageIndex);
      item.classList.toggle("is-complete", index < state.step);
      item.classList.toggle("is-current", index === state.step);
      item.classList.toggle("is-pending", index > state.step);
      item.querySelector("span").textContent = index < state.step ? "✓" : index === 8 ? "↺" : String(index + 1).padStart(2, "0");
    });
  }

  function renderMember() {
    const content = {
      icon: ["!", "◌", "✓", "◌", "→", "→", "✓", "✓", "↺"][state.step],
      status: text(`member.state.${state.step}.status`),
      title: text(`member.state.${state.step}.title`),
      copy: text(`member.state.${state.step}.copy`),
      next: text(`member.state.${state.step}.next`),
      actor: text(`member.state.${state.step}.actor`),
      note: text(`member.state.${state.step}.note`),
    };

    elements.memberStatusIcon.textContent = content.icon;
    elements.memberStatus.textContent = content.status;
    elements.memberStatusTitle.textContent = content.title;
    elements.memberStatusCopy.textContent = content.copy;
    elements.memberNextLabel.textContent = content.next;
    elements.memberNextAction.querySelector("[data-i18n]").textContent = text("member.viewPatientUpdate");
    elements.memberNextDetails.textContent = format("member.nextDetails", { actor: content.actor, note: content.note });
    elements.memberNoteCopy.textContent = content.note;

    const memberStages = [
      { key: "screening", complete: true, current: state.step === 0, status: text("member.status.completed") },
      { key: "imaging", complete: state.step >= 2, current: state.step === 1, status: state.step >= 2 ? `${text("member.status.completed")} ✓` : state.step === 1 ? text("member.status.inProgress") : text("member.status.nextStep") },
      { key: "review", complete: state.step >= 4, current: state.step === 2 || state.step === 3, status: state.step >= 4 ? `${text("member.status.completed")} ✓` : state.step === 3 ? text("member.status.inProgress") : state.step === 2 ? text("member.status.readyReview") : text("member.status.waiting") },
      { key: "referral", complete: state.step >= 6, current: state.step === 4 || state.step === 5, status: state.step >= 6 ? `${text("member.status.completed")} ✓` : state.step === 5 ? text("member.status.createdAwaitingCompletion") : state.step === 4 ? text("member.status.nextStep") : text("member.status.notStarted") },
      { key: "followup", complete: state.step >= 7, current: state.step === 6, status: state.step >= 7 ? `${text("member.status.completed")} ✓` : state.step === 6 ? text("member.status.requiredNext") : text("member.status.willBeShown") },
      { key: "outcome", complete: state.step >= 8, current: state.step === 7, status: state.step >= 8 ? `${text("member.status.recorded")} ✓` : state.step === 7 ? text("member.status.readyToRecord") : text("member.status.willBeUpdated") },
      { key: "monitoring", complete: state.step >= 8, current: state.step === 8, status: state.step >= 8 ? text("member.status.active") : text("member.status.remainsVisible") },
    ];
    memberStages.forEach((stage) => {
      const item = memberItems.find((candidate) => candidate.dataset.memberStage === stage.key);
      item.classList.toggle("is-complete", stage.complete);
      item.classList.toggle("is-current", stage.current);
      item.classList.toggle("is-pending", !stage.complete && !stage.current);
      item.querySelector(".member-step-node").textContent = stage.complete ? "✓" : stage.key === "monitoring" ? "↺" : String(memberStages.indexOf(stage) + 1).padStart(2, "0");
      byId(`member-${stage.key === "screening" ? "screening" : stage.key}-state`).textContent = stage.status;
    });
  }

  function renderOperator() {
    const taskOpened = state.step >= 1 || state.taskOpened;
    const complete = state.step >= 2;
    elements.operatorWaitingCount.textContent = state.step === 0 ? "01" : "00";
    elements.operatorActiveCount.textContent = state.step === 1 ? "01" : "00";
    elements.operatorDoneCount.textContent = complete ? "01" : "00";
    elements.operatorTaskSummary.textContent = text(complete ? "operator.taskSummary.completed" : taskOpened ? "operator.taskSummary.ready" : "operator.taskSummary.waiting");
    elements.operatorTaskStatus.textContent = text(complete ? "operator.status.completed" : taskOpened ? "operator.status.inProgress" : "operator.status.waiting");
    elements.operatorTaskStatus.className = `queue-badge ${complete ? "queue-badge-green" : taskOpened ? "queue-badge-blue" : "queue-badge-amber"}`;
    elements.openImagingTask.hidden = taskOpened;
    elements.operatorExamStatus.textContent = text(complete ? "operator.status.completed" : taskOpened ? "operator.status.inProgress" : "operator.status.waiting");
    elements.operatorExamStatus.className = `state-chip ${complete ? "state-chip-green" : taskOpened ? "state-chip-blue" : "state-chip-amber"}`;
    elements.operatorTaskDetail.hidden = !taskOpened || complete;
    elements.operatorCompleteCard.hidden = !complete;
    elements.operatorCompleteCopy.textContent = text(state.step >= 3 ? "operator.completeAfterHandoffCopy" : "operator.completeInitialCopy");
    elements.scanPreview.classList.toggle("is-ready", state.imageSelected);
    const imageLabel = state.imageLabel === demoImageLabelKey || state.imageLabel === localImageLabelKey
      ? text(state.imageLabel)
      : state.imageLabel;
    elements.scanPreviewTitle.textContent = state.imageSelected ? imageLabel : text("operator.noImageSelected");
    elements.scanPreviewCopy.textContent = text(complete ? "operator.preview.confirmed" : state.imageSelected ? "operator.preview.ready" : "operator.preview.useDemo");
    elements.selectedFile.textContent = state.imageSelected ? format("operator.selectedSource", { source: imageLabel }) : text("operator.noImageSourceSelected");
    elements.confirmImage.disabled = complete || !state.imageSelected || state.step !== 1;
    elements.aiCard.hidden = state.step < 2;
    elements.continueReview.hidden = state.step !== 2;
    if (state.step >= 3) elements.aiCard.querySelector(".ai-copy p").textContent = text("operator.externalCapabilityAfterReview");
  }

  function renderDoctor() {
    const capabilityAvailable = state.step >= 2;
    const reviewReady = state.step === 3;
    const caseReady = state.step >= 3;
    const caseOpen = caseReady && state.doctorCaseOpen;
    const queueState = state.step < 3
      ? { count: "00", summary: text("doctor.queue.noCase.summary"), status: text("doctor.queue.noCase.status"), badge: "queue-badge-blue" }
      : state.step === 3
        ? { count: "01", summary: text("doctor.queue.ready.summary"), status: text("doctor.queue.ready.status"), badge: "queue-badge-green" }
        : state.step === 4
          ? { count: "00", summary: text("doctor.queue.reviewed.summary"), status: text("doctor.queue.reviewed.status"), badge: "queue-badge-blue" }
          : state.step >= 5
            ? { count: "00", summary: text("doctor.queue.completed.summary"), status: text("doctor.queue.completed.status"), badge: "queue-badge-green" }
            : { count: "00", summary: text("doctor.queue.noCase.summary"), status: text("doctor.queue.noCase.status"), badge: "queue-badge-blue" };
    elements.doctorQueueCount.textContent = queueState.count;
    elements.doctorQueueSummary.textContent = queueState.summary;
    elements.doctorQueueStatus.textContent = queueState.status;
    elements.doctorQueueStatus.className = `queue-badge ${queueState.badge}`;
    elements.openDoctorCase.hidden = !caseReady || caseOpen;
    elements.doctorEmptyState.hidden = caseOpen;
    elements.doctorCasePanel.hidden = !caseOpen;

    const emptyHeading = elements.doctorEmptyState.querySelector("h2");
    const emptyCopy = elements.doctorEmptyState.querySelector("p");
    const emptyEyebrow = elements.doctorEmptyState.querySelector(".eyebrow");
    emptyEyebrow.textContent = text(reviewReady ? "doctor.empty.ready.eyebrow" : caseReady ? "doctor.empty.complete.eyebrow" : "doctor.empty.none.eyebrow");
    emptyHeading.textContent = text(reviewReady ? "doctor.empty.ready.title" : caseReady ? "doctor.empty.complete.title" : "doctor.empty.none.title");
    emptyCopy.textContent = text(reviewReady ? "doctor.empty.ready.copy" : caseReady ? "doctor.empty.complete.copy" : "doctor.empty.none.copy");

    elements.doctorReviewStatus.textContent = text(state.step >= 4 ? "doctor.reviewStatus.completed" : "doctor.reviewStatus.required");
    elements.doctorReviewStatus.className = `state-chip ${state.step >= 4 ? "state-chip-green" : "state-chip-blue"}`;
    elements.doctorImagingStatus.textContent = text(capabilityAvailable ? "doctor.imagingStatus.completed" : "doctor.imagingStatus.pending");
    elements.doctorSupportStatus.textContent = text(capabilityAvailable ? "doctor.supportStatus.available" : "doctor.supportStatus.unavailable");
    elements.doctorProfessionalStatus.textContent = text(state.step >= 4 ? "doctor.professionalStatus.completed" : "doctor.professionalStatus.required");
    elements.doctorActionButton.hidden = !caseOpen || (!reviewReady && state.step !== 4) || state.step >= 5;

    const actions = {
      3: ["doctor.action.review.eyebrow", "doctor.action.review.title", "doctor.action.review.copy"],
      4: ["doctor.action.referral.eyebrow", "doctor.action.referral.title", "doctor.action.referral.copy"],
    };
    const actionKeys = state.step >= 5
      ? ["doctor.action.created.eyebrow", "doctor.action.created.title", "doctor.action.created.copy"]
      : actions[state.step] || ["doctor.action.next.eyebrow", "doctor.action.next.title", "doctor.action.next.copy"];
    const action = actionKeys.map(text);
    elements.doctorActionEyebrow.textContent = action[0];
    elements.doctorActionTitle.textContent = action[1];
    elements.doctorActionCopy.textContent = action[2];
    elements.doctorActionButton.textContent = `${action[1]} →`;
  }

  function renderJourney() {
    const current = {
      label: text(`journey.stage.${state.step}.label`),
      state: text(`journey.stage.${state.step}.state`),
      next: text(`journey.stage.${state.step}.next`),
    };
    const copy = text(`journey.copy.${state.step}`);
    const nextActions = journeyStageKeys.map((index) => text(`journey.stage.${index}.next`));
    elements.overviewStatus.textContent = text(state.step === 0 ? "journey.status.actionRequired" : state.step === 8 ? "journey.status.monitoringActive" : "journey.status.inProgress");
    elements.overviewStatus.className = `state-chip ${state.step === 0 ? "state-chip-amber" : state.step === 8 ? "state-chip-green" : "state-chip-blue"}`;
    elements.overviewCurrentIcon.textContent = state.step === 0 ? "!" : state.step === 8 ? "↺" : "✓";
    elements.overviewCurrentTitle.textContent = current.label;
    elements.overviewCurrentCopy.textContent = copy;
    elements.overviewNextCopy.textContent = `${text("journey.nextPrefix")} ${current.next}. ${copy}`;
    elements.overviewNextAction.textContent = nextActions[state.step];
    elements.demoProgressionStatus.textContent = text(`journey.progression.${state.step}`);
    elements.simulateReferralCompletion.hidden = state.step !== 5;
    elements.simulateFollowupCompletion.hidden = state.step !== 6;
    elements.simulateIntendedOutcome.hidden = state.step !== 7;
  }

  function configureAiLink() {
    if (aiUrl) {
      elements.aiLink.href = aiUrl;
      elements.aiLink.classList.remove("is-disabled");
      elements.aiLink.removeAttribute("aria-disabled");
      elements.aiLinkStatus.textContent = text(state.aiOpened ? "operator.aiStatus.opened" : "operator.aiStatus.configured");
    } else {
      elements.aiLink.removeAttribute("href");
      elements.aiLink.classList.add("is-disabled");
      elements.aiLink.setAttribute("aria-disabled", "true");
      elements.aiLinkStatus.textContent = text("operator.aiStatus.notConfigured");
    }
  }

  function render() {
    localize();
    setProgress();
    renderMember();
    renderOperator();
    renderDoctor();
    renderJourney();
    configureAiLink();
  }

  function beginImagingTask() {
    if (state.step !== 0) return false;
    state.step = 1;
    state.taskOpened = true;
    return true;
  }

  function resetDemo() {
    state.step = 0;
    state.imageSelected = false;
    state.imageLabel = "";
    state.aiOpened = false;
    state.taskOpened = false;
    state.doctorCaseOpen = false;
    elements.imageInput.value = "";
    currentAnnouncementKey = "";
    elements.notice.hidden = true;
    elements.memberNextDetails.hidden = true;
    elements.memberNextAction.setAttribute("aria-expanded", "false");
    showView("member");
    render();
  }

  elements.memberNextAction.addEventListener("click", () => {
    const expanded = elements.memberNextDetails.hidden;
    elements.memberNextDetails.hidden = !expanded;
    elements.memberNextAction.setAttribute("aria-expanded", String(expanded));
  });
  viewControls.forEach((control) => control.addEventListener("click", (event) => {
    if (control.matches("a")) event.preventDefault();
    showView(control.dataset.view);
  }));
  languageControls.forEach((control) => control.addEventListener("click", () => setLanguage(control.dataset.language)));
  byId("reset-top").addEventListener("click", resetDemo);
  byId("reset-main").addEventListener("click", resetDemo);
  elements.openImagingTask.addEventListener("click", () => {
    if (!beginImagingTask()) return;
    announce("announcement.imagingOpened");
    render();
  });
  elements.imageInput.addEventListener("change", (event) => {
    if (state.step !== 1) return;
    const file = event.target.files[0];
    if (!file) return;
    state.imageSelected = true;
    state.imageLabel = file.name || localImageLabelKey;
    announce("announcement.localImageSelected");
    render();
  });
  byId("demo-image").addEventListener("click", () => {
    if (state.step !== 1) return;
    state.imageSelected = true;
    state.imageLabel = demoImageLabelKey;
    announce("announcement.demoImageSelected");
    render();
  });
  elements.confirmImage.addEventListener("click", () => {
    if (!state.imageSelected || state.step !== 1) return;
    state.step = 2;
    announce("announcement.imageCompleted");
    render();
  });
  elements.aiLink.addEventListener("click", (event) => {
    if (!aiUrl) {
      event.preventDefault();
      announce("announcement.aiUnavailable");
      return;
    }
    state.aiOpened = true;
    elements.aiLinkStatus.textContent = text("operator.aiStatus.opened");
  });
  elements.continueReview.addEventListener("click", () => {
    if (state.step !== 2) return;
    state.step = 3;
    state.doctorCaseOpen = true;
    showView("doctor");
    announce("announcement.doctorReview");
    render();
  });
  elements.openDoctorCase.addEventListener("click", () => {
    if (state.step < 3) return;
    state.doctorCaseOpen = true;
    render();
  });
  elements.doctorActionButton.addEventListener("click", () => {
    if (!state.doctorCaseOpen || state.step < 3 || state.step >= 5) return;
    if (state.step === 3) {
      state.step = 4;
      announce("announcement.reviewCompleted");
    } else if (state.step === 4) {
      state.step = 5;
      announce("announcement.referralCreated");
    } else {
      return;
    }
    render();
  });

  elements.simulateReferralCompletion.addEventListener("click", () => {
    if (state.step !== 5) return;
    state.step = 6;
    announce("announcement.referralCompleted");
    render();
  });
  elements.simulateFollowupCompletion.addEventListener("click", () => {
    if (state.step !== 6) return;
    state.step = 7;
    announce("announcement.followupCompleted");
    render();
  });
  elements.simulateIntendedOutcome.addEventListener("click", () => {
    if (state.step !== 7) return;
    state.step = 8;
    announce("announcement.outcomeCompleted");
    render();
  });

  showView("member");
  render();
})();
