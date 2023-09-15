const playerContainer = document.getElementById('all-players-container');
const newPlayerFormContainer = document.getElementById('new-player-form');
const playerListContainer = document.getElementById('player-list-container');

// Add your cohort name to the cohortName variable below, replacing the 'COHORT-NAME' placeholder
const cohortName = '2302-ACC-ET-WEB-PT-D';
// Use the APIURL variable for fetch requests
const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/players`;
//console.log('hi')
/**
 * It fetches all players from the API and returns them
 * @returns An array of objects.
 */
const fetchAllPlayers = async () => {
    try {
      const response = await fetch(APIURL);
      const players = await response.json();
      console.log(players)

      return players.data.players;
    } catch (err) {
        console.error('Uh oh, trouble fetching players!', err);
    }
};

const fetchSinglePlayer = async (playerId) => {
    try {
      //const response = await fetch(`${APIURL}/${playerId}`);
      const response = await fetch(APIURL);
      const player = await response.json();
      console.log(player.data.players[0].id);
      return player.data.players;


    } catch (err) {
        console.error(`Oh no, trouble fetching player #${playerId}!`, err);
    }
};

/*        const formData = new FormData(newplayerform);
    //formData.set('player Name');
    const data = object.formEntries(formData)
    fetch('https://fsa-puppy-bowl.herokuapp.com/api/2302-ACC-ET-WEB-PT-D/players', {
       method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(data)
        }).then(res => res.json ())
        .then(data => console.log(data))
});*/


const addNewPlayer = async (playerObj) => {
    try {
      
    } catch (err) {
        console.error('Oops, something went wrong with adding that player!', err);
    }
};

const removePlayer = async (playerId) => {
    try {
        const requestOptions = {
            method: 'delete'
        }
        const response = await fetch(`${APIURL}/data/players${id}`, 
        requestOptions);
        const player = await response.json();
        return player.data;
    } catch (err) {
        console.error(
            `Whoops, trouble removing player #${playerId} from the roster!`,
            err
        );
    }
};

/**
 * It takes an array of player objects, loops through them, and creates a string of HTML for each
 * player, then adds that string to a larger string of HTML that represents all the players. 
 * 
 * Then it takes that larger string of HTML and adds it to the DOM. 
 * 
 * It also adds event listeners to the buttons in each player card. 
 * 
 * The event listeners are for the "See details" and "Remove from roster" buttons. 
 * 
 * The "See details" button calls the `fetchSinglePlayer` function, which makes a fetch request to the
 * API to get the details for a single player. 
 * 
 * The "Remove from roster" button calls the `removePlayer` function, which makes a fetch request to
 * the API to remove a player from the roster. 
 * 
 * The `fetchSinglePlayer` and `removePlayer` functions are defined in the
 * @param playerList - an array of player objects
 * @returns the playerContainerHTML variable.
 */
const renderAllPlayers = (playerList) => {
    try {
        playerContainer.innerHTML = '';
        playerList.forEach((player) =>{
        const playerElement = document.createElement('div');
        playerElement.classList.add('player') ;
        playerElement.innerHTML = `
        <h2>${player.name}</h2>
        <p class="breed">${player.breed}</p>
        <p class="status">${player.status}</p>
        <img class="img", scr="${player.imageUrl}", width="300", height="300"/>
                      
        <p class="teamId">${player.teamId}</p>
        <p class="cohortId">${player.cohortId}</p>
        <button class="details-button" data-id="${player.id}">See details</button>
        <button class="delete-button" data-id="${player.id}">Remove from roster</button>
        `
        playerContainer.appendChild(playerElement);
        const detailsButton = playerElement.querySelector('.details-button');
        detailsButton.addEventListener('click', async (event) => {
        const playerId = event.target.dataset.id
        renderSinglePlayerById(playerId)
        });
        const deleteButton = playerElement.querySelector('.delete-button')
        deleteButton.addEventListener('click', async (event) => {
            const playerId = event.target.dataset.id
            removePlayer(playerId);
        })
       } )
        
    } catch (err) {
    console.error('Uh oh, trouble rendering players!', err);
}
};


//-----------------------------  start rendar single player  ---------------//

const renderSinglePlayerById = async (playerId) => {
    try {
             
        const player = await fetchSinglePlayer(playerId);
        const playerDetailsElement = document.createElement('div');      
        playerDetailsElement.classList.add('player-details');
        playerDetailsElement.innerHTML = ` 
            <h2>${player.name}</h2>
            <p class="breed">${player.breed}</p>
            <p class="status">${player.status}</p>
            <img class="img", scr="${player.imageUrl}", width="300", height="300"/>
                            
            <p class="teamId">${player.teamId}</p>
            <p class="cohortId">${player.cohortId}</p>
            <button class="close-button">Close</button>      
            `;          
                      
        playerContainer.style.display = 'none'
        playerListContainer.appendChild(playerDetailsElement);     
                        
        // add event listener to close button
              const closeButton = playerDetailsElement.querySelector('.close-button');
              closeButton.addEventListener('click', () => {
                playerDetailsElement.remove();
                playerContainer.style.display = 'block'
              });
            } catch (error) {
              console.error(error);
            }
          };                
             
       //-----------------------------  end rendar single player  ---------------//   
          
/**
 * It renders a form to the DOM, and when the form is submitted, it adds a new player to the database,
 * fetches all players from the database, and renders them to the DOM.
 */
const renderNewPlayerForm = () => {
    try {
        newPlayerFormContainer.innerHTML = '';
        const newPlayerElement = document.createElement('div');
        newPlayerElement.classList.add('player') ;
        newPlayerElement.innerHTML = ` 
        <form class="form" id="form"><h3>ADD PLAYER</h3>
        <label for="nameFileld" id="nameFileld">Player Name</label>
        <input name="playerName" type="text" placeholder="playerName">
        <label for="breedFileld" id="breedFileld">breed</label>
        <input breed="type" type="info" placeholder="breed">
        <input class="checkbox" name="termsconditions" type="checkbox">
        <button class="submit" type="submit">Add Player</button>
        </form> 
        `
        newPlayerFormContainer.appendChild(newPlayerElement);    
        
    } catch (err) {
        console.error('Uh oh, trouble rendering the new player form!', err);
    }
}

const init = async () => {
    const players = await fetchAllPlayers();
    //const playerList = await fetchSinglePlayer();
    
    renderAllPlayers(players);
    //fetchSinglePlayer(playerList)
    renderNewPlayerForm();
}

init();


///////////////  new player form //////////
//   const formData = document.getElementById('new-player-form');

//         formData.addEventListener("submit", async (e) => {
//         e.preventDefault();
//         const formData = new FormData(newplayerform);
//         const formDataSerialized = Object.fromEntries (formData);
//         const jsonObject = {
//           ...formDataSerialized,
//         sendToSelf: formDataSerialized.sendToSelf ? true : false,
//          };
//         try {
//         const response = await fetch(APIURL, {
//            method: 'POST',
//            body: JSON.stringify(jsonObject),
//            headers: {
//              "Content-Type": "application/json",
//         },
//        });
//        const json = await response.json();
//        console.log(json);
//        } catch(e) {
//        console.error(e) ;
//        alert("there as an error");
// }
// });