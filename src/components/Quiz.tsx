import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Timer } from './Timer';
import { WordOptions } from './WordOptions';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Question } from '@/types';

interface QuizProps {
  questions: Question[];
  onComplete: (answers: string[][]) => void;
  onQuit: () => void;
}

export const Quiz = ({ questions, onComplete, onQuit }: QuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedWords, setSelectedWords] = useState<string[]>([
    '',
    '',
    '',
    '',
  ]);
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [hasStarted, setHasStarted] = useState(false);
  const [showQuitDialog, setShowQuitDialog] = useState(false);
  const [answers, setAnswers] = useState<string[][]>(
    Array(questions.length).fill(['', '', '', ''])
  );
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(
    new Set()
  );

  useEffect(() => {
    if (currentQuestion === 0 && !hasStarted) {
      toast.success('Test has started');
      setHasStarted(true);
    }

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestion, hasStarted]);

  useEffect(() => {
    if (answeredQuestions.size === questions.length) {
      toast.success('All questions completed');
    }
  }, [answeredQuestions, questions.length]);

  const saveAnswer = () => {
    setAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[currentQuestion] = [...selectedWords];
      return newAnswers;
    });
  };

  const handleTimeUp = () => {
    toast.warning("Time's up! Moving to next question.");
    saveAnswer();
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedWords(['', '', '', '']);
      setTimeRemaining(30);
    } else {
      handleComplete();
    }
  };

  const handleWordSelect = (word: string) => {
    if (selectedWords.includes(word)) return;
    const emptyIndex = selectedWords.findIndex((w) => w === '');
    if (emptyIndex === -1) return;
    const newSelectedWords = [...selectedWords];
    newSelectedWords[emptyIndex] = word;
    setSelectedWords(newSelectedWords);
  };

  const handleRemoveWord = (index: number) => {
    setSelectedWords((prev) => {
      const newSelectedWords = [...prev];
      newSelectedWords[index] = '';
      return newSelectedWords;
    });
  };

  const handleNext = () => {
    saveAnswer();
    if (selectedWords.filter((w) => w !== '').length === 4) {
      setAnsweredQuestions((prev) => new Set(prev).add(currentQuestion));
    }
    setCurrentQuestion((prev) => prev + 1);
    setSelectedWords(['', '', '', '']);
    setTimeRemaining(30);
    toast.success('Moving to next question!');
  };

  const handleComplete = () => {
    saveAnswer();
    if (selectedWords.filter((w) => w !== '').length === 4) {
      setAnsweredQuestions((prev) => new Set(prev).add(currentQuestion));
    }
    toast.success('Test has ended');
    onComplete([
      ...answers.slice(0, currentQuestion),
      [...selectedWords],
      ...answers.slice(currentQuestion + 1),
    ]);
  };

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const renderQuestion = () => {
    const parts = question.question.split('_____________');
    return (
      <div className="flex flex-wrap gap-2 justify-center items-center">
        {parts.map((part, index) => (
          <>
            <span key={`part-${index}`}>{part}</span>
            {index < parts.length - 1 && (
              <Button
                variant="outline"
                className="min-w-[120px] h-10 border-2 border-dashed"
                onClick={() => selectedWords[index] && handleRemoveWord(index)}
              >
                {selectedWords[index] || '_____'}
              </Button>
            )}
          </>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8">
      <div className="space-y-4">
        <Timer timeRemaining={timeRemaining} onTimeUp={handleTimeUp} />
        <Progress value={progress} className="h-2" />
        <p className="text-sm text-muted-foreground text-center">
          Questions Answered: {answeredQuestions.size} of {questions.length}
        </p>
      </div>

      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">
            Question {currentQuestion + 1}
          </h2>
          <div className="text-lg mb-8">{renderQuestion()}</div>
        </div>

        <WordOptions
          options={question.options}
          onSelectWord={handleWordSelect}
          selectedWords={selectedWords}
        />

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setShowQuitDialog(true)}>
            Quit
          </Button>
          <Button
            onClick={
              currentQuestion === questions.length - 1
                ? handleComplete
                : handleNext
            }
            disabled={selectedWords.filter((w) => w !== '').length !== 4}
          >
            {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
          </Button>
        </div>
      </div>

      <AlertDialog open={showQuitDialog} onOpenChange={setShowQuitDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to quit?</AlertDialogTitle>
            <AlertDialogDescription>
              Your progress will be lost if you quit now.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onQuit}>Quit</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
