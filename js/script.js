document.addEventListener('DOMContentLoaded', () => {
    const API_URL = 'http://localhost:3000/api';

    const writeForm = document.getElementById('writeForm');
    const cerpenList = document.getElementById('cerpenList');
    const latestStoriesList = document.getElementById('latest-stories-list');
    const storyFullContent = document.getElementById('story-full-content');

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

    // --- Logic for Write Page ---
    if (writeForm) {
        writeForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const title = document.getElementById('cerpenTitle').value;
            const content = document.getElementById('cerpenContent').value;
            const categoryInput = document.querySelector('input[name="category"]:checked');

            if (!title || !content || !categoryInput) {
                alert('Judul, isi cerpen, dan kategori tidak boleh kosong!');
                return;
            }

            const storyData = {
                title,
                content,
                category: categoryInput.value
            };

            try {
                const response = await fetch(`${API_URL}/stories`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(storyData)
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Gagal mempublikasikan cerpen.');
                }

                alert('Cerpen berhasil dipublikasikan!');
                window.location.href = 'browse.html';
            } catch (error) {
                console.error('Error:', error);
                alert(`Terjadi kesalahan: ${error.message}`);
            }
        });
    }

    // --- Logic for Browse Page ---
    if (cerpenList) {
        const filterButtonsContainer = document.getElementById('category-filters');

        const displayStories = (stories) => {
            cerpenList.innerHTML = '';
            if (!stories || stories.length === 0) {
                cerpenList.innerHTML = '<p class="col-12 text-center text-muted">Tidak ada cerpen yang ditemukan.</p>';
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
                                    <button class="btn btn-danger btn-sm delete-btn" data-story-id="${story.id}">Hapus</button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                cerpenList.innerHTML += storyCard;
            });
        };

        const fetchAndDisplayStories = async (categoryFilter = 'all') => {
            try {
                const response = await fetch(`${API_URL}/stories`);
                if (!response.ok) throw new Error('Gagal mengambil data cerpen dari server.');
                
                let stories = await response.json();

                if (categoryFilter !== 'all') {
                    stories = stories.filter(story => story.category === categoryFilter);
                }
                
                displayStories(stories);

            } catch (error) {
                console.error('Error fetching stories:', error);
                cerpenList.innerHTML = `<p class="col-12 text-danger">Gagal memuat cerita. Silakan coba lagi nanti.</p>`;
            }
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
        const fetchLatestStories = async () => {
            try {
                const response = await fetch(`${API_URL}/stories`);
                if (!response.ok) throw new Error('Gagal mengambil data cerpen.');
                
                const stories = await response.json();

                latestStoriesList.innerHTML = '';
                if (!stories || stories.length === 0) {
                    latestStoriesList.innerHTML = '<p class="col-12 text-center text-muted">Belum ada cerpen yang dipublikasikan.</p>';
                } else {
                    const latestThree = stories.slice(0, 3); // API already sorts by DESC
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
            } catch (error) {
                console.error('Error fetching latest stories:', error);
                latestStoriesList.innerHTML = `<p class="col-12 text-danger">Gagal memuat cerita terbaru.</p>`;
            }
        };
        fetchLatestStories();
    }

    // --- Delegated Event Listener for Deleting a Story ---
    const handleDelete = async (event) => {
        if (event.target.classList.contains('delete-btn')) {
            const storyId = event.target.getAttribute('data-story-id');
            
            if (confirm('Apakah Anda yakin ingin menghapus cerpen ini? Aksi ini tidak dapat dibatalkan.')) {
                try {
                    const response = await fetch(`${API_URL}/stories/${storyId}`, { method: 'DELETE' });
                    if (!response.ok) throw new Error('Gagal menghapus cerpen dari server.');
                    
                    // Reload the page to reflect the deletion
                    window.location.reload();
                } catch (error) {
                    console.error('Error deleting story:', error);
                    alert(error.message);
                }
            }
        }
    };

    // Attach the delete listener to the story containers
    if (cerpenList) cerpenList.addEventListener('click', handleDelete);
    if (latestStoriesList) latestStoriesList.addEventListener('click', handleDelete);

    // --- Logic for Story Page (Reading a single story) ---
    if (storyFullContent) {
        const urlParams = new URLSearchParams(window.location.search);
        const storyId = urlParams.get('id');
        const commentsList = document.getElementById('comments-list');
        const commentForm = document.getElementById('comment-form');

        const displayComments = (comments) => {
            commentsList.innerHTML = '';
            if (comments && comments.length > 0) {
                comments.forEach(comment => {
                    const commentEl = document.createElement('div');
                    commentEl.className = 'card bg-light mb-3';
                    commentEl.innerHTML = `
                        <div class="card-body">
                            <p class="card-text">${comment.text}</p>
                            <p class="card-subtitle text-muted small">Oleh: <strong>${comment.name}</strong> pada ${new Date(comment.created_at).toLocaleDateString()}</p>
                        </div>
                    `;
                    commentsList.appendChild(commentEl);
                });
            } else {
                commentsList.innerHTML = '<p class="text-center text-muted">Belum ada komentar. Jadilah yang pertama!</p>';
            }
        };

        const fetchStoryAndComments = async () => {
            if (!storyId) {
                storyFullContent.innerHTML = '<h1>ID Cerpen tidak valid.</h1>';
                document.getElementById('comments-section').style.display = 'none';
                return;
            }
            try {
                // Fetch story content
                const storyRes = await fetch(`${API_URL}/stories/${storyId}`);
                if (!storyRes.ok) throw new Error('Cerpen tidak ditemukan.');
                const story = await storyRes.json();

                document.title = `${story.title} - INDOCERPEN`;
                storyFullContent.innerHTML = `
                    <h1>${story.title}</h1>
                    <p class="text-muted">Diterbitkan pada ${new Date(story.created_at).toLocaleDateString()} | Kategori: ${story.category}</p>
                    <hr>
                    <div class="story-body">${story.content.replace(/\n/g, '<br>')}</div>
                `;

                // Fetch comments for the story
                const commentsRes = await fetch(`${API_URL}/stories/${storyId}/comments`);
                if (!commentsRes.ok) throw new Error('Gagal mengambil data komentar.');
                const comments = await commentsRes.json();
                displayComments(comments);

            } catch (error) {
                console.error('Error fetching story/comments:', error);
                storyFullContent.innerHTML = `<h1>Terjadi Kesalahan</h1><p>${error.message}</p>`;
                document.getElementById('comments-section').style.display = 'none';
            }
        };

        if (commentForm) {
            commentForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const commenterName = document.getElementById('commenter-name').value;
                const commentText = document.getElementById('comment-text').value;

                if (!commenterName || !commentText) {
                    alert('Nama dan isi komentar tidak boleh kosong!');
                    return;
                }

                const commentData = { name: commenterName, text: commentText };

                try {
                    const response = await fetch(`${API_URL}/stories/${storyId}/comments`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(commentData)
                    });
                    if (!response.ok) throw new Error('Gagal mengirim komentar.');
                    
                    commentForm.reset();
                    // Refresh comments list after posting
                    const commentsRes = await fetch(`${API_URL}/stories/${storyId}/comments`);
                    const comments = await commentsRes.json();
                    displayComments(comments);

                } catch (error) {
                    console.error('Error submitting comment:', error);
                    alert(error.message);
                }
            });
        }

        fetchStoryAndComments();
    }
});