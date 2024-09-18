// Objekat sa svim igračima i njihovim bodovima
const players = {
    dejan: { name: "Dejan Marković", points: 0, element: "leader-dejan", card: "card-dejan" },
    goran: { name: "Goran Cimeša", points: 0, element: "leader-goran", card: "card-goran" },
    leonardo: { name: "Leonardo Giric", points: 0, element: "leader-leonardo", card: "card-leonardo" },
    djordje: { name: "Đorđe Trifunović", points: 0, element: "leader-djordje", card: "card-djordje" },
    teodor: { name: "Teodor Majkić", points: 0, element: "leader-teodor", card: "card-teodor" },
    dalibor: { name: "Dalibor Giric", points: 0, element: "leader-dalibor", card: "card-dalibor" },
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
