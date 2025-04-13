# Sentence Construction Tool

A modern, interactive quiz application built with React, TypeScript, and Vite that tests users' ability to construct grammatically correct sentences by arranging words in the proper order.

# Screenshot
![image](https://github.com/user-attachments/assets/5f902e49-d697-4dd0-ac62-f78796803d12)


## 🌟 Features

- **Interactive Quiz Interface**
  - Fill-in-the-blank sentence completion
  - Real-time feedback
  - Progress tracking

- **Timer System**
  - 30-second countdown per question
  - Automatic progression when time expires
  - Visual progress indicator

- **Progress Tracking**
  - Question counter
  - Score calculation
  - Detailed results review

- **User Experience**
  - Responsive design
  - Toast notifications
  - Confirmation dialogs
  - Beautiful UI with shadcn/ui components

## 🛠️ Technology Stack

- **Frontend Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── Home.tsx         # Landing page
│   ├── Quiz.tsx         # Main quiz interface
│   ├── Result.tsx       # Results display
│   ├── Timer.tsx        # Countdown timer
│   └── WordOptions.tsx  # Word selection interface
├── data/
│   └── questions.json   # Quiz questions data
├── hooks/
│   └── use-toast.ts     # Toaster
├── types/
│   └── index.ts         # TypeScript interfaces
├── utils/
│   └── helpers.ts       # Utility functions
└── App.tsx              # Root component
```

## 🎯 Core Components

### Home Component
- Displays welcome screen
- Provides quiz instructions
- Handles quiz initiation

### Quiz Component
- Manages quiz state
- Handles word selection/deselection
- Implements timer functionality
- Tracks question progression

### Result Component
- Calculates final score
- Shows detailed answer review
- Provides restart option
- Displays statistics

### Timer Component
- Implements countdown functionality
- Provides visual feedback
- Handles time-up events

### WordOptions Component
- Displays available word choices
- Manages word selection state
- Prevents duplicate selections

## 🔄 State Management

The application uses React's built-in state management with hooks:

- `useState`: Local component state
- `useEffect`: Side effects and timer management
- Custom hooks for notifications


## 🎮 Flow

1. **Start Screen**
   - Welcome message
   - Start button
   - Instructions

2. **Quiz Progress**
   - Question display
   - Word selection
   - Timer countdown
   - Progress tracking

3. **Results Screen**
   - Final score
   - Question review
   - Correct/incorrect indicators
   - Restart option

## 🚀 Getting Started

1. Clone the repository
```bash
git clone <repository-url>
```

2. Install dependencies
```bash
npm install
```

3. Start development server
```bash
npm run dev
```

## 🎨 Styling

The project uses Tailwind CSS with shadcn/ui components for:
- Consistent design language
- Responsive layouts
- Dark/light mode support
- Custom animations

## 🌐 Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Responsive design for mobile devices
- Progressive enhancement

## 🔒 Security

- Type-safe implementations
- Input validation
- Protected routes
- Error boundaries

## 🧪 Testing

The application can be tested for:
- Component rendering
- User interactions
- Timer functionality
- Score calculation
- State management

## 🎯 Future Enhancements

- Multiple question types
- User authentication
- Score persistence
- Difficulty levels
- Social sharing
- Performance analytics

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.
