async function fetchBundles() {
    try {
      const response = await fetch('/api/bundles'); // Check the endpoint
      const bundles = await response.json();
  
      // Ensure bundles is an array
      if (Array.isArray(bundles)) {
        displayBundles(bundles);
      } else {
        console.error('Unexpected API response:', bundles);
      }
    } catch (error) {
      console.error('Error fetching bundles:', error);
    }
  }
  
  function displayBundles(bundles) {
    const container = document.getElementById('bundles-container');
    container.innerHTML = ''; // Clear loading text
  
    bundles.forEach(bundle => {
      const card = document.createElement('div');
      card.classList.add('bundle-card');
      card.innerHTML = `
        <img src="${bundle.displayIcon}" alt="${bundle.displayName}">
        <h3>${bundle.displayName}</h3>
      `;
      card.onclick = () => showBundleDetails(bundle);
      container.appendChild(card);
    });
  }
  
  function showBundleDetails(bundle) {
    const details = document.getElementById('bundle-details');
    document.getElementById('bundle-name').textContent = bundle.displayName;
    document.getElementById('bundle-image').src = bundle.displayIcon || '';
    document.getElementById('bundle-description').textContent = bundle.description || 'No description available.';
  
    details.classList.remove('hidden');
  }
  
  function closeBundleDetails() {
    document.getElementById('bundle-details').classList.add('hidden');
  }
  
  // Fetch bundles on page load
  fetchBundles();
  