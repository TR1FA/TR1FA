// Podaci o igračima i njihovim bodovima
const players = JSON.parse(localStorage.getItem('players')) || {
    dejan: { name: "Dejan Marković", totalPoints: 21, roundPoints: 6 },
    goran: { name: "Goran Cimeša", totalPoints: 4, roundPoints: 0 },
    leonardo: { name: "Leonardo Giric", totalPoints: 15, roundPoints: 3 },
    djordje: { name: "Đorđe Trifunović", totalPoints: 10, roundPoints: 0 },
    teodor: { name: "Teodor Majkić", totalPoints: 16, roundPoints: 1 },
    dalibor: { name: "Dalibor Giric", totalPoints: 15, roundPoints: 2 },
    bojanm: { name: "Bojan Majkić", totalPoints: 1, roundPoints: 0 },
    bojanp: { name: "Bojan Milanović", totalPoints: 0, roundPoints: 0 },
    milan: { name: "Milan Lalošević", totalPoints: 0, roundPoints: 0 }
};

function updateRoundPoints() {
    const playerSelect = document.getElementById('player-select');
    const roundPosition = document.getElementById('round-position');
    const playerId = playerSelect.value;
    const position = parseInt(roundPosition.value);

    if (!pointsForPosition[position]) return;

    // Dodaj bodove za kolo
    players[playerId].roundPoints += pointsForPosition[position];
    
    // Ažuriraj ukupne bodove
    players[playerId].totalPoints += pointsForPosition[position];

    // Ažuriraj prikaz bodova na stranici
    document.getElementById(`round-${playerId}`).textContent = players[playerId].roundPoints;
    document.getElementById(`leader-${playerId}`).textContent = players[playerId].totalPoints;

    // Save the updated players data to localStorage
    localStorage.setItem('players', JSON.stringify(players));

    // Ažuriraj tabelu lidera
    updateLeaderboard();
}

// Load saved data and update leaderboard on page load
window.onload = () => {
    updateLeaderboard();
};

function updateLeaderboard() {
    const tableBody = document.getElementById('leaderboard-table').getElementsByTagName('tbody')[0];

    // Sortiraj igrače prema ukupnim bodovima
    const sortedPlayers = Object.values(players).sort((a, b) => b.totalPoints - a.totalPoints);

    // Očisti postojeće redove
    tableBody.innerHTML = '';

    // Dodaj redove sa ažuriranim bodovima
    sortedPlayers.forEach(player => {
        const row = tableBody.insertRow();
        row.insertCell(0).textContent = player.name;
        row.insertCell(1).textContent = player.totalPoints;
    });
}

