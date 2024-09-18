// Podaci za jednostavan login
const adminUsername = "admin";
const adminPassword = "12345";

// Login funkcija
function login() {
    const username = document.getElementById('admin-username').value;
    const password = document.getElementById('admin-password').value;
    
    if (username === adminUsername && password === adminPassword) {
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('score-update').style.display = 'block';
    } else {
        document.getElementById('login-error').style.display = 'block';
    }
}

// Ažuriranje bodova sa sortiranjem tabele
function updatePoints() {
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

// Sortiranje tabele lidera
function sortLeaderboard() {
    const table = document.getElementById('leaderboard-table').getElementsByTagName('tbody')[0];
    const rows = Array.from(table.getElementsByTagName('tr'));

    rows.sort((a, b) => {
        const pointsA = parseInt(a.getElementsByTagName('td')[1].innerText);
        const pointsB = parseInt(b.getElementsByTagName('td')[1].innerText);
        return pointsB - pointsA;
    });

    // Ažuriraj boje okvira na osnovu rezultata
    rows.forEach((row, index) => {
        row.style.border = 'none';
        if (index === 0) row.style.border = '3px solid gold';
        if (index === 1) row.style.border = '3px solid silver';
        if (index === 2) row.style.border = '3px solid brown'; // Braon za treće mesto
        if (index === 3) row.style.border = '3px solid #D2B48C'; // Svetlobraon za četvrto mesto
    });

    // Re-append sortirane redove u tabelu
    rows.forEach(row => table.appendChild(row));
}

// Objekat sa svim igračima i njihovim bodovima
const players = {
    dejan: { name: "Dejan Marković", points: 3, element: "leader-dejan", card: "card-dejan" },
    goran: { name: "Goran Cimeša", points: 0, element: "leader-goran", card: "card-goran" },
    leonardo: { name: "Leonardo Giric", points: 4, element: "leader-leonardo", card: "card-leonardo" },
    djordje: { name: "Đorđe Trifunović", points: 9, element: "leader-djordje", card: "card-djordje" },
    teodor: { name: "Teodor Majkić", points: 7, element: "leader-teodor", card: "card-teodor" },
    dalibor: { name: "Dalibor Giric", points: 1, element: "leader-dalibor", card: "card-dalibor" },
    bojanm: { name: "Bojan Majkić", points: 0, element: "leader-bojanm", card: "card-bojanm" }
};

// Učitavanje bodova iz localStorage
function loadPoints() {
    for (let key in players) {
        let savedPoints = localStorage.getItem(key);
        if (savedPoints) {
            players[key].points = parseInt(savedPoints);
        }
        document.getElementById(players[key].element).textContent = players[key].points;
    }
    updateLeaderboard();
}

// Ažuriranje bodova
function updatePoints() {
    const selectedPlayer = document.getElementById("player-select").value;
    const pointsInput = document.getElementById("points-input").value;

    if (pointsInput === "" || isNaN(pointsInput)) {
        alert("Unesite validan broj bodova!");
        return;
    }

    // Ažuriraj bodove igrača
    players[selectedPlayer].points += parseInt(pointsInput);

    // Ažuriraj bodove u DOM-u i localStorage
    document.getElementById(players[selectedPlayer].element).textContent = players[selectedPlayer].points;
    localStorage.setItem(selectedPlayer, players[selectedPlayer].points);

    updateLeaderboard();
}

// Ažuriranje rang liste i okvira




function updateLeaderboard() {
    // Sortiranje igrača po broju bodova
    const sortedPlayers = Object.keys(players).sort((a, b) => players[b].points - players[a].points);

    sortedPlayers.forEach((playerKey, index) => {
        const playerCard = document.getElementById(players[playerKey].card);

        // Ukloni sve okvire
        playerCard.style.border = "4px solid white";

        // Dodaj odgovarajući okvir
        if (index === 0) {
            playerCard.style.border = "4px solid gold"; // 1. mjesto
        } else if (index === 1) {
            playerCard.style.border = "4px solid silver"; // 2. mjesto
        } else if (index === 2) {
            playerCard.style.border = "4px solid bronze"; // 3. mjesto
        }
    });
}

// Učitavanje bodova prilikom učitavanja stranice
window.onload = loadPoints;



