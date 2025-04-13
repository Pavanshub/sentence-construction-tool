import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Question } from '@/types';
import { CheckCircle, XCircle } from 'lucide-react';

interface ResultProps {
  questions: Question[];
  userAnswers: string[][];
  score: number;
  onRestart: () => void;
}

export const Result = ({ questions, userAnswers, score, onRestart }: ResultProps) => {
  const percentage = (score / questions.length) * 100;
  const answeredCount = userAnswers.filter(answer => answer.length === 4).length;
  const unansweredCount = questions.length - answeredCount;
  
  return (
    <div className="max-w-3xl mx-auto p-4 space-y-8">
      <div className="text-center space-y-4 bg-card rounded-lg p-8 shadow-lg">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
          Quiz Complete!
        </h2>
        <div className="text-7xl">
          {percentage >= 80 ? '🎉' : percentage >= 50 ? '👍' : '😅'}
        </div>
        <div className="space-y-2">
          <p className="text-3xl font-semibold">
            Your score: {score} out of {questions.length}
          </p>
          <p className="text-2xl font-medium text-muted-foreground">
            ({Math.round(percentage)}%)
          </p>
          <div className="flex justify-center gap-8 mt-4">
            <div className="text-center">
              <p className="text-lg font-medium">Answered</p>
              <p className="text-2xl font-bold text-green-600">{answeredCount}</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-medium">Unanswered</p>
              <p className="text-2xl font-bold text-red-600">{unansweredCount}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {questions.map((question, index) => {
          const isAnswered = userAnswers[index]?.length === 4;
          const isCorrect = isAnswered && question.correctAnswer.join(' ') === userAnswers[index]?.join(' ');
          
          return (
            <Card key={question.questionId} className="p-6">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  {isAnswered ? (
                    isCorrect ? (
                      <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                    )
                  ) : (
                    <XCircle className="w-6 h-6 text-gray-400 flex-shrink-0 mt-1" />
                  )}
                  <div className="space-y-3 flex-grow">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-lg">Question {index + 1}</h3>
                      {!isAnswered && (
                        <span className="text-sm text-gray-500">Not answered</span>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-muted-foreground">Original Question:</p>
                      <p className="font-medium">{question.question}</p>
                    </div>

                    {isAnswered && (
                      <div className="space-y-2">
                        <p className="text-muted-foreground">Your Answer:</p>
                        <div className="flex flex-wrap gap-2">
                          {userAnswers[index]?.map((word, wordIndex) => (
                            <span
                              key={wordIndex}
                              className={`px-3 py-1 rounded-full text-sm font-medium ${
                                word === question.correctAnswer[wordIndex]
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-red-100 text-red-700'
                              }`}
                            >
                              {word}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      <p className="text-muted-foreground">Correct Answer:</p>
                      <div className="flex flex-wrap gap-2">
                        {question.correctAnswer.map((word, wordIndex) => (
                          <span
                            key={wordIndex}
                            className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium"
                          >
                            {`${wordIndex + 1}. ${word}`}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="flex justify-center pt-6">
        <Button size="lg" onClick={onRestart}>
          Try Again
        </Button>
      </div>
    </div>
  );
};