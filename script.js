let isLoggedIn = false;
const adminUsername = "admin";
const adminPassword = "12345";

// Podaci o igračima i njihovim bodovima
const players = {
    dejan: { name: "Dejan Marković", totalPoints: 0, roundPoints: 0 },
    goran: { name: "Goran Cimeša", totalPoints: 0, roundPoints: 0 },
    leonardo: { name: "Leonardo Giric", totalPoints: 0, roundPoints: 0 },
    djordje: { name: "Đorđe Trifunović", totalPoints: 0, roundPoints: 0 },
    teodor: { name: "Teodor Majkić", totalPoints: 0, roundPoints: 0 },
    dalibor: { name: "Dalibor Giric", totalPoints: 0, roundPoints: 0 },
    bojanm: { name: "Bojan Majkić", totalPoints: 0, roundPoints: 0 },
    bojanp: { name: "Bojan Milanović", totalPoints: 0, roundPoints: 0 },
    milan: { name: "Milan Lalošević", totalPoints: 0, roundPoints: 0 }
};

const pointsForPosition = {
    1: 6,
    2: 3,
    3: 2,
    4: 1
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

    // Ažuriraj tabelu lidera
    updateLeaderboard();
}

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


}

// Inicijalno ažuriranje tabele lidera
updateLeaderboard();
