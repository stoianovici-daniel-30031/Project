var api = require('./src/api.js').app;
const fs = require('fs');
const gamesfilepath = './src/games.json';

api.get('/', function (request, response) {
  response.json('NodeJS REST API');
});

api.get('/games', function (request, response) {
  response.json(getGames());
});

api.get('/games/:id', function (request, response) {
  let game = getGameById(request.params.id);
  if (game)
    response.json(game);

  response.json('The isn t.');
});

api.put('/games', function (request, response) {
  saveGame(request.body);

  response.json('The game is addes with succes.');
});

api.post('/games', function (request, response) {
  let game = request.body;
  let games= getGames();
  for(let i=0; i < games.length; i++) {
    if (games[i].id === game.id) {
      games[i] = game;
    }
  }

  try {
    fs.writeFileSync(gamesfilepath, JSON.stringify(games));
  } catch (err) {
    console.error(err)
  }

  response.json('The game is modified with succes.');
});

api.delete('/games/:index', function (request, response) {
  let games = getGames();

  games.splice(findIdInArray(request.params.index),1);

  try {
    fs.writeFileSync(gamesfilepath, JSON.stringify(games));
  } catch (err) {
    console.error(err)
  }

  response.json('The game with id' + request.params.index + ' is deleted.');
});

api.listen(3000, function () {
  console.log('Server running @ localhost:3000');
});

function getGames() {
  let games = [];
  try {
    games = JSON.parse(fs.readFileSync(gamesfilepath, 'utf8'));
  } catch (err) {
    console.error(err);
    return false;
  }
  return games;
}

function saveGame(game) {
  let games = getGames();
  let maxId = getMaxId(games);
  console.log(game);
  game.id = maxId+1;
  games.push(game);
  try {
    fs.writeFileSync(gamesfilepath, JSON.stringify(games));
  } catch (err) {
    console.error(err)
  }
}

function getMaxId(games) {
  let max = 0;
  for (var i=0; i<games.length;i++) {
    if(max < games[i].id) {
      max = games[i].id;
    }
  }
  return max;
}

function getGameById(id){
  let games = getGames();
  let selectedGame = null;
  for(var i=0; i<games.length; i++) {
    if(id == games[i].id)
      selectedGame = games[i];
  }
  return selectedGame;
}

function findIdInArray(id){
  let games = getGames();
  for(var i=0; i<games.length; i++) {
    if(id == games[i].id)
      return i;
  }
  return -1;
}
