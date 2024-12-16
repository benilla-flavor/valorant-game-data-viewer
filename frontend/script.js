async function fetchAgents() {
  try {
    const response = await fetch('/api/agents');
    const agents = await response.json();

    // Filter to include only playable agents
    const playableAgents = agents.filter(agent => agent.isPlayableCharacter);

    displayAgents(playableAgents);
  } catch (error) {
    console.error('Error fetching agents:', error);
  }
}



function displayAgents(agents) {
  const container = document.getElementById('agents-container');
  container.innerHTML = ''; // Clear loading text

  agents.forEach(agent => {
    const card = document.createElement('div');
    card.classList.add('agent-card');
    card.innerHTML = `
      <img src="${agent.displayIconSmall}" alt="${agent.displayName}">
      <h3>${agent.displayName}</h3>
    `;
    card.onclick = () => showAgentDetails(agent);
    container.appendChild(card);
  });
}

function showAgentDetails(agent) {
  const details = document.getElementById('agent-details');
  document.getElementById('agent-name').textContent = agent.displayName;
  document.getElementById('agent-image').src = agent.fullPortrait || '';
  document.getElementById('agent-description').textContent = agent.description || 'No description available.';

  const abilitiesList = document.getElementById('agent-abilities');
  abilitiesList.innerHTML = ''; // Clear previous abilities

  if (agent.abilities && agent.abilities.length > 0) {
    agent.abilities.forEach(ability => {
      const abilityItem = document.createElement('li');
      abilityItem.innerHTML = `
        <img src="${ability.displayIcon || ''}" alt="${ability.displayName}">
        <div>
          <strong>${ability.displayName}</strong>
          <p>${ability.description || 'No description available.'}</p>
        </div>
      `;
      abilitiesList.appendChild(abilityItem);
    });
  } else {
    const noAbilities = document.createElement('li');
    noAbilities.textContent = 'No abilities available for this agent.';
    abilitiesList.appendChild(noAbilities);
  }

  details.classList.remove('hidden');
}

function closeDetails() {
  document.getElementById('agent-details').classList.add('hidden');
}

// Fetch agents on page load
fetchAgents();
