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

// Funkcija za ažuriranje bodova
function updatePoints() {
    if (!isLoggedIn) {
        alert('Morate se prijaviti da biste unosili bodove.');
        return;
    }

    const player = document.getElementById('player-select').value;
    const points = parseInt(document.getElementById('points-input').value);

    const pointsElement = document.getElementById(`points-${player}`);
    const leaderElement = document.getElementById(`leader-${player}`);

    let currentPoints = parseInt(pointsElement.innerText);
    currentPoints += points;

    pointsElement.innerText = currentPoints;
    leaderElement.innerText = currentPoints;

    // Sortiraj tabelu
    sortLeaderboard();
}

// Sortiranje tabele lidera po bodovima
function sortLeaderboard() {
    const table = document.getElementById("leaderboard-table");
    const rows = Array.from(table.rows).slice(1); // Izbegni zaglavlje tabele

    rows.sort((a, b) => {
        const aPoints = parseInt(a.cells[1].innerText);
        const bPoints = parseInt(b.cells[1].innerText);
        return bPoints - aPoints;
    });

    rows.forEach(row => table.appendChild(row)); // Ponovno dodavanje sortirane liste
}
