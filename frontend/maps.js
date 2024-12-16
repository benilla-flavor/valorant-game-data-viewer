async function fetchMaps() {
    try {
        const response = await fetch('/api/maps');
        const maps = await response.json();
        displayMaps(maps);
    } catch (error) {
        console.error('Error fetching maps:', error);
    }
}

function displayMaps(maps) {
    const container = document.getElementById('maps-container');
    container.innerHTML = ''; // Clear loading text

    maps.forEach(map => {
        const card = document.createElement('div');
        card.classList.add('map-card');
        card.innerHTML = `
            <img src="${map.splash}" alt="${map.displayName}">
            <h3>${map.displayName}</h3>
        `;
        card.onclick = () => showMapDetails(map); // Add click event to show details
        container.appendChild(card);
    });
}

function showMapDetails(map) {
    const details = document.getElementById('map-details');
    document.getElementById('map-name').textContent = map.displayName;
    document.getElementById('map-image').src = map.splash || '';
    document.getElementById('map-description').textContent = map.description || 'No description available.';
    document.getElementById('map-coordinates').textContent = `Coordinates: ${map.coordinates || 'Unknown'}`;

    details.classList.remove('hidden');
}

function closeMapDetails() {
    const details = document.getElementById('map-details');
    details.classList.add('hidden');
}

// Fetch maps on page load
fetchMaps();
