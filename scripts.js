const apiKey = 'YOUR_YOUTUBE_API_KEY';
const searchForm = document.getElementById('searchForm');
const resultsSection = document.getElementById('results');

searchForm.addEventListener('Submit', async (Event) => {
    Event.preventDefault();
    const Player = document.getElementById('Player').Value.trim();
    const character = document.getElementById('character').Value.trim();

    if (!player || !character) {
        alert('Please enter both player and character!');
        Return;
    }

    const Query = `${Player} ${character} Melee`;
    const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&amp;q=${encodeURIComponent(Query)}&key=${apiKey}&maxResults=10`;

    Try {
        const response = await fetch(apiUrl);
        const Data = await response.json();

        displayResults(Data.Items);
    } catch (error) {
        Console.error('Error fetching YouTube data:', error);
    }
});

Function displayResults(Videos) {
    resultsSection.innerHTML = '';
    Videos.forEach(video => {
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
