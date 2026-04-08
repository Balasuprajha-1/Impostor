# Word Impostor Game

A real-time multiplayer word guessing game built with React, Next.js, and Firebase. Play with your colleagues to find the impostor!

## Features

- 🎮 Support for 3-12 players per room
- 🔴 Real-time game state synchronization with Firebase
- 👤 Minimal word descriptions (one word only)
- 🗳️ Democratic voting system to find the impostor
- 💻 Responsive UI with Tailwind CSS
- ⚡ Fast deployment on Vercel
- 🔒 Secure Firestore backend

## How to Play

1. **Create or Join Room**: Host creates a room or players join with a room ID
2. **Start Game**: Once 3-12 players are ready, host starts the game
3. **Word Assignment**: Each player gets a word
   - 11 players get the main word (e.g., "toothbrush")
   - 1 player (impostor) gets a related word (e.g., "cleaning")
4. **Description Phase**: Players describe their word in just ONE word
5. **Voting Phase**: Team votes on who they think is the impostor
6. **Results**: See if the impostor was caught or if they fooled everyone!

## Tech Stack

- **Frontend**: React 18, Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Firebase Firestore (real-time database)
- **Hosting**: Vercel
- **Libraries**: Firebase Admin SDK, UUID

## Prerequisites

- Node.js 18+ and npm
- Firebase account (free tier works)
- Vercel account (for deployment)

## Local Setup

### 1. Clone the repository

```bash
git clone <repository-url>
cd impostor
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Firestore Database (choose test mode for development)
4. Enable Authentication (optional)
5. Go to Project Settings → Service Accounts
6. Copy your Firebase config

### 4. Environment Variables

Create `.env.local` file in the root directory:

```bash
cp .env.local.example .env.local
```

Fill in your Firebase credentials:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 5. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment on Vercel

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-github-repo>
git push -u origin main
```

### 2. Deploy on Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Add environment variables in Vercel project settings:
   - Copy all environment variables from `.env.local`
5. Click "Deploy"

That's it! Your game is now live at `https://your-project.vercel.app`

## Firebase Firestore Structure

```
gameRooms (collection)
├── [roomId] (document)
    ├── id: string
    ├── name: string
    ├── host: string
    ├── status: "waiting" | "playing" | "voting" | "results" | "ended"
    ├── players: array
    ├── mainWord: string
    ├── impostorWord: string
    ├── impostorId: string
    ├── currentPhase: "description" | "voting" | "results"
    ├── playerVotes: object
    └── createdAt: timestamp
```

## Game Flow Diagram

```
Waiting Phase
    ↓
Players Join & Ready
    ↓
Host Starts Game
    ↓
Words Assigned (Random Impostor)
    ↓
Description Phase (Everyone describes their word)
    ↓
Voting Phase (Vote for the impostor)
    ↓
Results Phase (See who was eliminated)
    ↓
Play Again or Leave
```

## Word Pairs

The game includes various word pairs for impostor challenges:

- Main: "toothbrush" → Impostor: "cleaning"
- Main: "basketball" → Impostor: "ball"
- Main: "pizza" → Impostor: "food"
- Main: "computer" → Impostor: "electronics"
- Main: "airplane" → Impostor: "travel"
- Main: "library" → Impostor: "books"
- Main: "restaurant" → Impostor: "dining"
- Main: "hospital" → Impostor: "healthcare"
- Main: "supermarket" → Impostor: "shopping"
- Main: "telephone" → Impostor: "communication"

You can easily add more in `src/lib/gameService.ts`.

## Building for Production

```bash
npm run build
npm start
```

## Troubleshooting

### Firebase Connection Issues
- Ensure your Firebase config is correct in `.env.local`
- Check Firestore security rules allow read/write in test mode

### Real-time Updates Not Working
- Verify Firestore rules are not blocking subscriptions
- Check browser console for Firebase errors
- Clear browser cache and reload

### Deployment Issues
- Make sure all environment variables are set in Vercel
- Check build logs in Vercel dashboard
- Verify Node.js version compatibility

## Contributing

Feel free to add more features like:
- User authentication
- Persistent player statistics
- Custom word lists
- Different game modes
- Chat during gameplay
- Sound effects

## License

MIT

## Support

For issues and questions, please open an issue on GitHub.

---

**Enjoy the game! Have fun fooling your colleagues! 🎮**
