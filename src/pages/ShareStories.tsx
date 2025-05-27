
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { BookOpen, ArrowLeft, MapPin, Heart, User, Plus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface Story {
  id: number;
  title: string;
  author: string;
  category: string;
  excerpt: string;
  date: string;
  likes: number;
}


const predefinedStories = [
  {
    id: 1,
    title: "The Ghost of the Red Light District",
    author: "Local Amsterdam Guide",
    category: "Legend",
    excerpt: "Every night at midnight, witnesses claim to see a mysterious figure in Victorian dress walking through the narrow alleys...",
    date: "2024-01-15",
    likes: 42
  },
  {
    id: 2,
    title: "Secret Underground Tunnels",
    author: "History Enthusiast",
    category: "History",
    excerpt: "During WWII, a network of secret tunnels connected many Amsterdam buildings. Some say they're still accessible today...",
    date: "2024-01-14",
    likes: 38
  },
  {
    id: 3,
    title: "The Floating Cat Sanctuary",
    author: "Animal Lover",
    category: "Modern Tale",
    excerpt: "Hidden behind the Herengracht canal lies a floating sanctuary where rescued cats live in floating houses...",
    date: "2024-01-13",
    likes: 55
  },
  {
    id: 4,
    title: "Midnight Bicycle Races",
    author: "Night Owl",
    category: "Urban Legend",
    excerpt: "Local cyclists gather at 2 AM for secret races through the empty streets, following routes known only to insiders...",
    date: "2024-01-12",
    likes: 29
  },
  {
    id: 5,
    title: "The Singing Bridge",
    author: "Music Teacher",
    category: "Folklore",
    excerpt: "On quiet nights, the Magere Brug is said to hum melodies from centuries past, audible only to those who truly listen...",
    date: "2024-01-11",
    likes: 67
  },
  {
    id: 6,
    title: "Canal Mermaids",
    author: "Street Artist",
    category: "Fantasy",
    excerpt: "Local artists have spotted mysterious figures swimming in the canals at dawn, leaving behind beautiful sand sculptures...",
    date: "2024-01-10",
    likes: 44
  },
  {
    id: 7,
    title: "The Bookshop Time Portal",
    author: "Literature Professor",
    category: "Mystery",
    excerpt: "Customers at an old bookshop on Spui report finding books that haven't been published yet, written by unknown authors...",
    date: "2024-01-09",
    likes: 51
  },
  {
    id: 8,
    title: "Dancing Statues of Vondelpark",
    author: "Park Ranger",
    category: "Supernatural",
    excerpt: "Park workers swear that the statues move positions overnight, creating new tableaux by morning...",
    date: "2024-01-08",
    likes: 33
  },
  {
    id: 9,
    title: "The Cheese Shop Oracle",
    author: "Local Resident",
    category: "Comedy",
    excerpt: "An elderly cheese seller can predict your future based on which cheese you choose. Surprisingly accurate predictions...",
    date: "2024-01-07",
    likes: 28
  },
  {
    id: 10,
    title: "Phantom Tram Line",
    author: "Transport Worker",
    category: "Ghost Story",
    excerpt: "Line 13 was discontinued decades ago, but some commuters still report seeing the old blue trams on foggy nights...",
    date: "2024-01-06",
    likes: 46
  }
];

const ShareStories = () => {
  const navigate = useNavigate();
  const [showSubmitForm, setShowSubmitForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    excerpt: '',
    author: ''
  });
  const [stories, setStories] = useState<Story[]>([]);
  const { toast } = useToast();

  const handleCardClick = (id: number, e: React.MouseEvent) => {

    if ((e.target as HTMLElement).closest('.like-button')) {
      return;
    }
    navigate(`/story/${id}`);
  };


  useEffect(() => {
    
    const userStoriesJSON = localStorage.getItem('amsterdamLoreStories');
    const userStories = userStoriesJSON ? JSON.parse(userStoriesJSON) : [];
    

    const allStories = [...predefinedStories, ...userStories].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    setStories(allStories);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    

    if (!formData.title || !formData.category || !formData.excerpt || !formData.author) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields to submit your story.",
        variant: "destructive"
      });
      return;
    }
    

    const newStory: Story = {
      id: Date.now(), 
      title: formData.title,
      category: formData.category,
      excerpt: formData.excerpt,
      author: formData.author,
      date: new Date().toISOString().split('T')[0],
      likes: 0
    };
    

    const existingStoriesJSON = localStorage.getItem('amsterdamLoreStories');
    const existingStories = existingStoriesJSON ? JSON.parse(existingStoriesJSON) : [];
    
 
    const updatedStories = [newStory, ...existingStories];
    

    localStorage.setItem('amsterdamLoreStories', JSON.stringify(updatedStories));
    

    const allStories = [newStory, ...stories].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    setStories(allStories);
    

    setFormData({ title: '', category: '', excerpt: '', author: '' });
    setShowSubmitForm(false);
    
  
    toast({
      title: "Story submitted!",
      description: "Your story has been added to the Amsterdam Lore collection.",
    });
  };

  const handleLike = (id: number) => {
 
    const updatedStories = stories.map(story => {
      if (story.id === id) {
        return { ...story, likes: story.likes + 1 };
      }
      return story;
    });
    
    setStories(updatedStories);
    
   
    const userStoriesJSON = localStorage.getItem('amsterdamLoreStories');
    if (userStoriesJSON) {
      const userStories = JSON.parse(userStoriesJSON);
      const updatedUserStories = userStories.map((story: Story) => {
        if (story.id === id) {
          return { ...story, likes: story.likes + 1 };
        }
        return story;
      });
      
      localStorage.setItem('amsterdamLoreStories', JSON.stringify(updatedUserStories));
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
            <Link to="/share-stories" className="text-blue-600 font-semibold">Stories</Link>
            <Link to="/visual-memories" className="text-gray-600 hover:text-green-600 transition-colors">Memories</Link>
            <Link to="/community-love" className="text-gray-600 hover:text-purple-600 transition-colors">Community</Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-16 animate-fade-in">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 hover:scale-110 transition-transform duration-300">
            <BookOpen className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Raleway, sans-serif' }}>
            Amsterdam Stories
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8" style={{ fontFamily: 'Roboto, sans-serif' }}>
            Discover the tales, legends, and experiences that capture Amsterdam's spirit. 
            Every story adds to the rich tapestry of this incredible city.
          </p>
          
          {/* Submit Story Button */}
          <Button 
            onClick={() => setShowSubmitForm(!showSubmitForm)}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white mb-8 hover:scale-105 transition-all duration-200"
            style={{ fontFamily: 'Raleway, sans-serif' }}
          >
            <Plus className="w-4 h-4 mr-2" />
            {showSubmitForm ? 'Cancel' : 'Submit Your Story'}
          </Button>
        </div>

        {/* Story Submission Form */}
        {showSubmitForm && (
          <Card className="border-0 shadow-xl bg-white mb-12 animate-scale-in">
            <CardHeader>
              <CardTitle className="text-2xl text-center" style={{ fontFamily: 'Raleway, sans-serif' }}>
                Share Your Amsterdam Story
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Story Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      placeholder="Enter your story title"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Input
                      id="category"
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      placeholder="e.g., Legend, History, Modern Tale"
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
                  <Label htmlFor="excerpt">Your Story</Label>
                  <Textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                    placeholder="Tell us your Amsterdam story..."
                    rows={6}
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
                  style={{ fontFamily: 'Raleway, sans-serif' }}
                >
                  Submit Story
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Stories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {stories.map((story, index) => (
            <div 
              key={story.id}
              className="block"
              onClick={(e) => handleCardClick(story.id, e)}
            >
              <Card 
                className="border-0 shadow-lg bg-white hover:shadow-xl transition-all duration-500 hover:-translate-y-2 cursor-pointer group"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: 'fade-in 0.6s ease-out forwards'
                }}
              >
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      {story.category}
                    </span>
                    <div 
                      className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLike(story.id);
                      }}
                    >
                      <Heart className="w-4 h-4" />
                      <span className="text-sm">{story.likes}</span>
                    </div>
                  </div>
                  <CardTitle className="text-lg leading-tight group-hover:text-blue-600 transition-colors" style={{ fontFamily: 'Raleway, sans-serif' }}>
                    {story.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-gray-600 text-sm mb-3 line-clamp-3" style={{ fontFamily: 'Roboto, sans-serif' }}>
                    {story.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <User className="w-3 h-3" />
                      <span>{story.author}</span>
                    </div>
                    <span>{story.date}</span>
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
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white hover:scale-105 transition-all duration-200"
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

export default ShareStories;
