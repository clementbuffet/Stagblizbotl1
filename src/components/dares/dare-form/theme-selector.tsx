import { Input } from '../../ui/input';
import { Label } from '../../ui/label';

interface ThemeSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export function ThemeSelector({ value, onChange }: ThemeSelectorProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="theme">Theme (Optional)</Label>
      <Input
        id="theme"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="e.g., Fitness, Environment, Education"
      />
    </div>
  );
}