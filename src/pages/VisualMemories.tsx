
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Camera, ArrowLeft, MapPin, Heart, User, Eye, Upload } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';


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
}

const memories = [
  {
    id: 1,
    title: "Golden Hour Canal Reflection",
    author: "Photography Enthusiast",
    category: "Photography",
    description: "Captured the perfect golden hour reflection in Herengracht canal...",
    date: "2024-01-15",
    likes: 89,
    views: 234,
    image: "photo-1649972904349-6e44c42644a7"
  },
  {
    id: 2,
    title: "Street Art in Jordaan",
    author: "Urban Explorer",
    category: "Street Art",
    description: "Amazing mural discovered in a hidden alley in the Jordaan district...",
    date: "2024-01-14",
    likes: 67,
    views: 189,
    image: "photo-1488590528505-98d2b5aba04b"
  },
  {
    id: 3,
    title: "Bicycles by the Bridge",
    author: "Local Resident",
    category: "Daily Life",
    description: "The iconic sight of hundreds of bicycles parked along Magere Brug...",
    date: "2024-01-13",
    likes: 92,
    views: 312,
    image: "photo-1518770660439-4636190af475"
  },
  {
    id: 4,
    title: "Tulip Season at Keukenhof",
    author: "Nature Lover",
    category: "Nature",
    description: "The explosion of colors during the famous tulip season...",
    date: "2024-01-12",
    likes: 156,
    views: 445,
    image: "photo-1461749280684-dccba630e2f6"
  },
  {
    id: 5,
    title: "Night Market Vibes",
    author: "Food Blogger",
    category: "Culture",
    description: "The bustling atmosphere of the Saturday night market...",
    date: "2024-01-11",
    likes: 73,
    views: 198,
    image: "photo-1581091226825-a6a2a5aee158"
  },
  {
    id: 6,
    title: "Amsterdam from Above",
    author: "Drone Pilot",
    category: "Aerial",
    description: "Stunning aerial view of the canal ring from 100 meters up...",
    date: "2024-01-10",
    likes: 134,
    views: 378,
    image: "photo-1526374965328-7f61d4dc18c5"
  },
  {
    id: 7,
    title: "Vintage Tram in Action",
    author: "Transport Fan",
    category: "Transportation",
    description: "Classic blue and white tram navigating through Leidseplein...",
    date: "2024-01-09",
    likes: 58,
    views: 167,
    image: "photo-1531297484001-80022131f5a1"
  },
  {
    id: 8,
    title: "Canal House Details",
    author: "Architecture Student",
    category: "Architecture",
    description: "Intricate details on a 17th-century canal house facade...",
    date: "2024-01-08",
    likes: 81,
    views: 223,
    image: "photo-1605810230434-7631ac76ec81"
  },
  {
    id: 9,
    title: "Coffee Culture",
    author: "Cafe Hopper",
    category: "Lifestyle",
    description: "The perfect morning coffee setup at a local brown cafe...",
    date: "2024-01-07",
    likes: 95,
    views: 267,
    image: "photo-1519389950473-47ba0277781c"
  },
  {
    id: 10,
    title: "Floating Flower Market",
    author: "Market Visitor",
    category: "Markets",
    description: "Colorful display at the world's only floating flower market...",
    date: "2024-01-06",
    likes: 112,
    views: 334,
    image: "photo-1581090464777-f3220bbe1b8b"
  }
];

const VisualMemories = () => {
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    author: ''
  });
  const [allMemories, setAllMemories] = useState<Memory[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
  
    const userMemoriesJSON = localStorage.getItem('amsterdamLoreMemories');
    const userMemories = userMemoriesJSON ? JSON.parse(userMemoriesJSON) : [];
    

    const combinedMemories = [...memories, ...userMemories].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    setAllMemories(combinedMemories);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    

    if (!formData.title || !formData.category || !formData.description || !formData.author || !selectedFile || !imagePreviewUrl) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields and select a photo to upload.",
        variant: "destructive"
      });
      return;
    }
    
    // Create a placeholder image ID (in a real app, you'd upload the image to a server)
    // For this demo, we'll use a random image from Unsplash as fallback
    const randomImageId = `photo-${Math.floor(Math.random() * 1000000)}`;
    
    // Create new memory object with the local image URL
    const newMemory: Memory = {
      id: Date.now(), // Use timestamp as unique ID
      title: formData.title,
      category: formData.category,
      description: formData.description,
      author: formData.author,
      date: new Date().toISOString().split('T')[0], // Format: YYYY-MM-DD
      likes: 0,
      views: 0,
      image: randomImageId,
      localImageUrl: imagePreviewUrl // Store the data URL of the uploaded image
    };
    
    // Get existing memories from localStorage
    const existingMemoriesJSON = localStorage.getItem('amsterdamLoreMemories');
    const existingMemories = existingMemoriesJSON ? JSON.parse(existingMemoriesJSON) : [];
    
    // Add new memory to existing memories
    const updatedMemories = [newMemory, ...existingMemories];
    
    // Save to localStorage
    localStorage.setItem('amsterdamLoreMemories', JSON.stringify(updatedMemories));
    
    // Update state with all memories (predefined + user memories)
    const combinedMemories = [newMemory, ...allMemories].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    setAllMemories(combinedMemories);
    
    // In your handleSubmit function, after processing the form:
    
    // Reset form
    setFormData({ title: '', category: '', description: '', author: '' });
    setSelectedFile(null);
    setImagePreviewUrl(null); // Add this line
    setShowUploadForm(false);
    
    // Show success toast
    toast({
      title: "Memory uploaded!",
      description: "Your visual memory has been added to the Amsterdam Lore collection.",
    });
  };

  const handleLike = (id: number) => {
    // Update memories state
    const updatedMemories = allMemories.map(memory => {
      if (memory.id === id) {
        return { ...memory, likes: memory.likes + 1 };
      }
      return memory;
    });
    
    setAllMemories(updatedMemories);
    
    // Update localStorage if it's a user-submitted memory
    const userMemoriesJSON = localStorage.getItem('amsterdamLoreMemories');
    if (userMemoriesJSON) {
      const userMemories = JSON.parse(userMemoriesJSON);
      const updatedUserMemories = userMemories.map((memory: Memory) => {
        if (memory.id === id) {
          return { ...memory, likes: memory.likes + 1 };
        }
        return memory;
      });
      
      localStorage.setItem('amsterdamLoreMemories', JSON.stringify(updatedUserMemories));
    }
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
            <Link to="/visual-memories" className="text-green-600 font-semibold">Memories</Link>
            <Link to="/community-love" className="text-gray-600 hover:text-purple-600 transition-colors">Community</Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-16 animate-fade-in">
          <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 hover:scale-110 transition-transform duration-300">
            <Camera className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Raleway, sans-serif' }}>
            Visual Memories
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8" style={{ fontFamily: 'Roboto, sans-serif' }}>
            Share photos, street art, and videos that showcase Amsterdam's creative soul. 
            Capture the beauty and essence of the city through your lens.
          </p>
          
          {/* Upload Photo Button */}
          <Button 
            onClick={() => setShowUploadForm(!showUploadForm)}
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white mb-8 hover:scale-105 transition-all duration-200"
            style={{ fontFamily: 'Raleway, sans-serif' }}
          >
            <Upload className="w-4 h-4 mr-2" />
            {showUploadForm ? 'Cancel' : 'Upload Photo'}
          </Button>
        </div>

        {/* Photo Upload Form */}
        {showUploadForm && (
          <Card className="border-0 shadow-xl bg-white mb-12 animate-scale-in">
            <CardHeader>
              <CardTitle className="text-2xl text-center" style={{ fontFamily: 'Raleway, sans-serif' }}>
                Share Your Visual Memory
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="photo">Select Photo</Label>
                  <Input
                    id="photo"
                    type="file"
                    accept="image/*"
                    className="cursor-pointer"
                    onChange={handleFileChange}
                    required
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Photo Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      placeholder="Enter photo title"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Input
                      id="category"
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      placeholder="e.g., Street Art, Architecture, Daily Life"
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="author">Your Name</Label>
                  <Input
                    id="author"
                    value={formData.author}
                    onChange={(e) => setFormData({...formData, author: e.target.value})}
                    placeholder="How should we credit you?"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Tell us about this photo..."
                    rows={4}
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
                  style={{ fontFamily: 'Raleway, sans-serif' }}
                >
                  Upload Photo
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Memories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {allMemories.map((memory, index) => (
            <div 
              key={memory.id}
              className="block"
            >
              <Card 
                className="border-0 shadow-lg bg-white hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 cursor-pointer group overflow-hidden"
                style={{
                  animationDelay: `${index * 150}ms`,
                  animation: 'scale-in 0.8s ease-out forwards'
                }}
                onClick={() => navigate(`/memory/${memory.id}`)}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={memory.localImageUrl || `https://images.unsplash.com/${memory.image}?w=400&h=250&fit=crop`}
                    alt={memory.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full backdrop-blur-sm">
                      {memory.category}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3 flex space-x-2">
                    <div 
                      className="flex items-center space-x-1 text-white bg-black/50 px-2 py-1 rounded-full text-xs backdrop-blur-sm cursor-pointer hover:bg-green-600/70 transition-colors"
                      onClick={(e) => {
                        e.preventDefault();
                        handleLike(memory.id);
                      }}
                    >
                      <Heart className="w-3 h-3" />
                      <span>{memory.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-white bg-black/50 px-2 py-1 rounded-full text-xs backdrop-blur-sm">
                      <Eye className="w-3 h-3" />
                      <span>{memory.views}</span>
                    </div>
                  </div>
                </div>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg leading-tight group-hover:text-green-600 transition-colors" style={{ fontFamily: 'Raleway, sans-serif' }}>
                    {memory.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-gray-600 text-sm mb-3" style={{ fontFamily: 'Roboto, sans-serif' }}>
                    {memory.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <User className="w-3 h-3" />
                      <span>{memory.author}</span>
                    </div>
                    <span>{memory.date}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Back Button */}
        <div className="text-center">
          <Button 
            asChild
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white hover:scale-105 transition-all duration-200"
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

export default VisualMemories;
