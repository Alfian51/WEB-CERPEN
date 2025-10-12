document.addEventListener('DOMContentLoaded', () => {
    // Initial story data to populate the website for first-time visitors
    const initialStories = [
        // Komedi
        { id: 1728550000001, title: "Ayam-Ayam Tersesat di Mall", category: "Komedi", content: "Pak Bejo menganggap membawa ayam-ayam jago kesayangannya, si Jalu, si Blorok, dan si Ireng, ke pameran unggas di kota adalah ide cemerlang. Namun, ide itu menguap begitu saja saat di tengah jalan, tali pengikat kandang di mobil bak terlepas. Ketiga ayam itu, yang seumur hidup hanya melihat pekarangan, tiba-tiba menemukan diri mereka di depan pintu lobi sebuah mal yang megah.\n\nDalam kepanikan, mereka berlari masuk, menciptakan kekacauan yang tak terduga. Si Jalu, dengan gagahnya, berkokok nyaring di atas eskalator yang sedang berjalan turun, membuatnya seperti sedang berselancar. Si Blorok menyelinap masuk ke sebuah toko pakaian dan bertengger manis di atas manekin bergaun mahal, seolah-olah itu adalah tenggeran pribadinya. Sementara si Ireng, yang paling pemalu, justru menyebabkan masalah terbesar dengan masuk ke area food court dan mematuk-matuk kentang goreng sisa di lantai, membuat beberapa pengunjung menjerit geli sekaligus kaget. Pak Bejo, dengan napas terengah-engah, harus berlari ke sana kemari, dibantu oleh dua satpam yang kebingungan antara ingin tertawa dan ingin menangkap para perusuh berbulu itu.", comments: [] },
        { id: 1728550000002, title: "Sandal Jepit yang Tertukar", category: "Komedi", content: "Kejadiannya bermula di sebuah salat Jumat yang ramai. Budi, seorang mahasiswa, meletakkan sandal jepitnya di antara puluhan pasang lainnya. Selesai ibadah, ia mendapati sandalnya telah raib, digantikan oleh sepasang sandal pink dengan hiasan bunga matahari yang ukurannya dua nomor lebih besar. Karena terburu-buru, Budi terpaksa memakainya.\n\nPerjalanan pulangnya menjadi sebuah parade rasa malu. Setiap mata seolah tertuju pada kakinya yang kontras. Puncaknya adalah ketika seorang anak kecil menunjuk dan berteriak, \"Lihat, Ayah, Mas-mas pakai sandal Ibu!\". Budi hanya bisa pasrah. Esoknya, ia menempelkan pengumuman 'Kehilangan Sandal Jepit Biru' di mading masjid, yang tanpa disangka menjadi viral di grup WhatsApp warga, memicu serangkaian kesalahpahaman dan lelucon yang melibatkan banyak pihak.", comments: [] },
        { id: 1728550000003, title: "Kucing Oranye dan Konspirasi Timun", category: "Komedi", content: "Oyen, seekor kucing oranye dengan reputasi sebagai biang onar, memiliki satu ketakutan terbesar: timun. Baginya, sayuran hijau panjang itu bukanlah tanaman biasa, melainkan alien mata-mata yang dikirim untuk menginvasi rumahnya. Keyakinan ini membuatnya selalu waspada.\n\nSuatu hari, pemiliknya iseng meletakkan sepotong timun di belakang Oyen yang sedang tertidur pulas. Ketika Oyen bangun dan berbalik, ia melihat 'monster hijau' itu. Seketika, ia melompat setinggi satu meter, mendesis, lalu berlari dengan kecepatan penuh menabrak tumpukan kaleng di dapur. Dari sudut pandang Oyen, ia baru saja menyelamatkan dunia dari serangan alien. Dari sudut pandang pemiliknya, Oyen baru saja menciptakan kekacauan total hanya karena sepotong sayuran.", comments: [] },
        // Romance
        { id: 1728550000004, title: "Hujan di Bawah Tenda Biru", category: "Romance", content: "Hujan turun tiba-tiba, memaksa Rina, seorang desainer grafis, untuk berteduh di bawah tenda biru seorang penjual buku bekas di pinggir jalan. Aroma kertas tua dan hujan menjadi perpaduan yang menenangkan. Di sana, seorang pria berkacamata, Dani, juga sedang berteduh sambil asyik membaca buku puisi.\n\nKarena bosan, Rina iseng bertanya tentang buku yang dibaca Dani. Percakapan pun mengalir, dari penyair favorit, desain sampul buku, hingga mimpi-mimpi mereka yang belum terwujud. Mereka tertawa, bertukar pikiran, dan tanpa sadar, hujan telah reda. Saat mereka bersiap untuk pergi, Dani menyobek secarik kertas dari buku catatannya. \"Jika suatu saat hujan lagi, mungkin kita bisa minum kopi,\" katanya sambil memberikan nomor teleponnya. Rina tersenyum, hatinya sehangat mentari setelah hujan.", comments: [] },
        { id: 1728550000005, title: "Catatan di Buku Tua", category: "Romance", content: "Lia adalah seorang pecinta buku-buku usang. Suatu sore yang mendung, di sudut remang perpustakaan kota, ia menemukan sebuah novel berjudul 'Senja di Pelabuhan'. Bukan ceritanya yang menarik perhatian Lia, melainkan catatan-catatan kecil yang ditulis dengan tinta biru di pinggiran halamannya. Tulisan tangan yang rapi itu berisi pemikiran, pertanyaan, dan perasaan si pembaca sebelumnya tentang alur cerita.\n\nAda komentar lucu, ada analisis mendalam, bahkan ada satu halaman yang sedikit kaku bekas air mata dengan tulisan \"Aku juga pernah merasakannya.\" Lia merasa ada ikatan aneh dengan orang asing ini. Ia merasa seperti sedang berdialog melintasi waktu. Didorong oleh rasa penasaran yang tak tertahankan, Lia memutuskan untuk mencari tahu siapa pemilik tulisan tangan itu. Petunjuk satu-satunya adalah sebuah inisial \"A.P.\" dan tanggal \"Juni 2018\" di halaman terakhir. Misinya pun dimulai, dari memeriksa kartu peminjam buku lawas hingga menanyai pustakawan senior, berharap menemukan jiwa yang terasa begitu dekat namun tak pernah ia temui.", comments: [] },
        { id: 1728550000006, title: "Kopi Pertama", category: "Romance", content: "Bayu dan Sinta adalah rekan kerja yang selama berbulan-bulan hanya berani saling curi pandang di antara bilik kubikel mereka. Akhirnya, setelah mengumpulkan segenap keberanian, Bayu mengirim pesan singkat: \"Kopi setelah kerja?\" Jantungnya berdebar kencang menunggu balasan, yang ternyata datang cepat: \"Boleh.\"\n\nKencan pertama mereka di sebuah kedai kopi kecil terasa canggung. Bayu tidak sengaja menumpahkan sedikit kopinya, dan Sinta tertawa terlalu keras hingga tersedak. Namun, di tengah semua ketidaksempurnaan itu, mereka menemukan kenyamanan. Mereka berbicara tentang hal-hal sepele, dari musik yang mereka suka hingga betapa menyebalkannya bos mereka. Di bawah cahaya lampu kedai yang temaram, mereka menyadari bahwa percikan yang mereka rasakan di kantor ternyata nyata. Itu adalah awal dari banyak cangkir kopi berikutnya.", comments: [] },
        // Horror
        { id: 1728550000007, title: "Jangan Tengok ke Belakang", category: "Horror", content: "Jalanan kompleks perumahan itu selalu sepi jika sudah lewat tengah malam. Malam ini, kamu terpaksa lembur dan harus berjalan kaki sendirian. Di bawah cahaya lampu jalan yang remang-remang, kamu mendengar suara langkah kaki lain di belakangmu. Langkahnya terdengar persis seperti langkahmu, seirama, seolah bayanganmu memiliki berat.\n\nKamu berhenti, dan suara itu ikut berhenti. Jantungmu mulai berdebar. Kamu mempercepat langkah, dan suara itu juga ikut mempercepat. Keringat dingin mulai membasahi keningmu. Sebuah nasihat lama dari nenekmu tiba-tiba terngiang di kepala: \'Kalau berjalan sendirian di malam hari dan ada yang mengikuti, jangan pernah menengok ke belakang. Terus saja berjalan sampai kamu tiba di pintu rumahmu.' Pintu rumahmu masih 50 meter lagi, dan suara langkah itu kini terasa semakin dekat.", comments: [] },
        { id: 1728550000008, title: "Penghuni Lemari Tua", category: "Horror", content: "Lemari kayu jati itu adalah temuan terbaik Adi di pasar loak. Ukirannya rumit dan tampak antik. Namun, keindahan itu segera berganti dengan kengerian. Setiap malam, tepat setelah jam berdentang dua belas kali, Adi mulai mendengar suara cakaran pelan dari dalam lemari. Awalnya, ia mencoba rasional. \"Hanya tikus,\" gumamnya pada diri sendiri. Ia bahkan meletakkan perangkap, tetapi perangkap itu selalu kosong keesokan paginya.\n\nSuara cakaran itu terus berlanjut, terkadang lebih keras, lebih panik, seolah ada sesuatu yang putus asa ingin keluar. Suatu malam, karena tak tahan lagi, Adi memberanikan diri mendekati lemari itu. Suara cakaran tiba-tiba berhenti. Hening. Saat Adi menempelkan telinganya ke pintu lemari, ia tidak mendengar apa-apa. Ia menghela napas lega. Namun, saat ia berbalik, terdengar suara 'kriet' pelan dari belakangnya. Pintu lemari itu perlahan terbuka, menampakkan bukan pakaian, melainkan kegelapan pekat yang seolah hidup dan bernapas, dan dari dalam kegelapan itu, sepasang mata pucat balas menatapnya.", comments: [] },
        { id: 1728550000009, title: "Telepon dari Nomor Tak Dikenal", category: "Horror", content: "Semuanya dimulai seminggu yang lalu. Setiap malam tepat pukul 11:11, ponsel Dinda berdering. Di layar selalu tertera 'Nomor Tidak Dikenal'. Setiap kali diangkat, yang terdengar hanyalah suara statis yang aneh, seperti radio rusak. Dinda mencoba memblokir nomor itu, tetapi panggilan itu tetap masuk entah bagaimana caranya.\n\nSuatu malam, Dinda memutuskan untuk tidak mengangkatnya. Panggilan itu berhenti, dan ia merasa lega. Namun, beberapa detik kemudian, sebuah pesan suara masuk. Dengan tangan gemetar, Dinda mendengarkannya. Di antara suara statis yang biasa ia dengar, kali ini ada suara lain. Suara bisikan yang sangat lirih, serak, dan dingin, seolah berasal dari tempat yang sangat jauh. Bisikan itu hanya mengucapkan satu kata berulang-ulang: namanya. \"Dinda... Dinda... Dinda...\"", comments: [] },
        // Misteri
        { id: 1728550000010, title: "Hilangnya Lukisan di Galeri", category: "Misteri", content: "Lukisan 'Bulan di Atas Lembah' adalah mahakarya sang maestro yang tak ternilai harganya. Malam itu, lukisan tersebut dipamerkan di sebuah ruangan khusus di galeri nasional, dilindungi oleh sensor gerak, CCTV, dan pintu baja yang hanya bisa dibuka dengan dua kunci berbeda. Namun, keesokan paginya, para penjaga menemukan bingkai lukisan itu kosong, tergantung rapi di tempatnya. Lukisannya lenyap.\n\nDetektif Arya dipanggil ke tempat kejadian. Tidak ada tanda-tanda pembobolan. Semua sistem keamanan tercatat mati selama tepat 60 detik pada pukul 02:00 dini hari, lalu hidup kembali. Tidak ada sidik jari, tidak ada saksi. Seolah-olah lukisan itu menguap begitu saja. Arya harus memecahkan misteri ruang terkunci ini, mewawancarai setiap staf galeri yang semuanya memiliki alibi, dan menemukan bagaimana sang pencuri bisa melakukan hal yang mustahil.", comments: [] },
        { id: 1728550000011, title: "Surat Kaleng di Pagi Hari", category: "Misteri", content: "Kota kecil Harmoni yang biasanya tenang dan damai, tiba-tiba diguncang oleh teror. Setiap Senin pagi, beberapa warga menemukan sebuah amplop putih tanpa nama pengirim di kotak surat mereka. Di dalamnya, ada sebuah surat ketikan yang mengungkap rahasia paling kelam dari si penerima. Perselingkuhan, hutang piutang, hingga kejahatan masa lalu yang terkubur, semuanya diungkap tanpa ampun.\n\nKepanikan menyebar lebih cepat dari api. Tetangga mulai saling curiga, persahabatan puluhan tahun hancur, dan reputasi orang-orang terpandang hancur dalam semalam. Tidak ada yang tahu siapa dalangnya, yang menyebut dirinya 'Sang Penjaga Moral'. Polisi kebingungan karena tidak ada petunjuk sama sekali. Setiap warga kini hidup dalam ketakutan, bertanya-tanya apakah hari Senin berikutnya adalah giliran mereka untuk menerima surat kaleng itu.", comments: [] },
        { id: 1728550000012, title: "Siapa yang Mematikan Lampu?", category: "Misteri", content: "Tuan Hartono, seorang kolektor barang antik, mengadakan pesta makan malam di villa mewahnya yang terpencil. Tepat saat hidangan penutup disajikan, ia dengan bangga memamerkan koleksi terbarunya: kalung berlian 'Mata Naga'. Tiba-tiba, lampu di seluruh villa padam total, membuat ruangan gelap gulita. Terdengar beberapa teriakan kaget, lalu hening.\n\nBeberapa detik kemudian, lampu darurat menyala, menerangi ruangan dengan cahaya redup. Tuan Hartono tergeletak di kursinya, pingsan. Dan kalung berlian itu telah raib dari lehernya. Pintu dan jendela semuanya terkunci dari dalam. Semua tamu yang hadir, dari saingan bisnis hingga kerabat jauh, memiliki motif untuk mencuri. Detektif yang kebetulan hadir sebagai tamu harus menemukan pencurinya sebelum ada yang bisa meninggalkan villa itu.", comments: [] },
        // Petualangan
        { id: 1728550000013, title: "Menuju Puncak Terlarang", category: "Petualangan", content: "Gunung Arga dikenal oleh penduduk desa sebagai 'Puncak Terlarang'. Konon, arwah para leluhur menjaga gunung itu dan akan menghukum siapa saja yang berani menginjakkan kaki di puncaknya. Tentu saja, bagi empat sahabat pencari adrenalin—Rian, Dika, Sari, dan Fira—larangan itu justru terdengar seperti undangan.\n\nMereka memulai pendakian secara diam-diam pada malam hari. Awalnya semua berjalan lancar, tetapi semakin tinggi mereka mendaki, semakin banyak keanehan yang terjadi. Suara gamelan terdengar di kejauhan padahal tidak ada pemukiman, jalur yang mereka lewati seolah berputar-putar, dan kompas mereka tiba-tiba tidak berfungsi. Mereka harus mengandalkan satu sama lain untuk bertahan dari dingin, kelelahan, dan rasa takut yang mulai menyelimuti, bertanya-tanya apakah legenda itu benar adanya.", comments: [] },
        { id: 1728550000014, title: "Peta Harta Karun Kakek", category: "Petualangan", content: "Saat membantu ibunya membersihkan gudang yang berdebu, Rio yang berusia 12 tahun menemukan sebuah peti kayu tua milik kakeknya. Di dalamnya, di antara album foto dan medali perang, ia menemukan sebuah peta yang digambar tangan di atas kain usang. Peta itu adalah denah halaman belakang rumah mereka, tetapi dengan tanda-tanda aneh, teka-teki, dan sebuah tanda \"X\" besar bertuliskan: 'Harta karun keluarga, hanya untuk mata yang jeli'.\n\nDengan semangat petualang yang membara, Rio mengajak adiknya, Lana, untuk memecahkan misteri itu. Berbekal sekop mainan, kompas dari gantungan kunci, dan imajinasi tanpa batas, mereka memulai ekspedisi terbesar mereka. Mereka menggali di dekat pohon mangga tua, mengukur jarak dari ayunan, dan memecahkan sandi yang ditinggalkan kakek mereka, mengubah halaman belakang yang membosankan menjadi pulau harta karun yang penuh misteri.", comments: [] },
        { id: 1728550000015, title: "Menyusuri Sungai Misterius", category: "Petualangan", content: "Dr. Arini adalah seorang ahli biologi yang mendedikasikan hidupnya untuk menemukan spesies baru. Kesempatan emas datang ketika ia mendapat dana untuk memimpin ekspedisi menyusuri Sungai Kayan, sebuah jalur air di pedalaman Kalimantan yang konon belum pernah dijelajahi manusia modern. Bersama timnya, ia menaiki perahu kayu, memasuki jantung hutan belantara.\n\nSetiap hari adalah penemuan baru: serangga dengan warna-warni aneh, anggrek yang tak ada di buku mana pun, dan suara-suara primata yang tak dikenal. Namun, petualangan itu berubah menjadi perjuangan untuk bertahan hidup ketika mereka menemukan reruntuhan sebuah peradaban kuno di tepi sungai. Mereka tidak menyadari bahwa penemuan itu telah membangunkan sesuatu yang selama ini menjaga reruntuhan tersebut, sesuatu yang tidak suka diganggu dan mulai memburu mereka satu per satu.", comments: [] }
    ];

    // Populate localStorage with initial stories if it's empty or out of date
    const SCRIPT_VERSION = "2.1"; // Version with longer stories
    const storedVersion = localStorage.getItem('cerpenVersion');
    const storiesExist = localStorage.getItem('cerpenCollection') !== null;

    if (!storiesExist || storedVersion !== SCRIPT_VERSION) {
        localStorage.setItem('cerpenCollection', JSON.stringify(initialStories));
        localStorage.setItem('cerpenVersion', SCRIPT_VERSION);
    }

    const writeForm = document.getElementById('writeForm');
    const cerpenList = document.getElementById('cerpenList');
    const latestStoriesList = document.getElementById('latest-stories-list');
    const storyFullContent = document.getElementById('story-full-content');

    // --- Logic for Write Page ---
    if (writeForm) {
        const cerpenTitle = document.getElementById('cerpenTitle');
        const cerpenContent = document.getElementById('cerpenContent');
        const wordCountEl = document.getElementById('word-count');
        const saveStatusEl = document.getElementById('save-status');
        let saveTimeout;

        // 1. Word Count Function
        function updateWordCount() {
            const content = cerpenContent.value;
            const characterCount = content.length;
            const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
            wordCountEl.textContent = `${wordCount} Kata, ${characterCount} Karakter`;
        }

        // 2. Autosave Function
        function saveDraft() {
            const draft = {
                title: cerpenTitle.value,
                content: cerpenContent.value,
            };
            localStorage.setItem('cerpenDraft', JSON.stringify(draft));
            saveStatusEl.textContent = `Tersimpan otomatis pada ${new Date().toLocaleTimeString()}`;
        }

        // 3. Load Draft Function
        function loadDraft() {
            const draft = JSON.parse(localStorage.getItem('cerpenDraft'));
            if (draft) {
                cerpenTitle.value = draft.title;
                cerpenContent.value = draft.content;
                updateWordCount(); // Update count after loading draft
                saveStatusEl.textContent = 'Draf sebelumnya berhasil dimuat.';
            }
        }

        // Attach event listeners
        cerpenContent.addEventListener('input', () => {
            updateWordCount();
            // Debounce save function
            clearTimeout(saveTimeout);
            saveStatusEl.textContent = 'Mengetik...';
            saveTimeout = setTimeout(saveDraft, 2000); // Save 2 seconds after user stops typing
        });
        cerpenTitle.addEventListener('input', () => {
             // Debounce save function
            clearTimeout(saveTimeout);
            saveStatusEl.textContent = 'Mengetik...';
            saveTimeout = setTimeout(saveDraft, 2000);
        });


        // Handle form submission
        writeForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const title = cerpenTitle.value;
            const content = cerpenContent.value;

            const category = document.querySelector('input[name="category"]:checked');

            if (!title || !content || !category) {
                alert('Judul, isi cerpen, dan kategori tidak boleh kosong!');
                return;
            }

            const newStory = {
                id: Date.now(),
                title: title,
                content: content,
                category: category.value,
                comments: []
            };
            const stories = JSON.parse(localStorage.getItem('cerpenCollection')) || [];
            stories.push(newStory);
            localStorage.setItem('cerpenCollection', JSON.stringify(stories));

            // Clear the draft after successful submission
            localStorage.removeItem('cerpenDraft');
            
            alert('Cerpen berhasil dipublikasikan!');
            window.location.href = 'browse.html';
        });

        // Initial load
        loadDraft();
    }

    // --- Logic for Browse Page ---
    if (cerpenList) {
        const stories = JSON.parse(localStorage.getItem('cerpenCollection')) || [];
        const filterButtonsContainer = document.getElementById('category-filters');

        // Helper function to get color based on category
        const getCategoryColor = (category) => {
            switch (category) {
                case 'Komedi': return '#ffc107'; // Yellow
                case 'Romance': return '#e83e8c'; // Pink
                case 'Horror': return '#343a40'; // Dark Gray
                case 'Misteri': return '#6f42c1'; // Purple
                case 'Petualangan': return '#28a745'; // Green
                default: return '#6c757d'; // Gray
            }
        };

        // Function to display stories on the page
        const displayStories = (filteredStories) => {
            cerpenList.innerHTML = '';
            if (filteredStories.length === 0) {
                cerpenList.innerHTML = '<p class="col-12">Tidak ada cerpen dalam kategori ini.</p>';
            } else {
                filteredStories.slice().reverse().forEach(story => {
                    const storyCard = `
                        <div class="col-md-6 col-lg-4 mb-4 story-card-item" data-category="${story.category}">
                            <div class="card story-card-v3 h-100" style="--category-color: ${getCategoryColor(story.category)};">
                                <div class="card-body d-flex flex-column">
                                    <h5 class="card-title">${story.title}</h5>
                                    <p class="card-text flex-grow-1">${story.content.substring(0, 150)}...</p>
                                    <div class="mt-auto pt-3">
                                        <span class="category-badge">${story.category}</span>
                                    </div>
                                    <div class="mt-3">
                                        <a href="story.html?id=${story.id}" class="btn btn-secondary btn-sm">Baca</a>
                                        <button class="btn btn-danger btn-sm delete-btn" data-story-id="${story.id}">Hapus</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                    cerpenList.innerHTML += storyCard;
                });
            }
        };

        // Function to handle filtering and update active button
        const filterAndDisplay = (category) => {
            const allStories = JSON.parse(localStorage.getItem('cerpenCollection')) || [];
            let storiesToShow = [];

            if (category === 'all') {
                storiesToShow = allStories;
            } else {
                storiesToShow = allStories.filter(story => story.category === category);
            }
            displayStories(storiesToShow);

            // Update active state for filter buttons
            const buttons = filterButtonsContainer.querySelectorAll('.filter-btn');
            buttons.forEach(button => {
                if (button.getAttribute('data-category') === category) {
                    button.classList.add('btn-primary');
                    button.classList.remove('btn-outline-primary');
                } else {
                    button.classList.remove('btn-primary');
                    button.classList.add('btn-outline-primary');
                }
            });
        };

        // Add event listeners to filter buttons
        filterButtonsContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('filter-btn')) {
                const category = e.target.getAttribute('data-category');
                filterAndDisplay(category);
            }
        });

        // Initial load: Check for URL parameter and display stories
        const urlParams = new URLSearchParams(window.location.search);
        const categoryFromUrl = urlParams.get('category');

        if (categoryFromUrl) {
            filterAndDisplay(categoryFromUrl);
        } else {
            filterAndDisplay('all'); // Default to show all
        }
    }

    // --- Logic for Home Page ---
    if (latestStoriesList) {
        const stories = JSON.parse(localStorage.getItem('cerpenCollection')) || [];
        
        // Helper function to get color based on category
        const getCategoryColor = (category) => {
            switch (category) {
                case 'Komedi': return '#ffc107';
                case 'Romance': return '#e83e8c';
                case 'Horror': return '#343a40';
                case 'Misteri': return '#6f42c1';
                case 'Petualangan': return '#28a745';
                default: return '#6c757d';
            }
        };

        if (stories.length === 0) {
            latestStoriesList.innerHTML = '<p class="col-12">Belum ada cerpen yang ditulis. <a href="write.html">Mulai menulis sekarang!</a></p>';
        } else {
            latestStoriesList.innerHTML = '';
            const latestThree = stories.slice(-3).reverse();
            latestThree.forEach(story => {
                const storyCard = `
                    <div class="col-md-4 mb-4">
                        <div class="card story-card-v3 h-100" style="--category-color: ${getCategoryColor(story.category)};">
                            <div class="card-body d-flex flex-column">
                                <h5 class="card-title">${story.title}</h5>
                                <p class="card-text flex-grow-1">${story.content.substring(0, 100)}...</p>
                                <div class="mt-auto pt-3">
                                    <span class="category-badge">${story.category}</span>
                                </div>
                                <div class="mt-3">
                                    <a href="story.html?id=${story.id}" class="btn btn-secondary btn-sm">Baca</a>
                                    <button class="btn btn-danger btn-sm delete-btn" data-story-id="${story.id}">Hapus</button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                latestStoriesList.innerHTML += storyCard;
            });
        }
    }

    // --- DELEGATED EVENT LISTENER FOR DELETE ---
    function handleDelete(event) {
        if (event.target.classList.contains('delete-btn')) {
            const storyId = parseInt(event.target.getAttribute('data-story-id'));
            
            if (confirm('Apakah Anda yakin ingin menghapus cerpen ini? Aksi ini tidak dapat dibatalkan.')) {
                let stories = JSON.parse(localStorage.getItem('cerpenCollection')) || [];
                const updatedStories = stories.filter(story => story.id !== storyId);
                localStorage.setItem('cerpenCollection', JSON.stringify(updatedStories));
                window.location.reload(); // Reload the page to reflect changes
            }
        }
    }

    if(cerpenList) {
        cerpenList.addEventListener('click', handleDelete);
    }
    if(latestStoriesList) {
        latestStoriesList.addEventListener('click', handleDelete);
    }

    // --- Logic for Story Page ---
    if (storyFullContent) {
        const urlParams = new URLSearchParams(window.location.search);
        const storyId = parseInt(urlParams.get('id'));
        let stories = JSON.parse(localStorage.getItem('cerpenCollection')) || [];
        let story = stories.find(s => s.id === storyId);

        const commentsList = document.getElementById('comments-list');
        const commentForm = document.getElementById('comment-form');

        function displayComments() {
            commentsList.innerHTML = '';
            if (story.comments && story.comments.length > 0) {
                story.comments.forEach(comment => {
                    const commentEl = document.createElement('div');
                    commentEl.className = 'card bg-light mb-3';
                    commentEl.innerHTML = `
                        <div class="card-body">
                            <p class="card-text">${comment.text}</p>
                            <p class="card-subtitle text-muted small">Oleh: <strong>${comment.name}</strong> pada ${new Date(comment.date).toLocaleDateString()}</p>
                        </div>
                    `;
                    commentsList.appendChild(commentEl);
                });
            } else {
                commentsList.innerHTML = '<p>Belum ada komentar. Jadilah yang pertama!</p>';
            }
        }

        if (story) {
            document.title = story.title + " - INDOCERPEN";
            const storyHTML = `
                <h1>${story.title}</h1>
                <p class="text-muted">Ditulis pada ${new Date(story.id).toLocaleDateString()} | Kategori: ${story.category}</p>
                <hr>
                <div class="story-body">
                    ${story.content.split('\n\n').map(p => `<p>${p.replace(/\n/g, '<br>')}</p>`).join('')}
                </div>
            `;
            storyFullContent.innerHTML = storyHTML;

            displayComments();

            commentForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const commenterName = document.getElementById('commenter-name').value;
                const commentText = document.getElementById('comment-text').value;

                const newComment = {
                    name: commenterName,
                    text: commentText,
                    date: Date.now()
                };

                const storyIndex = stories.findIndex(s => s.id === storyId);
                if (storyIndex > -1) {
                    if (!stories[storyIndex].comments) {
                        stories[storyIndex].comments = [];
                    }
                    stories[storyIndex].comments.push(newComment);
                    
                    story = stories[storyIndex];
                    localStorage.setItem('cerpenCollection', JSON.stringify(stories));

                    displayComments();
                    commentForm.reset();
                }
            });

        } else {
            storyFullContent.innerHTML = '<h1>Cerpen tidak ditemukan.</h1><p>Cerpen yang Anda cari mungkin telah dihapus atau linknya salah.</p>';
            document.getElementById('comments-section').style.display = 'none';
        }
    }
});
