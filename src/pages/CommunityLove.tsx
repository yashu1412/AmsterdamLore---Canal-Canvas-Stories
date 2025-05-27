import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Heart, ArrowLeft, MapPin, User, Calendar, MapPin as LocationIcon, UserPlus } from 'lucide-react';
import { Link , useNavigate  } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';


interface CommunityEvent {
  id: number;
  title: string;
  organizer: string;
  type: string;
  description: string;
  date: string;
  time: string;
  location: string;
  participants: number;
}

const predefinedEvents = [
  {
    id: 1,
    title: "Canal Clean-Up Day",
    organizer: "Green Amsterdam",
    type: "Community Service",
    description: "Join fellow Amsterdam lovers for a monthly canal cleaning initiative...",
    date: "2024-02-15",
    time: "10:00 AM",
    location: "Prinsengracht 263",
    participants: 34
  },
  {
    id: 2,
    title: "Photography Walk: Hidden Courtyards",
    organizer: "Amsterdam Photo Club",
    type: "Photography",
    description: "Discover secret courtyards and hidden architectural gems...",
    date: "2024-02-18",
    time: "2:00 PM",
    location: "Begijnhof",
    participants: 12
  },
  {
    id: 3,
    title: "Local History Storytelling",
    organizer: "Amsterdam Historians",
    type: "Culture",
    description: "Share and listen to fascinating stories from Amsterdam's past...",
    date: "2024-02-20",
    time: "7:00 PM",
    location: "Café de Reiger",
    participants: 28
  },
  {
    id: 4,
    title: "Bike Tour: Street Art Trail",
    organizer: "Urban Art Collective",
    type: "Art & Culture",
    description: "Cycling tour through the best street art locations in the city...",
    date: "2024-02-22",
    time: "11:00 AM",
    location: "Nieuwmarkt",
    participants: 18
  },
  {
    id: 5,
    title: "Language Exchange Café",
    organizer: "International Amsterdam",
    type: "Social",
    description: "Practice Dutch, English, and other languages with locals and expats...",
    date: "2024-02-24",
    time: "6:00 PM",
    location: "Brown Café 't Smalle",
    participants: 45
  },
  {
    id: 6,
    title: "Canal House Garden Tour",
    organizer: "Amsterdam Garden Society",
    type: "Nature",
    description: "Private access to beautiful hidden gardens behind canal houses...",
    date: "2024-02-25",
    time: "1:00 PM",
    location: "Herengracht",
    participants: 15
  },
  {
    id: 7,
    title: "Food Market Discovery",
    organizer: "Foodie Amsterdam",
    type: "Food & Drink",
    description: "Explore local markets and taste traditional Amsterdam specialties...",
    date: "2024-02-28",
    time: "10:30 AM",
    location: "Albert Cuyp Market",
    participants: 22
  },
  {
    id: 8,
    title: "Night Photography Workshop",
    organizer: "Amsterdam After Dark",
    type: "Photography",
    description: "Learn techniques for capturing Amsterdam's nighttime beauty...",
    date: "2024-03-02",
    time: "8:00 PM",
    location: "Amstel River",
    participants: 16
  },
  {
    id: 9,
    title: "Vintage Market Hunt",
    organizer: "Vintage Amsterdam",
    type: "Shopping",
    description: "Discover unique vintage finds in the city's best flea markets...",
    date: "2024-03-05",
    time: "11:00 AM",
    location: "Noordermarkt",
    participants: 19
  },
  {
    id: 10,
    title: "Community Mural Project",
    organizer: "Street Art Amsterdam",
    type: "Art Creation",
    description: "Collaborate on a community mural celebrating Amsterdam's diversity...",
    date: "2024-03-08",
    time: "2:00 PM",
    location: "NDSM Wharf",
    participants: 31
  }
];

const CommunityLove = () => {
  const navigate = useNavigate();
  const [showJoinForm, setShowJoinForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    interests: '',
    experience: ''
  });
  const [events, setEvents] = useState<CommunityEvent[]>([]);
  const [eventFormData, setEventFormData] = useState({
    title: '',
    type: '',
    description: '',
    organizer: '',
    date: '',
    time: '',
    location: ''
  });
  const [showEventForm, setShowEventForm] = useState(false);
  const { toast } = useToast();


  useEffect(() => {
  
    const userEventsJSON = localStorage.getItem('amsterdamLoreEvents');
    const userEvents = userEventsJSON ? JSON.parse(userEventsJSON) : [];
    
  
    const allEvents = [...predefinedEvents, ...userEvents].sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    
    setEvents(allEvents);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form data
    if (!formData.name || !formData.email || !formData.interests || !formData.experience) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields to join the community.",
        variant: "destructive"
      });
      return;
    }
    
    // Save community member to localStorage
    const member = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      interests: formData.interests,
      experience: formData.experience,
      joinDate: new Date().toISOString().split('T')[0]
    };
    
    // Get existing members from localStorage
    const existingMembersJSON = localStorage.getItem('amsterdamLoreMembers');
    const existingMembers = existingMembersJSON ? JSON.parse(existingMembersJSON) : [];
    
    // Add new member to existing members
    const updatedMembers = [member, ...existingMembers];
    
    // Save to localStorage
    localStorage.setItem('amsterdamLoreMembers', JSON.stringify(updatedMembers));
    
    // Reset form
    setFormData({ name: '', email: '', interests: '', experience: '' });
    setShowJoinForm(false);
    
    // Show success toast
    toast({
      title: "Welcome to the community!",
      description: "You've successfully joined the Amsterdam Lore community.",
    });
  };

  const handleEventSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form data
    if (!eventFormData.title || !eventFormData.type || !eventFormData.description || 
        !eventFormData.organizer || !eventFormData.date || !eventFormData.time || !eventFormData.location) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields to create an event.",
        variant: "destructive"
      });
      return;
    }
    
    
    const newEvent: CommunityEvent = {
      id: Date.now(),
      title: eventFormData.title,
      type: eventFormData.type,
      description: eventFormData.description,
      organizer: eventFormData.organizer,
      date: eventFormData.date,
      time: eventFormData.time,
      location: eventFormData.location,
      participants: 1
    };
    
    // Get existing events from localStorage
    const existingEventsJSON = localStorage.getItem('amsterdamLoreEvents');
    const existingEvents = existingEventsJSON ? JSON.parse(existingEventsJSON) : [];
    
    // Add new event to existing events
    const updatedEvents = [newEvent, ...existingEvents];
    
    // Save to localStorage
    localStorage.setItem('amsterdamLoreEvents', JSON.stringify(updatedEvents));
    
    // Update state with all events (predefined + user events)
    const allEvents = [newEvent, ...events].sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    setEvents(allEvents);
    
    // Reset form
    setEventFormData({ title: '', type: '', description: '', organizer: '', date: '', time: '', location: '' });
    setShowEventForm(false);
    
    // Show success toast
    toast({
      title: "Event created!",
      description: "Your event has been added to the Amsterdam Lore community calendar.",
    });
  };

  const handleJoinEvent = (id: number) => {
    // Update events state
    const updatedEvents = events.map(event => {
      if (event.id === id) {
        return { ...event, participants: event.participants + 1 };
      }
      return event;
    });
    
    setEvents(updatedEvents);
    
    // Update localStorage if it's a user-submitted event
    const userEventsJSON = localStorage.getItem('amsterdamLoreEvents');
    if (userEventsJSON) {
      const userEvents = JSON.parse(userEventsJSON);
      const updatedUserEvents = userEvents.map((event: CommunityEvent) => {
        if (event.id === id) {
          return { ...event, participants: event.participants + 1 };
        }
        return event;
      });
      
      localStorage.setItem('amsterdamLoreEvents', JSON.stringify(updatedUserEvents));
    }
    
    // Show success toast
    toast({
      title: "You've joined the event!",
      description: "You've been added to the participant list.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-orange-50 to-blue-100">
      {/* Navbar */}
      <header className="w-full py-6 px-4 bg-white/80 backdrop-blur-sm border-b border-orange-100">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 hover:scale-105 transition-transform duration-200">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Raleway, sans-serif' }}>
                AmsterdamLore
              </h1>
              <p className="text-sm text-gray-600">Canal Canvas Stories</p>
            </div>
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link to="/share-stories" className="text-gray-600 hover:text-blue-600 transition-colors">Stories</Link>
            <Link to="/visual-memories" className="text-gray-600 hover:text-green-600 transition-colors">Memories</Link>
            <Link to="/community-love" className="text-purple-600 font-semibold">Community</Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-16 animate-fade-in">
          <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 hover:scale-110 transition-transform duration-300">
            <Heart className="w-12 h-12 text-white animate-pulse" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Raleway, sans-serif' }}>
            Community Love
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8" style={{ fontFamily: 'Roboto, sans-serif' }}>
            Connect with fellow Amsterdam lovers and discover hidden gems together. 
            Join a community passionate about celebrating this amazing city.
          </p>
          
          {/* Join Community Button */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <Button 
              onClick={() => setShowJoinForm(!showJoinForm)}
              className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white hover:scale-105 transition-all duration-200"
              style={{ fontFamily: 'Raleway, sans-serif' }}
            >
              <UserPlus className="w-4 h-4 mr-2" />
              {showJoinForm ? 'Cancel' : 'Join Community'}
            </Button>
            
            <Button 
              onClick={() => setShowEventForm(!showEventForm)}
              className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white hover:scale-105 transition-all duration-200"
              style={{ fontFamily: 'Raleway, sans-serif' }}
            >
              <Calendar className="w-4 h-4 mr-2" />
              {showEventForm ? 'Cancel' : 'Create Event'}
            </Button>
          </div>
        </div>

        {/* Join Community Form */}
        {showJoinForm && (
          <Card className="border-0 shadow-xl bg-white mb-12 animate-scale-in">
            <CardHeader>
              <CardTitle className="text-2xl text-center" style={{ fontFamily: 'Raleway, sans-serif' }}>
                Join Our Amsterdam Community
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="interests">Your Interests</Label>
                  <Input
                    id="interests"
                    value={formData.interests}
                    onChange={(e) => setFormData({...formData, interests: e.target.value})}
                    placeholder="e.g., Photography, History, Street Art, Food"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="experience">Amsterdam Experience</Label>
                  <Textarea
                    id="experience"
                    value={formData.experience}
                    onChange={(e) => setFormData({...formData, experience: e.target.value})}
                    placeholder="Tell us about your connection to Amsterdam..."
                    rows={4}
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white"
                  style={{ fontFamily: 'Raleway, sans-serif' }}
                >
                  Join Community
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Create Event Form */}
        {showEventForm && (
          <Card className="border-0 shadow-xl bg-white mb-12 animate-scale-in">
            <CardHeader>
              <CardTitle className="text-2xl text-center" style={{ fontFamily: 'Raleway, sans-serif' }}>
                Create a Community Event
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleEventSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Event Title</Label>
                    <Input
                      id="title"
                      value={eventFormData.title}
                      onChange={(e) => setEventFormData({...eventFormData, title: e.target.value})}
                      placeholder="Enter event title"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="type">Event Type</Label>
                    <Input
                      id="type"
                      value={eventFormData.type}
                      onChange={(e) => setEventFormData({...eventFormData, type: e.target.value})}
                      placeholder="e.g., Photography, History, Community Service"
                      required
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={eventFormData.date}
                      onChange={(e) => setEventFormData({...eventFormData, date: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="time">Time</Label>
                    <Input
                      id="time"
                      type="time"
                      value={eventFormData.time}
                      onChange={(e) => setEventFormData({...eventFormData, time: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={eventFormData.location}
                    onChange={(e) => setEventFormData({...eventFormData, location: e.target.value})}
                    placeholder="Where will the event take place?"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="organizer">Organizer</Label>
                  <Input
                    id="organizer"
                    value={eventFormData.organizer}
                    onChange={(e) => setEventFormData({...eventFormData, organizer: e.target.value})}
                    placeholder="Your name or organization"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={eventFormData.description}
                    onChange={(e) => setEventFormData({...eventFormData, description: e.target.value})}
                    placeholder="Tell us about this event..."
                    rows={4}
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white"
                  style={{ fontFamily: 'Raleway, sans-serif' }}
                >
                  Create Event
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Events Grid */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {events.map((event, index) => (
            <Card 
              key={event.id} 
              className="border-0 shadow-lg bg-white hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer group"
              style={{
                animationDelay: `${index * 120}ms`,
                animation: 'slide-in-right 0.7s ease-out forwards'
              }}
            >
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                    {event.type}
                  </span>
                  <div className="flex items-center space-x-1 text-gray-500">
                    <User className="w-4 h-4" />
                    <span className="text-sm">{event.participants}</span>
                  </div>
                </div>
                <CardTitle className="text-lg leading-tight group-hover:text-purple-600 transition-colors" style={{ fontFamily: 'Raleway, sans-serif' }}>
                  {event.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-gray-600 text-sm mb-4" style={{ fontFamily: 'Roboto, sans-serif' }}>
                  {event.description}
                </p>
                <div className="space-y-2 text-xs text-gray-500">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-3 h-3" />
                    <span>{event.date} at {event.time}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <LocationIcon className="w-3 h-3" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <User className="w-3 h-3" />
                    <span>by {event.organizer}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Back Button */}
        <div className="text-center">
          <Button 
            asChild
            className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white hover:scale-105 transition-all duration-200"
            style={{ fontFamily: 'Raleway, sans-serif' }}
          >
            <Link to="/" className="flex items-center space-x-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-8 px-4 mt-16 bg-white/80 backdrop-blur-sm border-t border-orange-100">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-600" style={{ fontFamily: 'Roboto, sans-serif' }}>
            © 2024 AmsterdamLore.com - Celebrating the stories that make Amsterdam unique
          </p>
        </div>
      </footer>
    </div>
  );
};

export default CommunityLove;
