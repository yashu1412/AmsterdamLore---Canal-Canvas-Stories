import { Heart, MapPin, Camera, BookOpen } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import StripeCheckout from '@/components/StripeCheckout';
import ThemeToggle from '@/components/ThemeToggle';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-orange-50 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="w-full py-6 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white" style={{ fontFamily: 'Raleway, sans-serif' }}>
                AmsterdamLore
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-300">Canal Canvas Stories</p>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <nav className="hidden md:flex space-x-6">
              <Link to="/share-stories" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Stories</Link>
              <Link to="/visual-memories" className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors">Memories</Link>
              <Link to="/community-love" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Community</Link>
            </nav>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-6" style={{ fontFamily: 'Raleway, sans-serif' }}>
            Discover Amsterdam's
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600 block">
              Hidden Stories
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto" style={{ fontFamily: 'Roboto, sans-serif' }}>
            A collaborative digital canvas where locals and visitors share the vibrant culture, 
            legends, and folklore that make Amsterdam extraordinary.
          </p>
        </div>

        {/* Featured Image */}
        <div className="mb-16 animate-scale-in">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-500">
            <img 
              src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=1200&h=400&fit=crop"
              alt="Amsterdam Canal View"
              className="w-full h-64 md:h-80 object-cover hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div className="absolute bottom-6 left-6 text-white">
              <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Raleway, sans-serif' }}>
                Canal Ring at Golden Hour
              </h3>
              <p className="text-sm opacity-90">The magical light that transforms Amsterdam every evening</p>
            </div>
          </div>
        </div>

        {/* Local Stories Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center" style={{ fontFamily: 'Raleway, sans-serif' }}>
            Local Stories
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <Link to="/story/1" className="block">
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 animate-slide-in-right">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Local Legend</span>
                    <div className="flex items-center space-x-1 text-gray-500">
                      <Heart className="w-4 h-4" />
                      <span className="text-sm">127</span>
                    </div>
                  </div>
                  <CardTitle className="text-xl group-hover:text-blue-600 transition-colors" style={{ fontFamily: 'Raleway, sans-serif' }}>
                    The Ghost of Café Central
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4" style={{ fontFamily: 'Roboto, sans-serif' }}>
                    For over a century, patrons of Café Central have reported seeing a mysterious figure in Victorian dress. 
                    The ghost, believed to be a former opera singer, appears only during full moons, humming forgotten melodies...
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>by Old Amsterdam Guide</span>
                    <span>Jan 20, 2024</span>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link to="/story/2" className="block">
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 animate-slide-in-right" style={{ animationDelay: '200ms' }}>
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Hidden Gem</span>
                    <div className="flex items-center space-x-1 text-gray-500">
                      <Heart className="w-4 h-4" />
                      <span className="text-sm">89</span>
                    </div>
                  </div>
                  <CardTitle className="text-xl group-hover:text-blue-600 transition-colors" style={{ fontFamily: 'Raleway, sans-serif' }}>
                    Secret Garden of Begijnhof
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4" style={{ fontFamily: 'Roboto, sans-serif' }}>
                    Hidden behind a wooden door in the Begijnhof courtyard lies a secret garden tended by the last remaining beguine. 
                    She welcomes visitors on Sunday mornings, sharing stories of medieval Amsterdam...
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>by Local Historian</span>
                    <span>Jan 18, 2024</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>

        {/* Community Stories Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center" style={{ fontFamily: 'Raleway, sans-serif' }}>
            Community Stories
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 animate-fade-in" style={{ animationDelay: '400ms' }}>
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">Community</span>
                  <div className="flex items-center space-x-1 text-gray-500">
                    <Heart className="w-4 h-4" />
                    <span className="text-sm">156</span>
                  </div>
                </div>
                <CardTitle className="text-xl" style={{ fontFamily: 'Raleway, sans-serif' }}>
                  Midnight Bicycle Symphony
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4" style={{ fontFamily: 'Roboto, sans-serif' }}>
                  Every first Friday of the month, a group of cyclists meets at Museumplein at midnight. 
                  They ride through the empty streets, their bells creating a haunting symphony that echoes through the canals...
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>by Night Rider</span>
                  <span>Jan 15, 2024</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 animate-fade-in" style={{ animationDelay: '600ms' }}>
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">Modern Tale</span>
                  <div className="flex items-center space-x-1 text-gray-500">
                    <Heart className="w-4 h-4" />
                    <span className="text-sm">203</span>
                  </div>
                </div>
                <CardTitle className="text-xl" style={{ fontFamily: 'Raleway, sans-serif' }}>
                  The Floating Bookshop
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4" style={{ fontFamily: 'Roboto, sans-serif' }}>
                  A mysterious floating bookshop appears on different canals each week. The elderly owner trades books for stories, 
                  claiming that every book finds its way to the person who needs it most...
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>by Book Lover</span>
                  <span>Jan 22, 2024</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-xl" style={{ fontFamily: 'Raleway, sans-serif' }}>Share Stories</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-gray-600" style={{ fontFamily: 'Roboto, sans-serif' }}>
                Submit your tales, legends, and experiences that capture Amsterdam's spirit.
              </p>
              <div className="flex flex-col space-y-2">
                <Button 
                  asChild 
                  size="sm" 
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                  style={{ fontFamily: 'Raleway, sans-serif' }}
                >
                  <Link to="/share-stories">Submit Story</Link>
                </Button>
                <Button 
                  asChild 
                  size="sm" 
                  variant="outline"
                  style={{ fontFamily: 'Raleway, sans-serif' }}
                >
                  <Link to="/share-stories">Browse Stories</Link>
                </Button>
                <Button 
                  asChild 
                  size="sm" 
                  variant="ghost"
                  style={{ fontFamily: 'Raleway, sans-serif' }}
                >
                  <Link to="/share-stories">Learn More</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-xl" style={{ fontFamily: 'Raleway, sans-serif' }}>Visual Memories</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-gray-600" style={{ fontFamily: 'Roboto, sans-serif' }}>
                Share photos, street art, and videos that showcase the city's creative soul.
              </p>
              <div className="flex flex-col space-y-2">
                <Button 
                  asChild 
                  size="sm" 
                  className="bg-green-500 hover:bg-green-600 text-white"
                  style={{ fontFamily: 'Raleway, sans-serif' }}
                >
                  <Link to="/visual-memories">Upload Photo</Link>
                </Button>
                <Button 
                  asChild 
                  size="sm" 
                  variant="outline"
                  style={{ fontFamily: 'Raleway, sans-serif' }}
                >
                  <Link to="/visual-memories">View Gallery</Link>
                </Button>
                <Button 
                  asChild 
                  size="sm" 
                  variant="ghost"
                  style={{ fontFamily: 'Raleway, sans-serif' }}
                >
                  <Link to="/visual-memories">Explore</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-xl" style={{ fontFamily: 'Raleway, sans-serif' }}>Community Love</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-gray-600" style={{ fontFamily: 'Roboto, sans-serif' }}>
                Connect with fellow Amsterdam lovers and discover hidden gems together.
              </p>
              <div className="flex flex-col space-y-2">
                <Button 
                  asChild 
                  size="sm" 
                  className="bg-purple-500 hover:bg-purple-600 text-white"
                  style={{ fontFamily: 'Raleway, sans-serif' }}
                >
                  <Link to="/community-love">Join Community</Link>
                </Button>
                <Button 
                  asChild 
                  size="sm" 
                  variant="outline"
                  style={{ fontFamily: 'Raleway, sans-serif' }}
                >
                  <Link to="/community-love">Find Events</Link>
                </Button>
                <Button 
                  asChild 
                  size="sm" 
                  variant="ghost"
                  style={{ fontFamily: 'Raleway, sans-serif' }}
                >
                  <Link to="/community-love">Connect</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Support the Lore Card */}
        <div className="flex justify-center">
          <Card className="w-full max-w-md border-0 shadow-2xl bg-white hover:shadow-3xl transition-all duration-500 hover:-translate-y-2">
            <CardHeader className="text-center pb-4">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Heart className="w-10 h-10 text-white animate-pulse" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Raleway, sans-serif' }}>
                Support the Lore
              </CardTitle>
              <CardDescription className="text-lg text-gray-600" style={{ fontFamily: 'Roboto, sans-serif' }}>
                Help us keep Amsterdam's stories alive. Contribute €1.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <StripeCheckout 
                amount={100}
                currency="eur"
                description="Support AmsterdamLore"
              />
              <p className="text-xs text-gray-500 text-center mt-4" style={{ fontFamily: 'Roboto, sans-serif' }}>
                Secure payment powered by Stripe
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-8 px-4 mt-16 bg-white/50 dark:bg-gray-800/50">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-600 dark:text-gray-300" style={{ fontFamily: 'Roboto, sans-serif' }}>
            © 2025 AmsterdamLore.com - Celebrating the stories that make Amsterdam unique
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
