let playersData = [];



const searchInput = document.getElementById('search');
const playerCardsContainer = document.getElementById('Cards');
const paginationContainer = document.getElementById('pagination');
const playersPerPage = 10;
let currentPage = 1;
 // Store fetched player data here//
//
// Fetch player data from the API
async function fetchPlayers() {
    try {
        const response = await fetch('https://www.balldontlie.io/api/v1/players');
        const data = await response.json();
        playersData = data.data;
        renderPlayerCards();
    } catch (error) {
        console.error('Error fetching player data:', error);
    }
}

// Render player cards
function renderPlayerCards() {


    playerCardsContainer.innerHTML = '';
    const startIndex = (currentPage - 1) * playersPerPage;
    const endIndex = startIndex + playersPerPage;

    
    for (let i = startIndex; i < endIndex && i < playersData.length; i++) {

        const player = playersData[i];
        const card = document.createElement('div');
        card.classList.add('player-card');
        
        // Create card content here (including dummy image, player details, and team details button) 
        const playerImage = document.createElement('img');
        playerImage.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSle9BlCeBqrcnJBbZrs2z6i7hZFoReVSSa1QvZVQ4_IUEsnbH1hIF8713nlg&s";
        card.appendChild(playerImage)
        const playerName = document.createElement('h2');
        playerName.textContent = `${player.first_name} ${player.last_name}`;

        card.appendChild(playerName)
        const playerPosition = document.createElement('p');
        playerPosition.textContent = `Position: ${player.position}`;
        card.appendChild(playerPosition)

        const teamDetailsBtn = document.createElement('button');
        teamDetailsBtn.textContent = 'Team Details';
        teamDetailsBtn.addEventListener('click',  () => {
           showTeamDetails(player.team_id)
        }) 
        card.appendChild(teamDetailsBtn)
        playerCardsContainer.appendChild(card);

    }
    
    renderPagination();
}

// Render pagination controls
function renderPagination() {

    paginationContainer.innerHTML = '';
    const totalPages = Math.ceil(playersData.length / playersPerPage);
    
    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.innerText = i;
        pageButton.addEventListener('click', () => {

            currentPage = i;
            renderPlayerCards();
        });
        paginationContainer.appendChild(pageButton);
    }
}

// Handle search input
searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();

    const filteredPlayers = playersData.filter(player =>
        player.first_name.toLowerCase().includes(searchTerm) ||

        player.last_name.toLowerCase().includes(searchTerm)
    );
    currentPage = 1;
    playersData = filteredPlayers;
    renderPlayerCards();
});

// Initialize the page
fetchPlayers();

function showTeamDetails(teamId) {
    
    
    const dummyImg = "https://w7.pngwing.com/pngs/695/655/png-transparent-head-the-dummy-avatar-man-tie-jacket-user-thumbnail.png";

const playerURL = "https://www.balldontlie.io/api/v1/players";

const container = document.getElementById("single");


const id = localStorage.getItem("playerId");


const getData = async(url) => {
    let response = await fetch(url);
    let players = await response.json();
    console.log(players.data[id]);
    card(players.data, id);
}



getData(playerURL);


function card(data,index){

    let img = document.createElement("img");
        img.src = dummyImg;

     let h3 = document.createElement("h3");
     h3.innerText = "Name : " + data[index].first_name+" "+data[index].last_name;

     let p1 = document.createElement("p");
     p1.innerHTML = "Position : "+ data[index].position;

     let p2 = document.createElement("p");
     p2.innerText = "Team : "+data[index].team.full_name;
    
    let p3 = document.createElement("p");
    p3.innerText = "Abbr : "+ data[index].team.abbreviation;

    let p4 = document.createElement("p");
    p4.innerText = "Conference : "+ data[index].team.conference;

    let p5 = document.createElement("p");
    p5.innerText = "Division : "+data[index].team.division;

    let p6 = document.createElement("p");
    p6.innerText = "City : "+data[index].team.city;

    container.append(img,h3,p1,p2,p3,p4,p5,p6);

    }


}