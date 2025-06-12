
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';

interface GuidedScript {
  id: string;
  title: string;
  category: string;
  content: string;
}

interface GuidedScriptsProps {
  guidedScripts: GuidedScript[];
}

const GuidedScripts = ({ guidedScripts }: GuidedScriptsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base sm:text-lg">Guided Scripts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {guidedScripts.map((script) => (
            <div key={script.id} className="border rounded-lg p-3 sm:p-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <h4 className="font-medium text-sm sm:text-base">{script.title}</h4>
                <Badge variant="outline" className="text-xs w-fit">{script.category}</Badge>
              </div>
              <div className="bg-gray-50 rounded p-3">
                <pre className="text-xs sm:text-sm text-gray-700 whitespace-pre-wrap font-sans">
                  {script.content}
                </pre>
              </div>
              <div className="mt-3 flex justify-end">
                <Button size="sm" variant="outline" className="text-xs sm:text-sm">
                  <FileText size={14} className="mr-1" />
                  Copy Script
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default GuidedScripts;
