
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { UserPlus, Search, Filter, Edit, Trash2, CheckCircle, XCircle, ShieldCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const UserManagement = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  
  // Sample users data
  const [users, setUsers] = useState([
    { 
      id: '1', 
      name: 'Rahul Sharma', 
      email: 'rahul.sharma@ujjivan.com', 
      role: 'sales_executive', 
      department: 'field',
      branch: 'Mumbai Central',
      status: 'active',
      lastLogin: '2 hours ago'
    },
    { 
      id: '2', 
      name: 'Priya Singh', 
      email: 'priya.singh@ujjivan.com', 
      role: 'supervisor', 
      department: 'field',
      branch: 'Mumbai Central',
      status: 'active',
      lastLogin: '4 days ago'
    },
    { 
      id: '3', 
      name: 'Vikash Kumar', 
      email: 'vikash.kumar@ujjivan.com', 
      role: 'admin', 
      department: 'head_office',
      branch: 'Head Office',
      status: 'active',
      lastLogin: '1 hour ago'
    },
    { 
      id: '4', 
      name: 'Anjali Patel', 
      email: 'anjali.patel@ujjivan.com', 
      role: 'relationship_manager', 
      department: 'branch',
      branch: 'Thane',
      status: 'inactive',
      lastLogin: '1 month ago'
    },
    { 
      id: '5', 
      name: 'Deepak Verma', 
      email: 'deepak.verma@ujjivan.com', 
      role: 'inbound_agent', 
      department: 'inbound',
      branch: 'Call Center',
      status: 'active',
      lastLogin: '3 hours ago'
    }
  ]);

  const handleAddUser = () => {
    toast({
      title: "Feature in development",
      description: "User creation functionality will be available soon.",
    });
  };

  const handleEditUser = (userId: string) => {
    toast({
      title: "Edit User",
      description: `Editing user ID: ${userId}`,
    });
  };

  const handleDeleteUser = (userId: string) => {
    toast({
      title: "Delete User",
      description: `Are you sure you want to delete this user?`,
    });
  };

  const handleToggleStatus = (userId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    
    setUsers(users.map(user => 
      user.id === userId ? {...user, status: newStatus} : user
    ));
    
    toast({
      title: "Status Updated",
      description: `User status changed to ${newStatus}.`,
    });
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-purple-100 text-purple-800';
      case 'supervisor': return 'bg-blue-100 text-blue-800';
      case 'sales_executive': return 'bg-green-100 text-green-800';
      case 'relationship_manager': return 'bg-yellow-100 text-yellow-800';
      case 'inbound_agent': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleDisplay = (role: string) => {
    switch (role) {
      case 'admin': return 'Admin';
      case 'supervisor': return 'Supervisor';
      case 'sales_executive': return 'Sales Executive';
      case 'relationship_manager': return 'Relationship Manager';
      case 'inbound_agent': return 'Inbound Agent';
      default: return role;
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600">Manage system users and their permissions</p>
        </div>
        <Button 
          className="bg-teal-600 hover:bg-teal-700"
          onClick={handleAddUser}
        >
          <UserPlus size={16} className="mr-2" />
          Add User
        </Button>
      </div>

      {/* Filters */}
      <div className="flex space-x-4">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-80"
          />
        </div>
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="supervisor">Supervisor</SelectItem>
            <SelectItem value="sales_executive">Sales Executive</SelectItem>
            <SelectItem value="relationship_manager">Relationship Manager</SelectItem>
            <SelectItem value="inbound_agent">Inbound Agent</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>System Users</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Branch</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getRoleBadgeColor(user.role)}>
                      {getRoleDisplay(user.role)}
                    </Badge>
                    {user.role === 'admin' && (
                      <Badge className="ml-1 bg-gray-100">
                        <ShieldCheck size={12} className="mr-1" />
                        Full Access
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="capitalize">
                    {user.department.replace('_', ' ')}
                  </TableCell>
                  <TableCell>{user.branch}</TableCell>
                  <TableCell>
                    <Badge className={user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                      {user.status === 'active' ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">{user.lastLogin}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => handleEditUser(user.id)}
                      >
                        <Edit size={16} />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => handleToggleStatus(user.id, user.status)}
                      >
                        {user.status === 'active' ? <XCircle size={16} /> : <CheckCircle size={16} />}
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="text-red-500 hover:text-red-700" 
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagement;
