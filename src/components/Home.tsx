import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Brain } from 'lucide-react';

interface HomeProps {
  onStart: () => void;
}

export const Home = ({ onStart }: HomeProps) => {
  const { toast } = useToast();

  const handleStart = () => {
    toast({
      title: "Quiz Started!",
      description: "Good luck with your sentence construction quiz.",
    });
    onStart();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-8">
      <div className="text-center space-y-4">
        <Brain className="w-16 h-16 mx-auto text-primary" />
        <h1 className="text-4xl font-bold tracking-tight">Sentence Construction</h1>
        <p className="text-muted-foreground">
          Test your knowledge by arranging words in the correct order
        </p>
      </div>
      <Button size="lg" onClick={handleStart}>
        Start Test
      </Button>
    </div>
  );
};