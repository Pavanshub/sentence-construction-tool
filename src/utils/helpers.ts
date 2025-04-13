export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const calculateScore = (userAnswers: string[][], correctAnswers: string[][]): number => {
  let score = 0;
  userAnswers.forEach((answer, questionIndex) => {
    const correct = correctAnswers[questionIndex];
    if (correct && answer.every((word, i) => word === correct[i])) {
      score++;
    }
  });
  return score;
};

export const formatTime = (seconds: number): string => {
  return `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`;
};