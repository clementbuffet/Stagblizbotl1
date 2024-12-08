import { Label } from '../../ui/label';

interface DifficultySelectorProps {
  value: string;
  onChange: (value: 'EASY' | 'MEDIUM' | 'HARD') => void;
}

export function DifficultySelector({ value, onChange }: DifficultySelectorProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="difficulty">Difficulty Level</Label>
      <select
        id="difficulty"
        value={value}
        onChange={(e) => onChange(e.target.value as 'EASY' | 'MEDIUM' | 'HARD')}
        className="w-full p-2 border rounded"
      >
        <option value="EASY">Easy</option>
        <option value="MEDIUM">Medium</option>
        <option value="HARD">Hard</option>
      </select>
    </div>
  );
}