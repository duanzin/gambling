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
```

#### POST route

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

### Bets Route
