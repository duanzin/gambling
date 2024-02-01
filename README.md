# Gambling

> back end of an app for gambling made with typescript and prisma

## Setting up

Clone this repo and install all dependencies using:
```
npm i
```
Create a PostgreSQL database with the name of your liking then make an `.env` file using the `.env.example` file and insert your database url and the port you want this api to run in.

After that, run the following command
```
npx prisma migrate dev
```

## Running the project

To start the code, run the following command

```
npm run dev
```

To run tests, input the following command

```
npm run test
```
Be warned, running tests will delete all elements currently on database.

## Using the API

This api can be used either with the deploy link:

```
https://gamblingapi.onrender.com
```

Or locally:

```
http://localhost:{port}
```

It is recommended you use an api client like postman or insomnia to interact with it.

### Participants Route

```
http://localhost:{port}/participants/
https://gamblingapi.onrender.com/participants/
```

#### POST route

```
POST http://localhost:{port}/participants/
POST https://gamblingapi.onrender.com/participants/
```

Inserts an object into the Participant table.
Expects a body like this:

```
{
  "name":"xablau",
  "balance": 1000 // balance must be at least 1000
}
```
Returns a body like this:

```
{
  "id": 1,
  "createdAt": "2024-01-31T22:42:32.769Z",
  "updatedAt": "2024-01-31T22:42:32.769Z",
  "name":"xablau",
  "balance": 1000
}
```

#### GET route

```
GET http://localhost:{port}/participants/
GET https://gamblingapi.onrender.com/participants/
```

Returns an array with all elements in the Participant table.

```
[
    {
        "id": 1,
        "createdAt": "2024-01-31T22:42:32.769Z",
        "updatedAt": "2024-01-31T22:42:32.769Z",
        "name":"xablau",
        "balance": 1000
    },
    {
        "id": 2,
        "createdAt": "2024-01-31T22:42:32.769Z",
        "updatedAt": "2024-01-31T22:42:32.769Z",
        "name":"monique",
        "balance": 1500
    }
]
```

### Games Route

```
http://localhost:{port}/games/
https://gamblingapi.onrender.com/games/
```

#### POST route

```
POST http://localhost:{port}/games/
POST https://gamblingapi.onrender.com/games/
```

Inserts an object into the Game table.
Expects a body like this:

```
{
  "homeTeamName":"vasco",
  "awayTeamName": "flamengo"
}
```
Returns a body like this:

```
{
  "id": 1,
  "createdAt": "2024-01-31T22:42:32.769Z",
  "updatedAt": "2024-01-31T22:42:32.769Z",
  "homeTeamName": "vasco",
	"awayTeamName": "flamengo",
	"homeTeamScore": 0,  // defaults to 0
	"awayTeamScore": 0,  // defaults to 0
	"isFinished": false // defaults to false
}
```

#### POST :id finish route

```
POST http://localhost:{port}/games/:id/finish
POST https://gamblingapi.onrender.com/games/:id/finish
```

Finishes a game an updates all bets associated with it.
Expects a body like this:

```
{
  "homeTeamScore": 0,
  "awayTeamScore": 2
}
```

Returns a body like this:

```
{
  "id": 1,
  "createdAt": "2024-01-31T22:42:32.769Z",
  "updatedAt": "2024-01-31T22:42:32.769Z",
  "homeTeamName": "vasco",
	"awayTeamName": "flamengo",
	"homeTeamScore": 0,
	"awayTeamScore": 2,
	"isFinished": true
}
```

If a bet's "homeTeamScore" and "awayTeamScore" are equal to the ones in the game object, the bet "status" is set to "WON", "amountWon" is set to whatever quantity the bet won and the associated participant's "balance" is updated.
If not, "status" is set to "LOST" and "amountWon" to 0.

#### GET route

```
GET http://localhost:{port}/games/
GET https://gamblingapi.onrender.com/games/
```

Returns an array with all elements in the Game table.

```
[
    {
        "id": 1,
        "createdAt": "2024-01-31T22:42:32.769Z",
        "updatedAt": "2024-01-31T22:42:32.769Z",
        "homeTeamName": "vasco",
        "awayTeamName": "flamengo",
        "homeTeamScore": 0,
        "awayTeamScore": 0,
        "isFinished": false
    },
    {
        "id": 2,
        "createdAt": "2024-01-31T22:42:32.769Z",
        "updatedAt": "2024-01-31T22:42:32.769Z",
        "homeTeamName": "fluminense",
        "awayTeamName": "botafogo",
        "homeTeamScore": 0,
        "awayTeamScore": 3,
        "isFinished": true
    }
]
```

#### GET :id route

```
GET http://localhost:{port}/games/:id
GET https://gamblingapi.onrender.com/games/:id
```

Returns a game object along with all bets associated with it.

```
    {
        "id": 1,
        "createdAt": "2024-01-31T22:42:32.769Z",
        "updatedAt": "2024-01-31T22:42:32.769Z",
        "homeTeamName": "vasco",
        "awayTeamName": "flamengo",
        "homeTeamScore": 0,
        "awayTeamScore": 0,
        "isFinished": false,
        "Bet":[
          {
            "id": 1,
            "createdAt": "2024-01-31T22:42:32.769Z",
            "updatedAt": "2024-01-31T22:42:32.769Z",
            "homeTeamScore": 0,
            "awayTeamScore": 2,
            "amountBet": 1000,
            "gameId": 1,
            "participantId": 1,
            "status": "PENDING",
            "amountWon": null
          }
        ]
    }
```

### Bets Route

```
http://localhost:{port}/bets/
https://gamblingapi.onrender.com/bets/
```

#### POST route

```
POST http://localhost:{port}/bets/
POST https://gamblingapi.onrender.com/bets/
```

Inserts an object into the Bets table.
Expects a body like this:

```
{
  "homeTeamScore": 0,
	"awayTeamScore": 2,
	"amountBet": 1000, // cant be greater than the participant's balance and will be subtracted from it
	"gameId": 1,  // a game with given id must exist and cant be finished yet
	"participantId": 1 // a participant with given id must exist
}
```
Returns a body like this:

```
{
  "id": 1,
  "createdAt": "2024-01-31T22:42:32.769Z",
  "updatedAt": "2024-01-31T22:42:32.769Z",
  "homeTeamScore": 0,
	"awayTeamScore": 2,
	"amountBet": 1000,
	"gameId": 1,
	"participantId": 1,
  "status": "PENDING",
  "amountWon": null
}
```
