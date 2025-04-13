import { Button } from '@/components/ui/button';

interface WordOptionsProps {
  options: string[];
  onSelectWord: (word: string) => void;
  selectedWords: string[];
}

export const WordOptions = ({ options, onSelectWord, selectedWords }: WordOptionsProps) => {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {options.map((word, index) => (
        <Button
          key={`${word}-${index}`}
          variant="outline"
          onClick={() => onSelectWord(word)}
          disabled={selectedWords.includes(word)}
          className="min-w-[100px]"
        >
          {word}
        </Button>
      ))}
    </div>
  );
};