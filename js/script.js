document.addEventListener('DOMContentLoaded', () => {
    // API_URL is no longer needed as backend interaction is removed.
    // const API_URL = 'http://localhost:3000/api';

    const writeForm = document.getElementById('writeForm');
    const cerpenList = document.getElementById('cerpenList');
    const latestStoriesList = document.getElementById('latest-stories-list');
    const storyFullContent = document.getElementById('story-full-content');

    // Dummy Stories Data (since backend is removed)
    const dummyStories = [
        { id: 1, title: 'Senja di Ujung Cakrawala', content: 'Sebuah kisah tentang persahabatan, cinta, dan kehilangan di sebuah desa kecil yang damai. Mentari terbenam perlahan, mewarnai langit dengan jingga keemasan, seolah mengucapkan selamat tinggal pada hari yang telah berlalu. Di tepi danau, dua sahabat duduk berdekatan, berbagi cerita dan tawa, tak menyadari bahwa waktu terus berputar, membawa perubahan yang tak terhindarkan. Angin semilir membawa aroma bunga melati, menambah syahdunya suasana. Namun, di balik keindahan itu, tersimpan rahasia yang akan mengubah segalanya.', category: 'Romance', created_at: '2023-10-26T10:00:00Z' },
        { id: 2, title: 'Mesin Waktu Kakek', content: 'Seorang anak laki-laki menemukan mesin waktu tua di gudang kakeknya dan memulai petualangan yang tak terduga. Debu tebal menyelimuti setiap sudut gudang, namun mata penasaran Bima tak luput menangkap siluet aneh di pojok ruangan. Sebuah kotak besar berkarat dengan tombol-tombol aneh dan jarum jam yang tak bergerak. Kakek selalu melarangnya masuk ke gudang ini, tapi hari ini, rasa ingin tahu Bima jauh lebih besar dari rasa takutnya. Dengan jantung berdebar, ia mendekat, menyentuh permukaan dingin mesin itu, dan tanpa sengaja menekan sebuah tombol.', category: 'Petualangan', created_at: '2023-10-25T11:30:00Z' },
        { id: 3, title: 'Hujan Bulan Juni', content: 'Kisah romantis tentang dua orang yang saling jatuh cinta di tengah hujan bulan Juni yang tak kunjung reda. Setiap tetes hujan seolah menjadi saksi bisu pertemuan mereka. Payung merah muda yang terbuka lebar, senyum malu-malu yang tersembunyi di balik rintik air, dan percakapan ringan yang perlahan menumbuhkan benih-benih asmara. Mereka tak pernah menyangka, bahwa di bawah langit yang kelabu, cinta bisa tumbuh sehangat mentari musim panas. Aroma tanah basah dan kopi hangat menjadi latar belakang kisah mereka yang baru dimulai.', category: 'Romance', created_at: '2023-10-24T14:15:00Z' },
        { id: 4, title: 'Misteri Rumah Tua', content: 'Sekelompok remaja memberanikan diri memasuki rumah tua angker dan menemukan rahasia kelam yang terkubur di dalamnya. Pintu berderit terbuka, menyambut mereka dengan kegelapan pekat dan bau apak yang menusuk hidung. Jaring laba-laba menghiasi setiap sudut, dan suara angin yang berdesir melalui celah jendela menciptakan melodi seram. Mereka datang untuk mencari sensasi, namun yang mereka temukan jauh lebih dari sekadar cerita hantu. Sebuah buku harian tua tergeletak di lantai, membuka lembaran kisah tragis yang telah lama terlupakan.', category: 'Misteri', created_at: '2023-10-23T09:45:00Z' },
        { id: 5, title: 'Tawa di Balik Layar', content: 'Seorang komedian stand-up yang selalu ceria di panggung, menyembunyikan kesedihan mendalam di balik tawa penontonnya. Setiap malam, ia berdiri di bawah sorotan lampu, melontarkan lelucon yang membuat semua orang terpingkal. Namun, begitu tirai panggung tertutup, senyumnya memudar, digantikan oleh tatapan kosong dan kesunyian yang menusuk. Ia adalah master ilusi, menciptakan kebahagiaan bagi orang lain, sementara hatinya sendiri hancur berkeping-keping. Hanya cermin di ruang ganti yang tahu rahasia air matanya.', category: 'Komedi', created_at: '2023-10-22T16:00:00Z' },
        { id: 6, title: 'Pulau Terlarang', content: 'Petualangan mendebarkan sekelompok penjelajah yang tersesat di pulau tak berpenghuni dengan makhluk-makhluk aneh. Kapal mereka karam dihantam badai, meninggalkan mereka terdampar di sebuah pulau yang tidak terdaftar di peta manapun. Hutan lebat dengan pepohonan raksasa, suara-suara aneh dari balik semak-semak, dan jejak kaki misterius di pasir pantai. Mereka harus bertahan hidup, menghadapi bahaya yang tak terduga, dan mencari jalan pulang sebelum pulau itu menelan mereka selamanya. Setiap langkah adalah pertaruhan nyawa.', category: 'Petualangan', created_at: '2023-10-21T08:00:00Z' },
        { id: 7, title: 'Bayangan di Cermin', content: 'Seorang wanita dihantui oleh bayangannya sendiri yang mulai bergerak dan berbicara secara independen. Awalnya hanya bisikan, lalu bayangan di cermin mulai meniru gerakannya dengan jeda, seolah memiliki kehendak sendiri. Ketakutan merayapi setiap inci hidupnya, mengubah rumahnya menjadi penjara. Ia mencoba menutup semua cermin, namun bayangan itu tetap muncul di genangan air, di kaca jendela, bahkan di matanya sendiri. Apakah ini kutukan, ataukah ia perlahan kehilangan akal sehatnya?', category: 'Horror', created_at: '2023-10-20T19:00:00Z' },
        { id: 8, title: 'Cinta di Musim Gugur', content: 'Kisah cinta yang tumbuh di antara daun-daun berguguran, penuh kehangatan dan melankolis. Mereka bertemu di sebuah taman kota, di bawah pohon maple yang daunnya mulai menguning. Pertemuan tak sengaja itu berlanjut menjadi percakapan panjang, tawa renyah, dan janji-janji manis di tengah hembusan angin musim gugur. Namun, seperti daun yang akhirnya jatuh, ada kekhawatiran akan perpisahan yang tak terhindarkan. Akankah cinta mereka sekuat akar pohon, ataukah akan layu bersama musim?', category: 'Romance', created_at: '2023-10-19T12:00:00Z' }
    ];

    // A map to get category colors, useful for styling.
    const categoryColorMap = {
        'Komedi': '#ffc107',
        'Romance': '#e83e8c',
        'Horror': '#343a40',
        'Misteri': '#6f42c1',
        'Petualangan': '#28a745',
        'default': '#6c757d'
    };
    const getCategoryColor = (category) => categoryColorMap[category] || categoryColorMap['default'];

    // --- Logic for Write Page (Disabled) ---
    if (writeForm) {
        writeForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Fitur publikasi cerpen dinonaktifkan karena koneksi database telah dihapus.');
        });
    }

    // --- Logic for Browse Page ---
    if (cerpenList) {
        const filterButtonsContainer = document.getElementById('category-filters');

        const displayStories = (stories) => {
            cerpenList.innerHTML = '';
            if (!stories || stories.length === 0) {
                cerpenList.innerHTML = '<p class="col-12 text-center text-muted">Tidak ada cerpen yang ditemukan dalam kategori ini.</p>';
                return;
            }
            
            stories.forEach(story => {
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
                                    <!-- Delete button is disabled as backend is removed -->
                                    <!-- <button class="btn btn-danger btn-sm delete-btn" data-story-id="${story.id}">Hapus</button> -->
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                cerpenList.innerHTML += storyCard;
            });
        };

        const fetchAndDisplayStories = (categoryFilter = 'all') => {
            let storiesToDisplay = [...dummyStories]; // Create a copy to avoid modifying original

            if (categoryFilter !== 'all') {
                storiesToDisplay = storiesToDisplay.filter(story => story.category === categoryFilter);
            }
            
            // Sort by created_at descending (latest first)
            storiesToDisplay.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

            displayStories(storiesToDisplay);
        };
        
        if (filterButtonsContainer) {
            filterButtonsContainer.addEventListener('click', (e) => {
                if (e.target.classList.contains('filter-btn')) {
                    // Remove active class from all filter buttons
                    const allButtons = filterButtonsContainer.querySelectorAll('.filter-btn');
                    allButtons.forEach(btn => {
                        btn.classList.remove('active', 'btn-primary');
                        btn.classList.add('btn-outline-primary');
                    });

                    // Add active class to the clicked button
                    e.target.classList.add('active', 'btn-primary');
                    e.target.classList.remove('btn-outline-primary');

                    const category = e.target.getAttribute('data-category');
                    fetchAndDisplayStories(category);
                }
            });
        }

        const urlParams = new URLSearchParams(window.location.search);
        const categoryFromUrl = urlParams.get('category');
        
        // Set the active button on page load
        const categoryToLoad = categoryFromUrl || 'all';
        const activeButton = filterButtonsContainer.querySelector(`.filter-btn[data-category="${categoryToLoad}"]`);
        if (activeButton) {
            activeButton.classList.add('active', 'btn-primary');
            activeButton.classList.remove('btn-outline-primary');
        }

        fetchAndDisplayStories(categoryToLoad);
    }

    // --- Logic for Home Page ---
    if (latestStoriesList) {
        const fetchLatestStories = () => {
            latestStoriesList.innerHTML = '';
            if (!dummyStories || dummyStories.length === 0) {
                latestStoriesList.innerHTML = '<p class="col-12 text-center text-muted">Belum ada cerpen yang dipublikasikan.</p>';
            } else {
                // Sort by created_at descending and take the first 3
                const latestThree = [...dummyStories].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 3); 
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
                                        <!-- Delete button is disabled as backend is removed -->
                                        <!-- <button class="btn btn-danger btn-sm delete-btn" data-story-id="${story.id}">Hapus</button> -->
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                    latestStoriesList.innerHTML += storyCard;
                });
            }
        };
        fetchLatestStories();
    }

    // --- Delegated Event Listener for Deleting a Story (Disabled) ---
    // const handleDelete = async (event) => {
    //     if (event.target.classList.contains('delete-btn')) {
    //         alert('Fitur hapus cerpen dinonaktifkan karena koneksi database telah dihapus.');
    //     }
    // };

    // --- Logic for Story Page (Reading a single story - Disabled for dynamic content) ---
    if (storyFullContent) {
        const urlParams = new URLSearchParams(window.location.search);
        const storyId = urlParams.get('id');
        const commentsList = document.getElementById('comments-list');
        const commentForm = document.getElementById('comment-form');

        if (commentForm) {
            commentForm.addEventListener('submit', (e) => {
                e.preventDefault();
                alert('Fitur kirim komentar dinonaktifkan karena koneksi database telah dihapus.');
            });
            commentForm.style.display = 'none'; // Hide the comment form
        }
        
        // Display a specific dummy story if ID matches, otherwise disabled message
        const story = dummyStories.find(s => s.id == storyId);
        if (story) {
            document.title = `${story.title} - INDOCERPEN`;
            storyFullContent.innerHTML = `
                <h1>${story.title}</h1>
                <p class="text-muted">Diterbitkan pada ${new Date(story.created_at).toLocaleDateString()} | Kategori: ${story.category}</p>
                <hr>
                <div class="story-body">${story.content.replace(/\n/g, '<br>')}</div>
            `;
            if (commentsList) commentsList.innerHTML = '<p class="text-center text-muted">Fitur komentar dinonaktifkan.</p>';
        } else {
            storyFullContent.innerHTML = `<h1>Fitur ini dinonaktifkan</h1><p>Cerpen tidak dapat dimuat atau ID tidak valid karena koneksi database telah dihapus.</p>`;
            if (commentsList) commentsList.innerHTML = '<p class="text-center text-muted">Fitur komentar dinonaktifkan.</p>';
        }
    }
});