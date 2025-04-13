import { useState } from 'react';
import { Home } from './components/Home';
import { Quiz } from './components/Quiz';
import { Result } from './components/Result';
import questionsData from './data/questions.json';
import { Toaster } from 'sonner';
import { Question } from './types';

type Screen = 'home' | 'quiz' | 'result';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [userAnswers, setUserAnswers] = useState<string[][]>([]);
  const questions = questionsData.data.questions as Question[];

  const handleQuizComplete = (answers: string[][]) => {
    setUserAnswers(answers);
    setCurrentScreen('result');
  };

  const handleRestart = () => {
    setUserAnswers([]);
    setCurrentScreen('home');
  };

  return (
    <>
      {currentScreen === 'home' && (
        <Home onStart={() => setCurrentScreen('quiz')} />
      )}
      {currentScreen === 'quiz' && (
        <Quiz
          questions={questions}
          onComplete={handleQuizComplete}
          onQuit={handleRestart}
        />
      )}
      {currentScreen === 'result' && (
        <Result
          questions={questions}
          userAnswers={userAnswers}
          score={userAnswers.filter((answer, index) => 
            answer.join(' ') === questions[index].correctAnswer.join(' ')
          ).length}
          onRestart={handleRestart}
        />
      )}
      <Toaster richColors />
    </>
  );
}

export default App;