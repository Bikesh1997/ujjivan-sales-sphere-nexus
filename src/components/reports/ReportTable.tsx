import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Role } from '@/types/rbac';
import { generateTableData } from '@/utils/reportDataGenerator';

interface ReportTableProps {
  filters: any;
  userRole: Role | null;
  type: 'overview' | 'performance' | 'team' | 'system';
}

export const ReportTable = ({ filters, userRole, type }: ReportTableProps) => {
  const tableData = generateTableData(filters, userRole, type);

  if (!tableData) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{tableData.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              {tableData.headers.map((header, index) => (
                <TableHead key={index}>{header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.rows.map((row: any, index) => (
              <TableRow key={index}>
                {Object.entries(row).map(([key, value]: [string, any], cellIndex) => (
                  <TableCell key={cellIndex}>
                    {key === 'status' ? (
                      <Badge variant={value === 'active' || value === 'success' || value === 'completed' ? 'default' : 'secondary'}>
                        {value}
                      </Badge>
                    ) : (
                      value
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
