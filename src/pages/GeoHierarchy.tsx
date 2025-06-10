
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, MapPin, Building, Map } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface GeoLocation {
  id: string;
  name: string;
  type: 'zone' | 'region' | 'branch' | 'pincode';
  parent?: string;
  code?: string;
  assignedUsers: number;
  isActive: boolean;
}

const GeoHierarchy = () => {
  const [locations, setLocations] = useState<GeoLocation[]>([
    { id: '1', name: 'North Zone', type: 'zone', assignedUsers: 125, isActive: true },
    { id: '2', name: 'Delhi Region', type: 'region', parent: 'North Zone', assignedUsers: 45, isActive: true },
    { id: '3', name: 'Connaught Place', type: 'branch', parent: 'Delhi Region', code: 'CP001', assignedUsers: 12, isActive: true },
    { id: '4', name: '110001', type: 'pincode', parent: 'Connaught Place', assignedUsers: 3, isActive: true },
    { id: '5', name: 'South Zone', type: 'zone', assignedUsers: 98, isActive: true },
    { id: '6', name: 'Bangalore Region', type: 'region', parent: 'South Zone', assignedUsers: 38, isActive: true }
  ]);

  const [isAddLocationOpen, setIsAddLocationOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<string>('zone');
  const { toast } = useToast();

  const getLocationsByType = (type: string) => {
    return locations.filter(loc => loc.type === type);
  };

  const getParentOptions = (type: string) => {
    const parentTypes: { [key: string]: string } = {
      'region': 'zone',
      'branch': 'region',
      'pincode': 'branch'
    };
    
    if (!parentTypes[type]) return [];
    return locations.filter(loc => loc.type === parentTypes[type]);
  };

  const handleAddLocation = (locationData: any) => {
    const newLocation: GeoLocation = {
      id: Date.now().toString(),
      ...locationData,
      assignedUsers: 0,
      isActive: true
    };
    setLocations([...locations, newLocation]);
    setIsAddLocationOpen(false);
    toast({
      title: "Location Added",
      description: `${locationData.name} has been successfully added.`,
    });
  };

  const handleDeleteLocation = (locationId: string) => {
    setLocations(locations.filter(loc => loc.id !== locationId));
    toast({
      title: "Location Deleted",
      description: "Geographic location has been removed.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Geographic Hierarchy</h1>
          <p className="text-gray-600">Manage zones, regions, branches, and pin codes</p>
        </div>
        <Dialog open={isAddLocationOpen} onOpenChange={setIsAddLocationOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Location
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add Geographic Location</DialogTitle>
            </DialogHeader>
            <AddLocationForm 
              onSubmit={handleAddLocation} 
              getParentOptions={getParentOptions}
              selectedType={selectedType}
              setSelectedType={setSelectedType}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{getLocationsByType('zone').length}</div>
                <div className="text-sm text-gray-600">Zones</div>
              </div>
              <Map className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{getLocationsByType('region').length}</div>
                <div className="text-sm text-gray-600">Regions</div>
              </div>
              <MapPin className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{getLocationsByType('branch').length}</div>
                <div className="text-sm text-gray-600">Branches</div>
              </div>
              <Building className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{getLocationsByType('pincode').length}</div>
                <div className="text-sm text-gray-600">Pin Codes</div>
              </div>
              <MapPin className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="zones" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="zones">Zones</TabsTrigger>
          <TabsTrigger value="regions">Regions</TabsTrigger>
          <TabsTrigger value="branches">Branches</TabsTrigger>
          <TabsTrigger value="pincodes">Pin Codes</TabsTrigger>
        </TabsList>

        <TabsContent value="zones">
          <LocationTable 
            locations={getLocationsByType('zone')} 
            type="zone"
            onDelete={handleDeleteLocation}
          />
        </TabsContent>

        <TabsContent value="regions">
          <LocationTable 
            locations={getLocationsByType('region')} 
            type="region"
            onDelete={handleDeleteLocation}
          />
        </TabsContent>

        <TabsContent value="branches">
          <LocationTable 
            locations={getLocationsByType('branch')} 
            type="branch"
            onDelete={handleDeleteLocation}
          />
        </TabsContent>

        <TabsContent value="pincodes">
          <LocationTable 
            locations={getLocationsByType('pincode')} 
            type="pincode"
            onDelete={handleDeleteLocation}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

const LocationTable = ({ locations, type, onDelete }: any) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="capitalize">{type}s</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              {type !== 'zone' && <TableHead>Parent</TableHead>}
              {(type === 'branch' || type === 'pincode') && <TableHead>Code</TableHead>}
              <TableHead>Assigned Users</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {locations.map((location: GeoLocation) => (
              <TableRow key={location.id}>
                <TableCell className="font-medium">{location.name}</TableCell>
                {type !== 'zone' && <TableCell>{location.parent}</TableCell>}
                {(type === 'branch' || type === 'pincode') && <TableCell>{location.code}</TableCell>}
                <TableCell>{location.assignedUsers}</TableCell>
                <TableCell>
                  <Badge variant={location.isActive ? 'default' : 'secondary'}>
                    {location.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => onDelete(location.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

const AddLocationForm = ({ onSubmit, getParentOptions, selectedType, setSelectedType }: any) => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'zone',
    parent: '',
    code: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: '', type: 'zone', parent: '', code: '' });
  };

  const handleTypeChange = (type: string) => {
    setFormData({ ...formData, type });
    setSelectedType(type);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label>Location Type</Label>
        <Select value={formData.type} onValueChange={handleTypeChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="zone">Zone</SelectItem>
            <SelectItem value="region">Region</SelectItem>
            <SelectItem value="branch">Branch</SelectItem>
            <SelectItem value="pincode">Pin Code</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder={`Enter ${formData.type} name`}
          required
        />
      </div>

      {formData.type !== 'zone' && (
        <div>
          <Label>Parent Location</Label>
          <Select value={formData.parent} onValueChange={(value) => setFormData({ ...formData, parent: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select parent" />
            </SelectTrigger>
            <SelectContent>
              {getParentOptions(formData.type).map((parent: GeoLocation) => (
                <SelectItem key={parent.id} value={parent.name}>{parent.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {(formData.type === 'branch' || formData.type === 'pincode') && (
        <div>
          <Label htmlFor="code">Code</Label>
          <Input
            id="code"
            value={formData.code}
            onChange={(e) => setFormData({ ...formData, code: e.target.value })}
            placeholder={formData.type === 'branch' ? 'Branch code' : 'Pin code'}
          />
        </div>
      )}

      <Button type="submit" className="w-full">Add Location</Button>
    </form>
  );
};

export default GeoHierarchy;
