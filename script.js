let isLoggedIn = false;
const adminUsername = "admin";
const adminPassword = "12345";

// Login funkcija
function login() {
    const username = document.getElementById('admin-username').value;
    const password = document.getElementById('admin-password').value;

    if (username === adminUsername && password === adminPassword) {
        isLoggedIn = true;
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('score-update').style.display = 'block';
    } else {
        document.getElementById('login-error').style.display = 'block';
    }
}

// Objekat sa svim igračima i njihovim bodovima
const players = {
    dejan: { name: "Dejan Marković", roundPoints: 0, totalPoints: 0, elementRound: "leader-dejan-round", elementTotal: "leader-dejan-total", card: "card-dejan" },
    teodor: { name: "Teodor Majkić", roundPoints: 0, totalPoints: 0, elementRound: "leader-teodor-round", elementTotal: "leader-teodor-total", card: "card-teodor" },
    leonardo: { name: "Leonardo Giric", roundPoints: 0, totalPoints: 0, elementRound: "leader-leonardo-round", elementTotal: "leader-leonardo-total", card: "card-leonardo" },
    bojanm: { name: "Bojan Majkić", roundPoints: 0, totalPoints: 0, elementRound: "leader-bojanm-round", elementTotal: "leader-bojanm-total", card: "card-bojanm" },
    // Dodajte ostale igrače
};

// Funkcija za ažuriranje bodova
function updatePoints() {
    if (!isLoggedIn) {
        alert('Morate se prijaviti da biste ažurirali bodove.');
        return;
    }

    const playerSelect = document.getElementById('player-select').value;
    const roundPoints = parseInt(document.getElementById('round-points-input').value, 10);
    const totalPoints = parseInt(document.getElementById('total-points-input').value, 10);

    if (isNaN(roundPoints) || isNaN(totalPoints)) {
        alert('Morate uneti validne bodove.');
        return;
    }

    const player = players[playerSelect];
    if (player) {
        player.roundPoints = roundPoints;
        player.totalPoints = totalPoints;

        document.getElementById(player.elementRound).textContent = roundPoints;
        document.getElementById(player.elementTotal).textContent = totalPoints;

        // Ažuriranje tabele
        updateLeaderboard();
    } else {
        alert('Igrač nije pronađen.');
    }
}

// Funkcija za ažuriranje tabele sa liderima
function updateLeaderboard() {
    const tbody = document.querySelector('#leaderboard-table tbody');
    tbody.innerHTML = '';

    // Kreiranje niza igrača i sortiranje prema ukupnim bodovima
    const sortedPlayers = Object.values(players).sort((a, b) => b.totalPoints - a.totalPoints);

    sortedPlayers.forEach(player => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${player.name}</td><td>${player.totalPoints}</td>`;
        tbody.appendChild(row);
    });
}

// Inicijalizujte tabelu sa liderima na učitavanju stranice
window.onload = updateLeaderboard;
