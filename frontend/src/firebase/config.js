import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';

// Validate that all required environment variables are present
const requiredEnvVars = [
  'REACT_APP_FIREBASE_API_KEY',
  'REACT_APP_FIREBASE_AUTH_DOMAIN',
  'REACT_APP_FIREBASE_PROJECT_ID',
  'REACT_APP_FIREBASE_STORAGE_BUCKET',
  'REACT_APP_FIREBASE_MESSAGING_SENDER_ID',
  'REACT_APP_FIREBASE_APP_ID'
];

const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.error('❌ Missing Firebase environment variables:', missingVars);
  console.error('Please create a .env file in the frontend directory with your Firebase configuration.');
  console.error('You can find your Firebase config in the Firebase Console → Project Settings → General → Your apps');
}

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// Initialize Firebase only if we have valid config
let app;
let auth;

try {
  if (firebaseConfig.apiKey && firebaseConfig.apiKey !== 'your-api-key-here') {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    
    // Connect to Firebase Auth emulator in development (optional)
    if (process.env.NODE_ENV === 'development' && process.env.REACT_APP_USE_AUTH_EMULATOR === 'true') {
      connectAuthEmulator(auth, 'http://localhost:9099');
    }
    
    console.log('✅ Firebase initialized successfully');
  } else {
    console.error('❌ Invalid Firebase configuration. Please check your .env file.');
  }
} catch (error) {
  console.error('❌ Firebase initialization failed:', error);
}

export { auth };
export default app; 