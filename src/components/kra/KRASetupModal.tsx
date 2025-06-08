
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Trash2, Save, Target } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface KRASetupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface KRAConfig {
  id: string;
  name: string;
  type: 'numeric' | 'percentage';
  weightage: number;
  target: number;
  thresholds: {
    red: number;
    amber: number;
    green: number;
  };
}

const KRASetupModal = ({ isOpen, onClose }: KRASetupModalProps) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('kras');
  const [newKRA, setNewKRA] = useState<Partial<KRAConfig>>({
    name: '',
    type: 'numeric',
    weightage: 0,
    target: 0,
    thresholds: { red: 70, amber: 85, green: 90 }
  });

  const [kras, setKras] = useState<KRAConfig[]>([
    {
      id: '1',
      name: 'Customer Visits',
      type: 'numeric',
      weightage: 30,
      target: 100,
      thresholds: { red: 70, amber: 85, green: 90 }
    },
    {
      id: '2',
      name: 'SHGs Created',
      type: 'numeric',
      weightage: 40,
      target: 20,
      thresholds: { red: 70, amber: 85, green: 90 }
    },
    {
      id: '3',
      name: 'Conversion Rate',
      type: 'percentage',
      weightage: 20,
      target: 25,
      thresholds: { red: 70, amber: 85, green: 90 }
    },
    {
      id: '4',
      name: 'Fixed Deposits',
      type: 'numeric',
      weightage: 10,
      target: 15,
      thresholds: { red: 70, amber: 85, green: 90 }
    }
  ]);

  const totalWeightage = kras.reduce((sum, kra) => sum + kra.weightage, 0);

  const handleAddKRA = () => {
    if (!newKRA.name || !newKRA.weightage || !newKRA.target) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    if (totalWeightage + newKRA.weightage > 100) {
      toast({
        title: "Weightage Error",
        description: "Total weightage cannot exceed 100%",
        variant: "destructive"
      });
      return;
    }

    const kra: KRAConfig = {
      id: Date.now().toString(),
      name: newKRA.name!,
      type: newKRA.type!,
      weightage: newKRA.weightage!,
      target: newKRA.target!,
      thresholds: newKRA.thresholds!
    };

    setKras([...kras, kra]);
    setNewKRA({
      name: '',
      type: 'numeric',
      weightage: 0,
      target: 0,
      thresholds: { red: 70, amber: 85, green: 90 }
    });

    toast({
      title: "KRA Added",
      description: "New KRA has been successfully configured",
    });
  };

  const handleDeleteKRA = (id: string) => {
    setKras(kras.filter(kra => kra.id !== id));
    toast({
      title: "KRA Deleted",
      description: "KRA has been removed from configuration",
    });
  };

  const handleSave = () => {
    if (totalWeightage !== 100) {
      toast({
        title: "Weightage Error",
        description: "Total weightage must equal 100%",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Configuration Saved",
      description: "KRA configuration has been updated successfully",
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Target size={20} className="mr-2" />
            KRA Configuration
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="kras">KRA Setup</TabsTrigger>
            <TabsTrigger value="thresholds">Performance Thresholds</TabsTrigger>
            <TabsTrigger value="incentives">Incentive Rules</TabsTrigger>
          </TabsList>

          <TabsContent value="kras" className="space-y-4">
            {/* Add New KRA */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Add New KRA</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="kra-name">KRA Name</Label>
                    <Input
                      id="kra-name"
                      value={newKRA.name || ''}
                      onChange={(e) => setNewKRA({...newKRA, name: e.target.value})}
                      placeholder="e.g., Customer Visits"
                    />
                  </div>
                  <div>
                    <Label htmlFor="kra-type">Type</Label>
                    <Select value={newKRA.type} onValueChange={(value: 'numeric' | 'percentage') => setNewKRA({...newKRA, type: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="numeric">Numeric</SelectItem>
                        <SelectItem value="percentage">Percentage</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="kra-weightage">Weightage (%)</Label>
                    <Input
                      id="kra-weightage"
                      type="number"
                      max={100 - totalWeightage}
                      value={newKRA.weightage || ''}
                      onChange={(e) => setNewKRA({...newKRA, weightage: parseInt(e.target.value) || 0})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="kra-target">Target</Label>
                    <Input
                      id="kra-target"
                      type="number"
                      value={newKRA.target || ''}
                      onChange={(e) => setNewKRA({...newKRA, target: parseInt(e.target.value) || 0})}
                    />
                  </div>
                </div>
                <Button onClick={handleAddKRA} className="mt-4">
                  <Plus size={16} className="mr-2" />
                  Add KRA
                </Button>
              </CardContent>
            </Card>

            {/* Current KRAs */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">Configured KRAs</CardTitle>
                  <Badge variant={totalWeightage === 100 ? "default" : "destructive"}>
                    Total: {totalWeightage}%
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {kras.map((kra) => (
                    <div key={kra.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium">{kra.name}</div>
                        <div className="text-sm text-gray-500">
                          {kra.type} • Target: {kra.target} • Weight: {kra.weightage}%
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteKRA(kra.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="thresholds" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Performance Thresholds</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 border rounded-lg bg-red-50">
                      <div className="text-red-600 font-bold text-xl">&lt;70%</div>
                      <div className="text-sm text-red-800">Red Zone</div>
                      <div className="text-xs text-gray-600 mt-1">Below Expectations</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg bg-yellow-50">
                      <div className="text-yellow-600 font-bold text-xl">70-90%</div>
                      <div className="text-sm text-yellow-800">Amber Zone</div>
                      <div className="text-xs text-gray-600 mt-1">Meeting Expectations</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg bg-green-50">
                      <div className="text-green-600 font-bold text-xl">&gt;90%</div>
                      <div className="text-sm text-green-800">Green Zone</div>
                      <div className="text-xs text-gray-600 mt-1">Exceeding Expectations</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="incentives" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Incentive Simulation Rules</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-3">Tiered Incentives</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                        <span>100% Target Achievement</span>
                        <span className="font-bold text-green-600">₹5,000</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                        <span>90% Target Achievement</span>
                        <span className="font-bold text-blue-600">₹2,000</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-yellow-50 rounded">
                        <span>80% Target Achievement</span>
                        <span className="font-bold text-yellow-600">₹1,000</span>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-3">Special Bonuses</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between p-2 bg-gray-50 rounded">
                        <span>Complete 90% SHG target</span>
                        <span className="font-medium">₹2,000 bonus</span>
                      </div>
                      <div className="flex justify-between p-2 bg-gray-50 rounded">
                        <span>100% Customer Visit compliance</span>
                        <span className="font-medium">₹1,500 bonus</span>
                      </div>
                      <div className="flex justify-between p-2 bg-gray-50 rounded">
                        <span>Exceed conversion rate by 5%</span>
                        <span className="font-medium">₹1,000 bonus</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end space-x-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-teal-600 hover:bg-teal-700">
            <Save size={16} className="mr-2" />
            Save Configuration
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default KRASetupModal;
