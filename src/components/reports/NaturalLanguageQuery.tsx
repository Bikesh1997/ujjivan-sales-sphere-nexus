import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Sparkles } from 'lucide-react';
import { parseNLQuery } from '@/services/reportDataService';

interface NaturalLanguageQueryProps {
  onQuery: (filters: any) => void;
}

export const NaturalLanguageQuery = ({ onQuery }: NaturalLanguageQueryProps) => {
  const [query, setQuery] = useState('');
  const [processing, setProcessing] = useState(false);

  const handleQuery = () => {
    if (!query.trim()) return;
    
    setProcessing(true);
    setTimeout(() => {
      const parsedFilters = parseNLQuery(query);
      onQuery(parsedFilters);
      setProcessing(false);
    }, 500);
  };

  const exampleQueries = [
    'Show me top 5 RMs in Bangalore this week',
    'What are total conversions in Mumbai this month',
    'Show me leads from last quarter',
    'Top 10 performers this year'
  ];

  return (
    <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">AI Query Assistant</h3>
        </div>
        
        <div className="flex gap-2 mb-3">
          <Input
            placeholder="Ask anything... e.g., 'Show me top 5 RMs in Mumbai this week'"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleQuery()}
            className="flex-1"
          />
          <Button 
            onClick={handleQuery} 
            disabled={processing}
            className="gap-2"
          >
            <Search className="w-4 h-4" />
            {processing ? 'Processing...' : 'Query'}
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          {exampleQueries.map((example, idx) => (
            <button
              key={idx}
              onClick={() => setQuery(example)}
              className="text-xs px-3 py-1 rounded-full bg-background/50 hover:bg-background border border-border text-muted-foreground hover:text-foreground transition-colors"
            >
              {example}
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
