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
        loadPoints(); // Učitaj bodove prilikom uspešnog logovanja
    } else {
        document.getElementById('login-error').style.display = 'block';
    }
}

// Objekat sa svim igračima i njihovim bodovima
const players = {
    dejan: { name: "Dejan Marković", points: 0, element: "leader-dejan", card: "card-dejan" },
    goran: { name: "Goran Cimeša", points: 0, element: "leader-goran", card: "card-goran" },
    leonardo: { name: "Leonardo Giric", points: 0, element: "leader-leonardo", card: "card-leonardo" },
    djordje: { name: "Đorđe Trifunović", points: 0, element: "leader-djordje", card: "card-djordje" },
    teodor: { name: "Teodor Majkić", points: 0, element: "leader-teodor", card: "card-teodor" },
    dalibor: { name: "Dalibor Giric", points: 0, element: "leader-dalibor", card: "card-dalibor" },
    bojanm: { name: "Bojan Majkić", points: 0, element: "leader-bojanm", card: "card-bojanm" },
    bojanp: { name: "Bojan Milanović", points: 0, element: "leader-bojanp", card: "card-bojanp" },
    milan: { name: "Milan Lalošević", points: 0, element: "leader-milan", card: "card-milan" }
};

// Funkcija za ažuriranje bodova
function updatePoints() {
    if (!isLoggedIn) {
        alert('Morate se prijaviti da biste unosili bodove.');
        return;
    }

    const selectedPlayer = document.getElementById('player-select').value;
    const pointsInput = document.getElementById('points-input').value;

    if (pointsInput === "" || isNaN(pointsInput)) {
        alert("Unesite validan broj bodova!");
        return;
    }

    const points = parseInt(pointsInput);

    // Ažuriraj bodove igrača
    players[selectedPlayer].points += points;

    // Ažuriraj bodove u DOM-u
    document.getElementById(players[selectedPlayer].element).textContent = players[selectedPlayer].points;
    localStorage.setItem(selectedPlayer, players[selectedPlayer].points);

    // Ažuriraj bodove u kolu
    const playerCard = document.getElementById(players[selectedPlayer].card);
    playerCard.querySelector('p:last-of-type').textContent = `Bodovi u kolu: ${points}`;

    // Sortiraj tabelu lidera
    sortLeaderboard();
}

// Funkcija za sortiranje tabele lidera po bodovima
function sortLeaderboard() {
    const tableBody = document.getElementById("leaderboard-table").getElementsByTagName('tbody')[0];
    const rows = Array.from(tableBody.rows);

    rows.sort((a, b) => {
        const aPoints = parseInt(a.cells[1].innerText);
        const bPoints = parseInt(b.cells[1].innerText);
        return bPoints - aPoints;
    });

    rows.forEach(row => tableBody.appendChild(row)); // Ponovno dodavanje sortirane liste

    // Ažuriraj okvire za prva četiri mesta
    updateLeaderboardBorders();
}

// Funkcija za ažuriranje okvira lidera
function updateLeaderboardBorders() {
    const sortedPlayers = Object.keys(players).sort((a, b) => players[b].points - players[a].points);

    sortedPlayers.forEach((playerKey, index) => {
        const playerCard = document.getElementById(players[playerKey].card);

        // Ukloni sve okvire
        playerCard.classList.remove("gold", "silver", "brown", "lightbrown");

        // Dodaj odgovarajući okvir
        if (index === 0) {
            playerCard.classList.add("gold"); // 1. mesto
        } else if (index === 1) {
            playerCard.classList.add("silver"); // 2. mesto
        } else if (index === 2) {
            playerCard.classList.add("brown"); // 3. mesto
        } else if (index === 3) {
            playerCard.classList.add("lightbrown"); // 4. mesto
        }
    });
}

// Učitavanje bodova iz localStorage prilikom učitavanja stranice
function loadPoints() {
    for (let key in players) {
        let savedPoints = localStorage.getItem(key);
        if (savedPoints) {
            players[key].points = parseInt(savedPoints);
        }
        document.getElementById(players[key].element).textContent = players[key].points;
    }
    sortLeaderboard();
}

// Učitavanje bodova prilikom učitavanja stranice
window.onload = loadPoints;
