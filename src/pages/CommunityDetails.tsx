
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MapPin, Heart, User, Calendar, Tag, Users } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';


const communityPosts = [
  {
    id: 1,
    title: "Amsterdam Food Tour",
    author: "Food Explorer",
    category: "Food & Drink",
    description: "Join us for an incredible culinary journey through Amsterdam's hidden food gems! We'll explore local markets, taste traditional Dutch delicacies, and discover the best stroopwafels in the city. This tour is perfect for food lovers who want to experience authentic Amsterdam flavors beyond the typical tourist spots.",
    date: "2024-01-20",
    time: "14:00",
    location: "Central Station",
    participants: 12,
    maxParticipants: 15,
    likes: 45,
    image: "photo-1519389950473-47ba0277781c"
  },
  {
    id: 2,
    title: "Photography Walk",
    author: "Photo Enthusiast",
    category: "Photography",
    description: "Capture Amsterdam's most photogenic spots during golden hour! We'll visit iconic canals, hidden courtyards, and architectural gems. Perfect for both beginners and experienced photographers. Bring your camera and let's create beautiful memories together while exploring the city's most Instagram-worthy locations.",
    date: "2024-01-22",
    time: "17:30",
    location: "Dam Square",
    participants: 8,
    maxParticipants: 10,
    likes: 67,
    image: "photo-1649972904349-6e44c42644a7"
  },
];

const CommunityDetails = () => {
  const { id } = useParams();
  const post = communityPosts.find(p => p.id === parseInt(id || '0'));

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-orange-50 to-blue-100 flex items-center justify-center">
        <Card className="max-w-md mx-4">
          <CardContent className="text-center py-8">
            <h2 className="text-2xl font-bold mb-4">Event Not Found</h2>
            <p className="text-gray-600 mb-6">The event you're looking for doesn't exist.</p>
            <Button asChild>
              <Link to="/community-love">Back to Community</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-orange-50 to-blue-100">
      {/* Navbar */}
      <header className="w-full py-6 px-4 bg-white/80 backdrop-blur-sm border-b border-orange-100">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
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
      <section className="max-w-4xl mx-auto px-4 py-12">
        {/* Back Button */}
        <div className="mb-8">
          <Button 
            asChild
            variant="outline"
            className="hover:scale-105 transition-all duration-200"
            style={{ fontFamily: 'Raleway, sans-serif' }}
          >
            <Link to="/community-love" className="flex items-center space-x-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Community</span>
            </Link>
          </Button>
        </div>

        {/* Event Header Image */}
        <div className="mb-8 animate-scale-in">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src={`https://images.unsplash.com/${post.image}?w=1200&h=400&fit=crop`}
              alt={post.title}
              className="w-full h-64 md:h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div className="absolute bottom-6 left-6 text-white">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-xs bg-purple-100/20 text-white px-2 py-1 rounded-full backdrop-blur-sm">
                  {post.category}
                </span>
                <div className="flex items-center space-x-1">
                  <Heart className="w-4 h-4" />
                  <span className="text-sm">{post.likes}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">{post.participants}/{post.maxParticipants}</span>
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ fontFamily: 'Raleway, sans-serif' }}>
                {post.title}
              </h1>
            </div>
          </div>
        </div>

        {/* Event Details */}
        <Card className="border-0 shadow-xl bg-white mb-8 animate-fade-in">
          <CardHeader>
            <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-gray-600">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <User className="w-4 h-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{post.date} at {post.time}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>{post.location}</span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1 text-red-500">
                  <Heart className="w-4 h-4" />
                  <span>{post.likes} likes</span>
                </div>
                <div className="flex items-center space-x-1 text-purple-500">
                  <Users className="w-4 h-4" />
                  <span>{post.participants}/{post.maxParticipants} joined</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="prose prose-lg max-w-none" style={{ fontFamily: 'Roboto, sans-serif' }}>
              <p className="text-gray-700 leading-relaxed mb-6">
                {post.description}
              </p>
              
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-purple-800 mb-2">Event Details</h3>
                <div className="space-y-2 text-sm text-purple-700">
                  <div><strong>Date:</strong> {post.date}</div>
                  <div><strong>Time:</strong> {post.time}</div>
                  <div><strong>Meeting Point:</strong> {post.location}</div>
                  <div><strong>Spots Available:</strong> {post.maxParticipants - post.participants} of {post.maxParticipants}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="text-center space-y-4">
          <div className="flex justify-center space-x-4">
            <Button 
              className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white"
              style={{ fontFamily: 'Raleway, sans-serif' }}
              disabled={post.participants >= post.maxParticipants}
            >
              <Users className="w-4 h-4 mr-2" />
              {post.participants >= post.maxParticipants ? 'Event Full' : 'Join Event'}
            </Button>
            <Button 
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white"
              style={{ fontFamily: 'Raleway, sans-serif' }}
            >
              <Heart className="w-4 h-4 mr-2" />
              Like Event
            </Button>
          </div>
          
          <Button 
            asChild
            className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white"
            style={{ fontFamily: 'Raleway, sans-serif' }}
          >
            <Link to="/community-love">View More Events</Link>
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

export default CommunityDetails;
