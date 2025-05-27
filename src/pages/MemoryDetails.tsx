
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MapPin, Heart, User, Calendar, Tag, Eye, Clock, Map, Camera } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';


interface Memory {
  id: number;
  title: string;
  author: string;
  category: string;
  description: string;
  date: string;
  likes: number;
  views: number;
  image: string;
  localImageUrl?: string;
  location?: string;
  cameraInfo?: string;
  tags?: string[];
}


const memories = [
  {
    id: 1,
    title: "Golden Hour Canal Reflection",
    author: "Photography Enthusiast",
    category: "Photography",
    description: "Captured the perfect golden hour reflection in Herengracht canal during a peaceful evening walk. The light dancing on the water created this magical moment that perfectly encapsulates Amsterdam's timeless beauty. This shot was taken just as the sun was setting, casting warm golden tones across the historic canal houses.",
    date: "2024-01-15",
    likes: 89,
    views: 234,
    image: "photo-1649972904349-6e44c42644a7",
    location: "Herengracht Canal, Amsterdam",
    cameraInfo: "Sony Alpha a7 III, 24-70mm f/2.8",
    tags: ["sunset", "canal", "reflection", "golden hour"]
  },
  {
    id: 2,
    title: "Street Art in Jordaan",
    author: "Urban Explorer",
    category: "Street Art",
    description: "Amazing mural discovered in a hidden alley in the Jordaan district. This vibrant piece by local artist depicts the spirit of Amsterdam through colorful canal houses and floating bicycles. The artwork transforms an ordinary wall into a celebration of the city's unique character and creativity.",
    date: "2024-01-14",
    likes: 67,
    views: 189,
    image: "photo-1488590528505-98d2b5aba04b"
  },
];

const MemoryDetails = () => {
  const { id } = useParams();
  const [memory, setMemory] = useState<Memory | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedMemories, setRelatedMemories] = useState<Memory[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {

    const memoryId = parseInt(id || '0');
    
    
    let foundMemory = memories.find(m => m.id === memoryId);
    

    if (!foundMemory) {
      const userMemoriesJSON = localStorage.getItem('amsterdamLoreMemories');
      if (userMemoriesJSON) {
        const userMemories = JSON.parse(userMemoriesJSON);
        foundMemory = userMemories.find((m: Memory) => m.id === memoryId);
        
        if (foundMemory) {
         
          const updatedMemory = { ...foundMemory, views: foundMemory.views + 1 };
          setMemory(updatedMemory);
          
         
          const updatedUserMemories = userMemories.map((m: Memory) => {
            if (m.id === memoryId) {
              return { ...m, views: m.views + 1 };
            }
            return m;
          });
          localStorage.setItem('amsterdamLoreMemories', JSON.stringify(updatedUserMemories));
          
          
          const allMemories = [...memories, ...userMemories];
          const related = allMemories
            .filter(m => m.id !== memoryId && m.category === updatedMemory.category)
            .slice(0, 3); 
          
          setRelatedMemories(related);
        }
      }
    }
    
    setLoading(false);
  }, [id]);
  
  const handleLike = () => {
    if (!memory) return;
    
  
    const updatedMemory = { ...memory, likes: memory.likes + 1 };
    setMemory(updatedMemory);
    

    const userMemoriesJSON = localStorage.getItem('amsterdamLoreMemories');
    if (userMemoriesJSON) {
      const userMemories = JSON.parse(userMemoriesJSON);
      const updatedUserMemories = userMemories.map((m: Memory) => {
        if (m.id === memory.id) {
          return { ...m, likes: m.likes + 1 };
        }
        return m;
      });
      
      localStorage.setItem('amsterdamLoreMemories', JSON.stringify(updatedUserMemories));
    }
    
    toast({
      title: "Memory liked!",
      description: "Thank you for appreciating this visual memory.",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-orange-50 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading memory...</p>
        </div>
      </div>
    );
  }

  if (!memory) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-orange-50 to-blue-100 flex items-center justify-center">
        <Card className="max-w-md mx-4">
          <CardContent className="text-center py-8">
            <h2 className="text-2xl font-bold mb-4">Memory Not Found</h2>
            <p className="text-gray-600 mb-6">The memory you're looking for doesn't exist.</p>
            <Button asChild>
              <Link to="/visual-memories">Back to Memories</Link>
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
            <Link to="/visual-memories" className="text-green-600 font-semibold">Memories</Link>
            <Link to="/community-love" className="text-gray-600 hover:text-purple-600 transition-colors">Community</Link>
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
            <Link to="/visual-memories" className="flex items-center space-x-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Memories</span>
            </Link>
          </Button>
        </div>

        {/* Memory Header Image */}
        <div className="mb-8 animate-scale-in">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src={memory.localImageUrl || `https://images.unsplash.com/${memory.image}?w=1200&h=400&fit=crop`}
              alt={memory.title}
              className="w-full h-64 md:h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div className="absolute bottom-6 left-6 text-white">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-xs bg-green-100/20 text-white px-2 py-1 rounded-full backdrop-blur-sm">
                  {memory.category}
                </span>
                <div className="flex items-center space-x-1">
                  <Heart className="w-4 h-4" />
                  <span className="text-sm">{memory.likes}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Eye className="w-4 h-4" />
                  <span className="text-sm">{memory.views}</span>
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ fontFamily: 'Raleway, sans-serif' }}>
                {memory.title}
              </h1>
            </div>
          </div>
        </div>

        {/* Memory Details */}
        <Card className="border-0 shadow-xl bg-white mb-8 animate-fade-in">
          <CardHeader>
            <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-gray-600">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <User className="w-4 h-4" />
                  <span>{memory.author}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{memory.date}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Tag className="w-4 h-4" />
                  <span>{memory.category}</span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1 text-red-500">
                  <Heart className="w-4 h-4" />
                  <span>{memory.likes} likes</span>
                </div>
                <div className="flex items-center space-x-1 text-gray-500">
                  <Eye className="w-4 h-4" />
                  <span>{memory.views} views</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="prose prose-lg max-w-none" style={{ fontFamily: 'Roboto, sans-serif' }}>
              <p className="text-gray-700 leading-relaxed mb-6">
                {memory.description}
              </p>
              
              {/* Additional Memory Details */}
              <div className="grid md:grid-cols-2 gap-6 mt-8 border-t border-gray-100 pt-6">
                {/* Left Column */}
                <div className="space-y-4">
                  {memory.location && (
                    <div className="flex items-start space-x-3">
                      <Map className="w-5 h-5 text-green-500 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-gray-900">Location</h3>
                        <p className="text-gray-600">{memory.location}</p>
                      </div>
                    </div>
                  )}
                  
                  {memory.cameraInfo && (
                    <div className="flex items-start space-x-3">
                      <Camera className="w-5 h-5 text-green-500 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-gray-900">Camera Info</h3>
                        <p className="text-gray-600">{memory.cameraInfo}</p>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Right Column */}
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Clock className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-gray-900">Posted On</h3>
                      <p className="text-gray-600">{new Date(memory.date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}</p>
                    </div>
                  </div>
                  
                  {memory.tags && memory.tags.length > 0 && (
                    <div className="flex items-start space-x-3">
                      <Tag className="w-5 h-5 text-green-500 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-gray-900">Tags</h3>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {memory.tags.map(tag => (
                            <span key={tag} className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="text-center space-y-4 mb-12">
          <div className="flex justify-center space-x-4">
            <Button 
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white"
              style={{ fontFamily: 'Raleway, sans-serif' }}
              onClick={handleLike}
            >
              <Heart className="w-4 h-4 mr-2" />
              Like Memory
            </Button>
            <Button 
              variant="outline"
              style={{ fontFamily: 'Raleway, sans-serif' }}
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                toast({
                  title: "Link copied!",
                  description: "Memory link copied to clipboard.",
                });
              }}
            >
              Share Memory
            </Button>
          </div>
          
          <Button 
            asChild
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
            style={{ fontFamily: 'Raleway, sans-serif' }}
          >
            <Link to="/visual-memories">View More Memories</Link>
          </Button>
        </div>
        
        {/* Related Memories */}
        {relatedMemories.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Raleway, sans-serif' }}>
              Related Memories
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedMemories.map((relatedMemory) => (
                <Card 
                  key={relatedMemory.id}
                  className="border-0 shadow-lg bg-white hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer group overflow-hidden"
                  onClick={() => navigate(`/memory/${relatedMemory.id}`)}
                >
                  <div className="relative overflow-hidden">
                    <img 
                      src={relatedMemory.localImageUrl || `https://images.unsplash.com/${relatedMemory.image}?w=400&h=250&fit=crop`}
                      alt={relatedMemory.title}
                      className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full backdrop-blur-sm">
                        {relatedMemory.category}
                      </span>
                    </div>
                  </div>
                  <CardHeader className="pb-2 pt-3">
                    <CardTitle className="text-base leading-tight group-hover:text-green-600 transition-colors" style={{ fontFamily: 'Raleway, sans-serif' }}>
                      {relatedMemory.title}
                    </CardTitle>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        )}
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

export default MemoryDetails;
