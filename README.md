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

## Creating the Datastore in Firebase

### Setting up Firestore

1. In the Firebase Console, navigate to the Firestore Database section.
2. Click on "Create database" and follow the instructions to set up Firestore in production mode or test mode.
3. Choose a location for your Firestore database.

### Creating Collections

1. In the Firestore Database section, click on "Start collection".
2. Enter the name of the collection (e.g., `hunts`) and click "Next".
3. Add the necessary fields for the collection (e.g., `title`, `description`, `deadline`, `numberOfEggs`, `participants`, `eggs`, `registrationLink`, `huntId`).
4. Click "Save" to create the collection.

### Initializing Firestore in `firebase.js`

```javascript
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };
```

### Setting up Environment Variables for Firebase Configuration

1. Create a `.env` file in the root of your project.
2. Add the following environment variables to the `.env` file:

```
FIREBASE_API_KEY=your-api-key
FIREBASE_AUTH_DOMAIN=your-auth-domain
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_STORAGE_BUCKET=your-storage-bucket
FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
FIREBASE_APP_ID=your-app-id
FIREBASE_MEASUREMENT_ID=your-measurement-id
```

3. Replace the placeholder values with your actual Firebase project configuration values.
