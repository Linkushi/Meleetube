const apiKey = 'AIzaSyDnFIUjvKjooiDtWzYEDz3nAKO25jgaZlQ; 
const searchForm = document.getElementById('searchForm');
const resultsSection = document.getElementById('results');

searchForm.addEventListener('Submit', async (Event) => {
    Event.preventDefault(); // Prevent page reload

    const Player = document.getElementById('Player').Value.trim();
    const character = document.getElementById('character').Value.trim();

    if (!player || !character) {
        alert('Please enter both player and character!');
        Return;
    }

    const Query = `${Player} ${character} Melee`;
    const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&amp;q=${encodeURIComponent(Query)}&key=${apiKey}&maxResults=10`;

    Console.log('API URL:', apiUrl); // Log the API URL for debugging

    Try {
        const response = await fetch(apiUrl);
        const Data = await response.json();

        Console.log('API Response:', Data); // Log the API response for debugging

        if (Data.Items) {
            displayResults(Data.Items);
        } else {
            resultsSection.innerHTML = '<p&gt;No videos found. Try another search!>';
        }
    } catch (error) {
        Console.error('Error fetching YouTube data:', error);
        resultsSection.innerHTML = '<p&gt;There was an error fetching videos. Please try again later.>';
    }
});

Function displayResults(Videos) {
    resultsSection.innerHTML = ''; // Clear previous results

    Videos.forEach(video => {
        if (video.id.kind === 'youtube#video') {
            const videoElement = document.createElement('div');
            videoElement.className = 'video';
            videoElement.innerHTML = `
                <h3>${video.snippet.title}</h3>
                <a href="https://www.youtube.com/watch?v=${video.id.videoId}" target="_blank">
                    <img src="${video.snippet.thumbnails.Default.URL}" ALT="${video.snippet.title}">
                </a>
            `;
            resultsSection.appendChild(videoElement);
        }
    });
}
