
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  Phone, 
  MapPin, 
  Calendar, 
  CheckCircle, 
  Clock, 
  Target,
  Route,
  PhoneCall,
  MessageSquare
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import CallInProgressModal from '@/components/leads/CallInProgressModal';

const TodaysPlan = () => {
  const { user } = useAuth();
  const [callModalOpen, setCallModalOpen] = useState(false);
  const [callPopupOpen, setCallPopupOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<any>(null);

  // Mock data for today's activities
  const pendingFollowUps = [
    { id: 1, name: 'Rajesh Kumar', business: 'Tech Solutions Pvt Ltd', phone: '+91 98765 43210', time: '10:30 AM', priority: 'High' },
    { id: 2, name: 'Priya Sharma', business: 'Digital Marketing Co', phone: '+91 87654 32109', time: '2:15 PM', priority: 'Medium' },
    { id: 3, name: 'Amit Patel', business: 'Construction Corp', phone: '+91 76543 21098', time: '4:00 PM', priority: 'High' }
  ];

  const scheduledMeetings = [
    { id: 1, client: 'Mumbai Industries', time: '11:00 AM', location: 'Bandra Office', type: 'Site Visit' },
    { id: 2, client: 'Global Exports', time: '3:30 PM', location: 'Video Call', type: 'Proposal Discussion' }
  ];

  const todaysTasks = [
    { id: 1, task: 'Prepare loan documentation for Tech Solutions', deadline: '5:00 PM', status: 'pending' },
    { id: 2, task: 'Follow up on credit verification', deadline: '6:00 PM', status: 'pending' },
    { id: 3, task: 'Submit quarterly report', deadline: '7:00 PM', status: 'completed' }
  ];

  const beatPlanLocations = [
    { id: 1, area: 'Bandra West', prospects: 5, distance: '2.3 km', priority: 'High' },
    { id: 2, area: 'Andheri East', prospects: 3, distance: '4.1 km', priority: 'Medium' },
    { id: 3, area: 'Powai', prospects: 7, distance: '6.8 km', priority: 'High' }
  ];

  const handleCallNow = (contact: any) => {
    setSelectedContact(contact);
    setCallPopupOpen(true);
  };

  const handleStartCall = () => {
    setCallPopupOpen(false);
    setCallModalOpen(true);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Check if user should see Smart Beat Plan Route - hide for Inbound Contact Center Agents
  const shouldShowBeatPlan = user?.role !== 'inbound_agent';

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Follow-ups */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Phone size={18} className="mr-2" />
              Pending Follow-ups
              <Badge className="ml-2 bg-red-100 text-red-800">
                {pendingFollowUps.length}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingFollowUps.map((contact) => (
                <div key={contact.id} className="border rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">{contact.name}</h4>
                      <p className="text-sm text-gray-600">{contact.business}</p>
                      <p className="text-xs text-gray-500">{contact.phone}</p>
                    </div>
                    <div className="text-right">
                      <Badge className={getPriorityColor(contact.priority)}>
                        {contact.priority}
                      </Badge>
                      <p className="text-xs text-gray-500 mt-1">{contact.time}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => handleCallNow(contact)}
                    >
                      <Phone size={12} className="mr-1" />
                      Call Now
                    </Button>
                    <Button size="sm" variant="outline">
                      <MessageSquare size={12} className="mr-1" />
                      Message
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Scheduled Meetings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar size={18} className="mr-2" />
              Scheduled Meetings
              <Badge className="ml-2 bg-blue-100 text-blue-800">
                {scheduledMeetings.length}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {scheduledMeetings.map((meeting) => (
                <div key={meeting.id} className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">{meeting.client}</h4>
                      <p className="text-sm text-gray-600">{meeting.type}</p>
                    </div>
                    <span className="text-sm font-medium text-blue-700">{meeting.time}</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-600">
                    <MapPin size={10} className="mr-1" />
                    {meeting.location}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Today's Tasks */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle size={18} className="mr-2" />
              Today's Tasks
              <Badge className="ml-2 bg-orange-100 text-orange-800">
                {todaysTasks.filter(task => task.status === 'pending').length} Pending
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {todaysTasks.map((task) => (
                <div key={task.id} className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className={`font-medium ${task.status === 'completed' ? 'line-through text-gray-500' : ''}`}>
                        {task.task}
                      </h4>
                      <div className="flex items-center text-xs text-gray-600 mt-1">
                        <Clock size={10} className="mr-1" />
                        Due: {task.deadline}
                      </div>
                    </div>
                    <div className="flex items-center">
                      {task.status === 'completed' ? (
                        <CheckCircle size={16} className="text-green-600" />
                      ) : (
                        <Clock size={16} className="text-orange-600" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Smart Beat Plan Route - Only show for non-Inbound Contact Center Agents */}
        {shouldShowBeatPlan && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Route size={18} className="mr-2" />
                Smart Beat Plan Route
                <Badge className="ml-2 bg-green-100 text-green-800">
                  Optimized
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {beatPlanLocations.map((location) => (
                  <div key={location.id} className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium">{location.area}</h4>
                        <p className="text-sm text-gray-600">{location.prospects} prospects</p>
                      </div>
                      <div className="text-right">
                        <Badge className={getPriorityColor(location.priority)}>
                          {location.priority}
                        </Badge>
                        <p className="text-xs text-gray-500 mt-1">{location.distance}</p>
                      </div>
                    </div>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      <MapPin size={12} className="mr-1" />
                      Navigate
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Call Popup Modal */}
      <Dialog open={callPopupOpen} onOpenChange={setCallPopupOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Initiate Call</DialogTitle>
          </DialogHeader>
          {selectedContact && (
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-lg font-semibold">{selectedContact.name}</h3>
                <p className="text-gray-600">{selectedContact.business}</p>
                <p className="text-gray-600 font-mono">{selectedContact.phone}</p>
              </div>
              <div className="flex space-x-2">
                <Button 
                  onClick={handleStartCall}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  <PhoneCall size={16} className="mr-2" />
                  Start Call
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setCallPopupOpen(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Call In Progress Modal */}
      {selectedContact && (
        <CallInProgressModal
          isOpen={callModalOpen}
          onOpenChange={setCallModalOpen}
          prospectName={selectedContact.name}
          businessName={selectedContact.business}
          phoneNumber={selectedContact.phone}
        />
      )}
    </div>
  );
};

export default TodaysPlan;
