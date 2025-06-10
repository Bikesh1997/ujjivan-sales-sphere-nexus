
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, X } from 'lucide-react';

interface AddRuleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (ruleData: any) => void;
}

interface Condition {
  field: string;
  operator: string;
  value: string;
  logic?: 'AND' | 'OR';
}

const AddRuleModal: React.FC<AddRuleModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: '',
    priority: 1,
    offer: '',
    offerType: '',
    offerValue: ''
  });
  
  const [conditions, setConditions] = useState<Condition[]>([
    { field: '', operator: '', value: '' }
  ]);

  const fields = [
    'Product Type', 'Account Balance', 'Tenure', 'Age', 'Relationship Value',
    'EMI Status', 'Business Vintage', 'Income Category', 'Location'
  ];

  const operators = ['=', '>', '<', '>=', '<=', 'contains', 'not equals'];
  const offerTypes = ['Discount', 'Cashback', 'Extra Benefit', 'Fee Waiver', 'Interest Boost'];

  const addCondition = () => {
    setConditions([...conditions, { field: '', operator: '', value: '', logic: 'AND' }]);
  };

  const removeCondition = (index: number) => {
    if (conditions.length > 1) {
      setConditions(conditions.filter((_, i) => i !== index));
    }
  };

  const updateCondition = (index: number, field: string, value: any) => {
    const newConditions = [...conditions];
    newConditions[index] = { ...newConditions[index], [field]: value };
    setConditions(newConditions);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const conditionString = conditions
      .map((condition, index) => {
        const prefix = index > 0 ? ` ${condition.logic} ` : '';
        return `${prefix}${condition.field} ${condition.operator} ${condition.value}`;
      })
      .join('');

    const ruleData = {
      ...formData,
      condition: conditionString,
      offer: `${formData.offer} - ${formData.offerType}: ${formData.offerValue}`
    };

    onAdd(ruleData);
    
    // Reset form
    setFormData({
      name: '',
      priority: 1,
      offer: '',
      offerType: '',
      offerValue: ''
    });
    setConditions([{ field: '', operator: '', value: '' }]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle>Create Cross-Sell Rule</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Rule Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Rule Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="e.g., Savings to FD Cross-sell"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <Select 
                    value={String(formData.priority)} 
                    onValueChange={(value) => setFormData({...formData, priority: Number(value)})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent className="bg-white z-50">
                      {[1, 2, 3, 4, 5].map(num => (
                        <SelectItem key={num} value={String(num)}>Priority {num}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                Conditions
                <Button type="button" variant="outline" size="sm" onClick={addCondition}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Condition
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {conditions.map((condition, index) => (
                <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                  {index > 0 && (
                    <Select 
                      value={condition.logic} 
                      onValueChange={(value) => updateCondition(index, 'logic', value)}
                    >
                      <SelectTrigger className="w-20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white z-50">
                        <SelectItem value="AND">AND</SelectItem>
                        <SelectItem value="OR">OR</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                  
                  <Select 
                    value={condition.field} 
                    onValueChange={(value) => updateCondition(index, 'field', value)}
                  >
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Select field" />
                    </SelectTrigger>
                    <SelectContent className="bg-white z-50">
                      {fields.map(field => (
                        <SelectItem key={field} value={field}>{field}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select 
                    value={condition.operator} 
                    onValueChange={(value) => updateCondition(index, 'operator', value)}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Operator" />
                    </SelectTrigger>
                    <SelectContent className="bg-white z-50">
                      {operators.map(op => (
                        <SelectItem key={op} value={op}>{op}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Input
                    value={condition.value}
                    onChange={(e) => updateCondition(index, 'value', e.target.value)}
                    placeholder="Value"
                    className="flex-1"
                  />

                  {conditions.length > 1 && (
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm"
                      onClick={() => removeCondition(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Offer Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="offer">Product/Service to Offer</Label>
                <Input
                  id="offer"
                  value={formData.offer}
                  onChange={(e) => setFormData({...formData, offer: e.target.value})}
                  placeholder="e.g., Fixed Deposit, Life Insurance"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="offerType">Offer Type</Label>
                  <Select 
                    value={formData.offerType} 
                    onValueChange={(value) => setFormData({...formData, offerType: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select offer type" />
                    </SelectTrigger>
                    <SelectContent className="bg-white z-50">
                      {offerTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="offerValue">Offer Value</Label>
                  <Input
                    id="offerValue"
                    value={formData.offerValue}
                    onChange={(e) => setFormData({...formData, offerValue: e.target.value})}
                    placeholder="e.g., 0.5% extra interest, ₹500 cashback"
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-teal-600 hover:bg-teal-700">
              Create Rule
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddRuleModal;
