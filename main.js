const apiKey = 'YOUR_YOUTUBE_API_KEY';
const searchForm = document.getElementById('searchForm');
const resultsSection = document.getElementById('results');

searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const player = document.getElementById('player').value.trim();
    const character = document.getElementById('character').value.trim();

    if (!player || !character) {
        alert('Please enter both player and character!');
        return;
    }

    const query = `${player} ${character} Melee`;
    const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&key=${apiKey}&maxResults=10`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        displayResults(data.items);
    } catch (error) {
        console.error('Error fetching YouTube data:', error);
    }
});

function displayResults(videos) {
    resultsSection.innerHTML = '';
    videos.forEach(video => {
        if (video.id.kind === 'youtube#video') {
            const videoElement = document.createElement('div');
            videoElement.className = 'video';
            videoElement.innerHTML = `
                <h3>${video.snippet.title}</h3>
                <a href="https://www.youtube.com/watch?v=${video.id.videoId}" target="_blank">
                    <img src="${video.snippet.thumbnails.default.url}" alt="${video.snippet.title}">
                </a>
            `;
            resultsSection.appendChild(videoElement);
        }
    });
}