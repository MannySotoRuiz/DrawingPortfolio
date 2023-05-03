window.addEventListener("load", function() {
    setup()
});

function setup() {
    console.log("hello world");
    const button = document.getElementById("button");
    button.addEventListener("click", async function() {
        const url = 'https://api-football-v1.p.rapidapi.com/v3/standings?season=2022&league=39';
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'f2d2d373f1msh21920bd07cfc49cp1035f0jsn891c7ed2c312',
                'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
            }
        };
        try {
            console.log("loading...");
            const response = await fetch(url, options);
            const result = await response.json();
            const stadnings = result.response[0].league.standings[0];
            displayStandings(stadnings);
        } catch (error) {
            console.log(error);
        }
        
    });
}

function displayStandings(standings) {
    const container = document.getElementById("apiDataContainer");
    container.classList.remove("hidden");

    for (let i  = 0; i < standings.length; i++) {
        const currentTeam = standings[i];
        const rank = currentTeam.rank;
        const teamName = currentTeam.team.name;
        const logo = currentTeam.team.logo;
        const points = currentTeam.points;

        const parentDiv = document.createElement("div");
        const rankP = document.createElement("p");
        rankP.textContent = `Rank: ${rank}`;

        const logoDiv = document.createElement("div");
        logoDiv.classList.add("teamLogo");
        const imgLogo = document.createElement("img");
        imgLogo.src = logo;
        logoDiv.appendChild(imgLogo);

        const rest = document.createElement("p");
        rest.textContent =  `${teamName}   Points: ${points}`;

        parentDiv.appendChild(rankP);
        parentDiv.appendChild(logoDiv);
        parentDiv.appendChild(rest);

        container.appendChild(parentDiv);
    }
}