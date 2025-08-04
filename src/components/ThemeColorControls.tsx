import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Palette, RotateCcw } from 'lucide-react';
import { useThemeColor } from '@/hooks/useThemeColor';

interface ThemeColorControlsProps {
  className?: string;
}

const ThemeColorControls = ({ className }: ThemeColorControlsProps) => {
  const { currentColor, changeThemeColor, resetToDefault } = useThemeColor();
  const [colorInput, setColorInput] = useState(currentColor);

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setColorInput(newColor);
    changeThemeColor(newColor);
  };

  const handleReset = () => {
    resetToDefault();
    setColorInput(currentColor);
  };

  const presetColors = [
    '#0f172a', // Default dark blue
    '#dc2626', // Red
    '#059669', // Green
    '#7c3aed', // Purple
    '#ea580c', // Orange
    '#0891b2', // Cyan
    '#c2410c', // Brown
    '#be185d', // Pink
  ];

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette size={20} />
          Theme Color Controls
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="color-picker">Custom Color</Label>
          <div className="flex gap-2">
            <Input
              id="color-picker"
              type="color"
              value={colorInput}
              onChange={handleColorChange}
              className="w-16 h-10"
            />
            <Input
              type="text"
              value={colorInput}
              onChange={(e) => {
                setColorInput(e.target.value);
                if (/^#[0-9A-Fa-f]{6}$/.test(e.target.value)) {
                  changeThemeColor(e.target.value);
                }
              }}
              placeholder="#000000"
              className="flex-1"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Preset Colors</Label>
          <div className="grid grid-cols-4 gap-2">
            {presetColors.map((color) => (
              <button
                key={color}
                onClick={() => {
                  setColorInput(color);
                  changeThemeColor(color);
                }}
                className={`w-full h-8 rounded border-2 transition-all hover:scale-105 ${
                  currentColor === color ? 'border-primary' : 'border-border'
                }`}
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        </div>

        <Button 
          onClick={handleReset} 
          variant="outline" 
          className="w-full"
        >
          <RotateCcw size={16} className="mr-2" />
          Reset to Default
        </Button>
      </CardContent>
    </Card>
  );
};

export default ThemeColorControls;