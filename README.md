# egg-hunt
Egg hunt app that helps hunter register their prey!

## Create a Next.js App

1. Install Node.js from [nodejs.org](https://nodejs.org/).
2. Create a new Next.js app by running `npx create-next-app@latest`.
3. Follow the instructions to set up your Next.js app.
4. Navigate to the project directory by running `cd your-project-name`.

## Firebase Setup

1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Click on "Add project" and follow the instructions to create a new project.
3. Click on "Web" to create a new web app and follow the instructions.
4. Copy the Firebase configuration object and paste it into a new file called `firebase.js` in your project.
5. Install Firebase by running `npm install firebase`.

## Define a Hunt

1. Create a new hunt by sending a POST request to the `/api/hunt` endpoint with the following data:
   - `organizer`: The name of the organizer.
   - `numberOfEggs`: The total number of eggs hidden.
   - `deadline`: The deadline for the hunt in ISO 8601 format.

## Join the Egg Hunt

1. Join the egg hunt by sending a POST request to the `/api/hunt/join` endpoint with the following data:
   - `name`: The name of the participant.

## Register Found Eggs

1. Register the eggs you found by sending a POST request to the `/api/hunt/register` endpoint with the following data:
   - `name`: The name of the participant.
   - `eggNumber`: The number of the egg found.

## Announce the Winner

1. After the deadline, pick a random number and announce the winner by sending a GET request to the `/api/hunt/winner` endpoint.
