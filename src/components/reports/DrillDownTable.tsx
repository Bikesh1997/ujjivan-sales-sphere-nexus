import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, ChevronDown } from 'lucide-react';

interface DrillDownTableProps {
  data: any;
  onDrillDown?: (level: string, item: any) => void;
}

export const DrillDownTable = ({ data, onDrillDown }: DrillDownTableProps) => {
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

  if (!data || !data.rows || data.rows.length === 0) {
    return null;
  }

  const toggleRow = (index: number) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedRows(newExpanded);
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'active':
      case 'success':
      case 'excellent':
      case 'on-track':
      case 'exceeded':
      case 'hot':
        return 'bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20';
      case 'pending':
      case 'warm':
      case 'good':
      case 'needs-attention':
        return 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20';
      case 'inactive':
      case 'failed':
      case 'stale':
      case 'needs-improvement':
        return 'bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20';
      default:
        return 'bg-primary/10 text-primary border-primary/20';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{data.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                {onDrillDown && <TableHead className="w-10"></TableHead>}
                {data.headers.map((header: string, idx: number) => (
                  <TableHead key={idx}>{header}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.rows.map((row: any, rowIndex: number) => (
                <>
                  <TableRow key={rowIndex} className="hover:bg-muted/50">
                    {onDrillDown && (
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => toggleRow(rowIndex)}
                        >
                          {expandedRows.has(rowIndex) ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                        </Button>
                      </TableCell>
                    )}
                    {Object.entries(row).map(([key, value], cellIndex) => {
                      if (key === 'status' || key === 'outcome') {
                        return (
                          <TableCell key={cellIndex}>
                            <Badge variant="outline" className={getStatusColor(value as string)}>
                              {value as string}
                            </Badge>
                          </TableCell>
                        );
                      }
                      return (
                        <TableCell key={cellIndex}>
                          {value as string}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                  {expandedRows.has(rowIndex) && (
                    <TableRow>
                      <TableCell colSpan={data.headers.length + 1} className="bg-muted/30 p-4">
                        <div className="text-sm text-muted-foreground">
                          <p className="font-medium mb-2">Detailed Information:</p>
                          <div className="grid grid-cols-2 gap-2">
                            {Object.entries(row).map(([key, value]) => (
                              <div key={key}>
                                <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}: </span>
                                <span>{value as string}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
