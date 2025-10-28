import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Role } from '@/types/rbac';

interface ReportTableProps {
  filters: any;
  userRole: Role | null;
  type: 'overview' | 'performance' | 'team' | 'system';
}

export const ReportTable = ({ filters, userRole, type }: ReportTableProps) => {
  const getTableData = () => {
    switch (type) {
      case 'team':
        return userRole && userRole.level >= 2 ? {
          title: 'Team Performance Details',
          headers: ['Team Member', 'Role', 'Tasks', 'Conversions', 'Revenue', 'Status'],
          rows: [
            { name: 'Rahul Sharma', role: 'Sales Executive', tasks: 45, conversions: 28, revenue: '₹4.2L', status: 'active' },
            { name: 'Priya Mehta', role: 'Sales Executive', tasks: 42, conversions: 24, revenue: '₹3.8L', status: 'active' },
            { name: 'Amit Kumar', role: 'Relationship Manager', tasks: 38, conversions: 22, revenue: '₹3.5L', status: 'active' },
            { name: 'Sneha Patel', role: 'Sales Executive', tasks: 41, conversions: 26, revenue: '₹4.0L', status: 'active' },
          ]
        } : null;

      case 'system':
        return userRole && userRole.level >= 2 ? {
          title: 'System Activity Log',
          headers: ['Activity', 'User', 'Timestamp', 'Type', 'Status'],
          rows: [
            { activity: 'Lead Created', user: 'Rahul S.', timestamp: '2 mins ago', type: 'Lead', status: 'completed' },
            { activity: 'Task Assigned', user: 'System', timestamp: '15 mins ago', type: 'Task', status: 'completed' },
            { activity: 'Report Generated', user: 'Priya M.', timestamp: '1 hour ago', type: 'Report', status: 'completed' },
            { activity: 'User Login', user: 'Amit K.', timestamp: '2 hours ago', type: 'Auth', status: 'completed' },
          ]
        } : null;

      default:
        return {
          title: userRole && userRole.level >= 2 ? 'Recent Team Activity' : 'My Recent Activity',
          headers: ['Activity', 'Date', 'Category', 'Result', 'Status'],
          rows: [
            { activity: 'Lead Conversion - Personal Loan', date: '2024-01-15', category: 'Sales', result: '₹2.5L', status: 'success' },
            { activity: 'Customer Follow-up', date: '2024-01-15', category: 'Task', result: 'Completed', status: 'success' },
            { activity: 'Lead Generation', date: '2024-01-14', category: 'Lead', result: '5 New', status: 'success' },
            { activity: 'Team Meeting', date: '2024-01-14', category: 'Task', result: 'Attended', status: 'success' },
            { activity: 'Report Submission', date: '2024-01-13', category: 'Report', result: 'On Time', status: 'success' },
          ]
        };
    }
  };

  const tableData = getTableData();

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
