import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { ThemeSelector } from './dare-form/theme-selector';
import { DifficultySelector } from './dare-form/difficulty-selector';
import { generateDare, DareGenerationError, type DarePrompt } from '@/lib/ai/dare-generator';
import { createDare } from '@/lib/api/dares';
import { useToast } from '../ui/use-toast';

export function CreateDareForm() {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [dareDetails, setDareDetails] = useState({
    title: '',
    description: '',
    type: 'SOLO' as const,
    theme: '',
    difficulty: 'MEDIUM' as const,
    reward: 100,
    duration: 7,
    rules: [] as string[],
    successCriteria: [] as string[],
  });

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const prompt: DarePrompt = {
        type: dareDetails.type,
        theme: dareDetails.theme || undefined,
        difficulty: dareDetails.difficulty,
        duration: dareDetails.duration,
      };

      const generated = await generateDare(prompt);
      setDareDetails(prev => ({
        ...prev,
        title: generated.title,
        description: generated.description,
        rules: generated.rules,
        successCriteria: generated.successCriteria,
      }));

      toast({
        title: 'Dare Generated',
        description: 'Your dare has been generated successfully!',
      });
    } catch (error) {
      let message = 'Failed to generate dare';
      if (error instanceof DareGenerationError) {
        message = error.message;
      }
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createDare({
        ...dareDetails,
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + dareDetails.duration * 24 * 60 * 60 * 1000).toISOString(),
      });
      toast({
        title: 'Success',
        description: 'Your dare has been created successfully!',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create dare. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <Label>Dare Type</Label>
        <select
          value={dareDetails.type}
          onChange={(e) => setDareDetails(prev => ({ ...prev, type: e.target.value as 'SOLO' | 'TEAM' | 'BATTLE' }))}
          className="w-full p-2 border rounded"
        >
          <option value="SOLO">Solo Challenge</option>
          <option value="TEAM">Team Challenge</option>
          <option value="BATTLE">Battle Challenge</option>
        </select>
      </div>

      <ThemeSelector
        value={dareDetails.theme}
        onChange={(theme) => setDareDetails(prev => ({ ...prev, theme }))}
      />

      <DifficultySelector
        value={dareDetails.difficulty}
        onChange={(difficulty) => setDareDetails(prev => ({ ...prev, difficulty }))}
      />

      <div className="space-y-2">
        <Label htmlFor="duration">Duration (days)</Label>
        <Input
          id="duration"
          type="number"
          min={1}
          max={30}
          value={dareDetails.duration}
          onChange={(e) => setDareDetails(prev => ({ ...prev, duration: Number(e.target.value) }))}
        />
      </div>

      <Button
        type="button"
        onClick={handleGenerate}
        disabled={isGenerating}
        className="w-full"
      >
        {isGenerating ? 'Generating...' : 'Generate AI Dare'}
      </Button>

      {dareDetails.title && (
        <div className="space-y-4 border p-4 rounded-lg">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={dareDetails.title}
              onChange={(e) => setDareDetails(prev => ({ ...prev, title: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              value={dareDetails.description}
              onChange={(e) => setDareDetails(prev => ({ ...prev, description: e.target.value }))}
              className="w-full p-2 border rounded min-h-[100px]"
            />
          </div>

          {dareDetails.rules.length > 0 && (
            <div className="space-y-2">
              <Label>Rules</Label>
              <ul className="list-disc pl-5">
                {dareDetails.rules.map((rule, index) => (
                  <li key={index}>{rule}</li>
                ))}
              </ul>
            </div>
          )}

          {dareDetails.successCriteria.length > 0 && (
            <div className="space-y-2">
              <Label>Success Criteria</Label>
              <ul className="list-disc pl-5">
                {dareDetails.successCriteria.map((criteria, index) => (
                  <li key={index}>{criteria}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="reward">Reward (DARE tokens)</Label>
            <Input
              id="reward"
              type="number"
              min={1}
              value={dareDetails.reward}
              onChange={(e) => setDareDetails(prev => ({ ...prev, reward: Number(e.target.value) }))}
            />
          </div>

          <Button type="submit" className="w-full">Create Dare</Button>
        </div>
      )}
    </form>
  );
}