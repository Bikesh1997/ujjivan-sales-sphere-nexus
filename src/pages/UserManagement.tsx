
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { 
  Search, 
  UserPlus, 
  Edit, 
  Trash2, 
  AlertCircle,
  UserCheck,
  UserX,
  CheckCircle,
  CircleSlashed,
  Filter
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  department?: string;
  branch?: string;
  status: 'active' | 'inactive' | 'pending';
  lastLogin?: string;
}

const UserManagement = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);
  const [isDeleteUserOpen, setIsDeleteUserOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'sales_executive',
    department: 'field',
    branch: 'Mumbai Central',
    status: 'active' as const
  });
  
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'Rajesh Kumar',
      email: 'rajesh@ujjivan.com',
      role: 'sales_executive',
      department: 'field',
      branch: 'Mumbai Central',
      status: 'active',
      lastLogin: '2023-06-05 09:15'
    },
    {
      id: '2',
      name: 'Priya Sharma',
      email: 'priya@ujjivan.com',
      role: 'supervisor',
      department: 'field',
      branch: 'Mumbai Central',
      status: 'active',
      lastLogin: '2023-06-05 08:45'
    },
    {
      id: '3',
      name: 'Vikram Patel',
      email: 'vikram@ujjivan.com',
      role: 'sales_executive',
      department: 'outbound',
      branch: 'Andheri',
      status: 'active',
      lastLogin: '2023-06-04 17:30'
    },
    {
      id: '4',
      name: 'Sonia Singh',
      email: 'sonia@ujjivan.com',
      role: 'relationship_manager',
      department: 'branch',
      branch: 'Bandra',
      status: 'active',
      lastLogin: '2023-06-05 10:20'
    },
    {
      id: '5',
      name: 'Amit Joshi',
      email: 'amit@ujjivan.com',
      role: 'admin',
      branch: 'Head Office',
      status: 'active',
      lastLogin: '2023-06-05 09:00'
    },
    {
      id: '6',
      name: 'Neha Gupta',
      email: 'neha@ujjivan.com',
      role: 'inbound_agent',
      department: 'inbound',
      branch: 'Contact Center',
      status: 'inactive',
      lastLogin: '2023-05-28 14:15'
    },
    {
      id: '7',
      name: 'Rahul Mehta',
      email: 'rahul@ujjivan.com',
      role: 'sales_executive',
      department: 'field',
      branch: 'Thane',
      status: 'pending'
    }
  ]);

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.branch?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleAddUser = () => {
    const id = (users.length + 1).toString();
    setUsers([...users, { ...newUser, id }]);
    setNewUser({
      name: '',
      email: '',
      role: 'sales_executive',
      department: 'field',
      branch: 'Mumbai Central',
      status: 'active'
    });
    setIsAddUserOpen(false);
    toast({
      title: "User Added",
      description: `${newUser.name} has been added successfully.`
    });
  };

  const handleEditUser = () => {
    if (selectedUser) {
      setUsers(users.map(user => 
        user.id === selectedUser.id ? selectedUser : user
      ));
      setIsEditUserOpen(false);
      toast({
        title: "User Updated",
        description: `${selectedUser.name}'s information has been updated.`
      });
    }
  };

  const handleDeleteUser = () => {
    if (selectedUser) {
      setUsers(users.filter(user => user.id !== selectedUser.id));
      setIsDeleteUserOpen(false);
      toast({
        title: "User Deleted",
        description: `${selectedUser.name} has been removed from the system.`
      });
    }
  };

  const handleStatusChange = (userId: string, status: 'active' | 'inactive') => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, status } : user
    ));
    
    const user = users.find(u => u.id === userId);
    toast({
      title: status === 'active' ? "User Activated" : "User Deactivated",
      description: `${user?.name} has been ${status === 'active' ? 'activated' : 'deactivated'}.`
    });
  };

  const getRoleDisplay = (role: string) => {
    switch (role) {
      case 'sales_executive': return 'Sales Executive';
      case 'supervisor': return 'Supervisor';
      case 'inbound_agent': return 'Inbound Agent';
      case 'relationship_manager': return 'Relationship Manager';
      case 'admin': return 'Admin';
      default: return role;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600">Add, edit and manage system users</p>
        </div>
        <Button onClick={() => setIsAddUserOpen(true)}>
          <UserPlus size={16} className="mr-2" />
          Add New User
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[200px] max-w-xl relative">
          <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search users by name, email or branch"
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <Select value={filterRole} onValueChange={setFilterRole}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="sales_executive">Sales Executive</SelectItem>
              <SelectItem value="supervisor">Supervisor</SelectItem>
              <SelectItem value="relationship_manager">Relationship Manager</SelectItem>
              <SelectItem value="inbound_agent">Inbound Agent</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* User Table */}
      <Card>
        <CardHeader>
          <CardTitle>System Users ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-semibold">Name</th>
                  <th className="text-left p-3 font-semibold">Email</th>
                  <th className="text-left p-3 font-semibold">Role</th>
                  <th className="text-left p-3 font-semibold">Branch</th>
                  <th className="text-left p-3 font-semibold">Status</th>
                  <th className="text-left p-3 font-semibold">Last Login</th>
                  <th className="text-center p-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-gray-500">
                      <AlertCircle size={36} className="mx-auto mb-2 text-gray-400" />
                      No users found matching your search criteria
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b hover:bg-gray-50">
                      <td className="p-3 font-medium">{user.name}</td>
                      <td className="p-3 text-gray-600">{user.email}</td>
                      <td className="p-3">
                        {getRoleDisplay(user.role)}
                        {user.department && <span className="text-xs text-gray-500 block">{user.department}</span>}
                      </td>
                      <td className="p-3 text-gray-600">{user.branch}</td>
                      <td className="p-3">
                        <Badge className={getStatusColor(user.status)}>
                          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                        </Badge>
                      </td>
                      <td className="p-3 text-gray-600 text-sm">
                        {user.lastLogin || 'Never logged in'}
                      </td>
                      <td className="p-3">
                        <div className="flex justify-center space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              setSelectedUser(user);
                              setIsEditUserOpen(true);
                            }}
                          >
                            <Edit size={14} />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              setSelectedUser(user);
                              setIsDeleteUserOpen(true);
                            }}
                          >
                            <Trash2 size={14} />
                          </Button>
                          {user.status !== 'pending' && (
                            <Button
                              variant="outline"
                              size="sm"
                              className={user.status === 'active' ? 'text-red-600' : 'text-green-600'}
                              onClick={() => handleStatusChange(user.id, user.status === 'active' ? 'inactive' : 'active')}
                            >
                              {user.status === 'active' ? <UserX size={14} /> : <UserCheck size={14} />}
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Add User Dialog */}
      <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input 
                id="name" 
                value={newUser.name}
                onChange={(e) => setNewUser({...newUser, name: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                value={newUser.email}
                onChange={(e) => setNewUser({...newUser, email: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select 
                value={newUser.role}
                onValueChange={(value) => setNewUser({...newUser, role: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sales_executive">Sales Executive</SelectItem>
                  <SelectItem value="supervisor">Supervisor</SelectItem>
                  <SelectItem value="relationship_manager">Relationship Manager</SelectItem>
                  <SelectItem value="inbound_agent">Inbound Agent</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {newUser.role !== 'admin' && (
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select 
                  value={newUser.department}
                  onValueChange={(value) => setNewUser({...newUser, department: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="field">Field</SelectItem>
                    <SelectItem value="branch">Branch</SelectItem>
                    <SelectItem value="outbound">Outbound</SelectItem>
                    <SelectItem value="inbound">Inbound</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="branch">Branch</Label>
              <Input 
                id="branch" 
                value={newUser.branch}
                onChange={(e) => setNewUser({...newUser, branch: e.target.value})}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleAddUser} disabled={!newUser.name || !newUser.email}>Add User</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      {selectedUser && (
        <Dialog open={isEditUserOpen} onOpenChange={setIsEditUserOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Edit User</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Name</Label>
                <Input 
                  id="edit-name" 
                  value={selectedUser.name}
                  onChange={(e) => setSelectedUser({...selectedUser, name: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-email">Email</Label>
                <Input 
                  id="edit-email" 
                  type="email" 
                  value={selectedUser.email}
                  onChange={(e) => setSelectedUser({...selectedUser, email: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-role">Role</Label>
                <Select 
                  value={selectedUser.role}
                  onValueChange={(value) => setSelectedUser({...selectedUser, role: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sales_executive">Sales Executive</SelectItem>
                    <SelectItem value="supervisor">Supervisor</SelectItem>
                    <SelectItem value="relationship_manager">Relationship Manager</SelectItem>
                    <SelectItem value="inbound_agent">Inbound Agent</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {selectedUser.role !== 'admin' && (
                <div className="space-y-2">
                  <Label htmlFor="edit-department">Department</Label>
                  <Select 
                    value={selectedUser.department || ''}
                    onValueChange={(value) => setSelectedUser({...selectedUser, department: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="field">Field</SelectItem>
                      <SelectItem value="branch">Branch</SelectItem>
                      <SelectItem value="outbound">Outbound</SelectItem>
                      <SelectItem value="inbound">Inbound</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="edit-branch">Branch</Label>
                <Input 
                  id="edit-branch" 
                  value={selectedUser.branch || ''}
                  onChange={(e) => setSelectedUser({...selectedUser, branch: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-status">Status</Label>
                <Select 
                  value={selectedUser.status}
                  onValueChange={(value: 'active' | 'inactive' | 'pending') => setSelectedUser({...selectedUser, status: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={handleEditUser}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete User Dialog */}
      {selectedUser && (
        <Dialog open={isDeleteUserOpen} onOpenChange={setIsDeleteUserOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
            </DialogHeader>
            <div className="py-4 flex items-center gap-4">
              <div className="bg-red-100 text-red-700 p-3 rounded-full">
                <AlertCircle size={24} />
              </div>
              <div>
                <p>Are you sure you want to delete {selectedUser.name}?</p>
                <p className="text-gray-500 text-sm mt-1">This action cannot be undone.</p>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button variant="destructive" onClick={handleDeleteUser}>Delete User</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default UserManagement;
