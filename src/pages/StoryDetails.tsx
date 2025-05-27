
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MapPin, Heart, User, Calendar, Tag } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

// Mock story data - in a real app, this would come from an API
const stories = [
  {
    id: 1,
    title: "The Ghost of the Red Light District",
    author: "Local Amsterdam Guide",
    category: "Legend",
    excerpt: "Every night at midnight, witnesses claim to see a mysterious figure in Victorian dress walking through the narrow alleys...",
    content: "For over a century, locals and tourists alike have reported sightings of a mysterious figure roaming the narrow cobblestone alleys of Amsterdam's Red Light District. This ghostly apparition, described as a woman in elaborate Victorian dress, appears only during the stroke of midnight on moonless nights.\n\nThe legend dates back to 1887, when Maria van der Berg, a prominent opera singer, mysteriously disappeared after her final performance at the Concertgebouw. She was last seen walking toward the Red Light District, her emerald green gown trailing behind her in the gaslight.\n\nWitnesses describe hearing faint melodies echoing through the alleys - the same aria Maria was famous for performing. Some brave souls who have followed the sound report seeing her silhouette in doorways, only for it to vanish when approached.\n\nLocal historians believe Maria's spirit remains tied to the district, searching for something or someone she lost. The mystery deepened in 1923 when renovations of an old building revealed a hidden room containing personal belongings, including sheet music with Maria's signature.\n\nToday, ghost tour guides include Maria's story in their midnight walks, though many refuse to venture into the specific alley where she's most commonly sighted. Whether you believe in ghosts or not, the tale of Maria van der Berg has become an integral part of Amsterdam's supernatural folklore.",
    date: "2024-01-15",
    likes: 42,
    image: "photo-1649972904349-6e44c42644a7"
  },
  {
    id: 2,
    title: "Secret Underground Tunnels",
    author: "History Enthusiast",
    category: "History",
    excerpt: "During WWII, a network of secret tunnels connected many Amsterdam buildings. Some say they're still accessible today...",
    content: "Beneath the bustling streets of Amsterdam lies a hidden network of tunnels that played a crucial role during World War II. These underground passages, carved out over centuries for various purposes, became lifelines for the Dutch resistance movement.\n\nOriginally constructed in the 17th century as drainage systems and storage areas for wealthy merchants, these tunnels gained new significance during the Nazi occupation. The resistance used them to move people, weapons, and information without detection.\n\nThe main tunnel network connects several key buildings in the Jordaan district, including the old brewery cellars and the basements of canal houses. Local architect Jan de Vries, who studied these tunnels extensively, discovered that many entrances were cleverly concealed behind false walls and movable bookcases.\n\nDuring the war, an estimated 200 people used these tunnels regularly. They housed printing presses for underground newspapers, served as meeting points for resistance leaders, and provided escape routes for those fleeing Nazi persecution.\n\nToday, most tunnel entrances have been sealed for safety reasons, but urban explorers claim to have found several accessible sections. The city government maintains strict secrecy about their exact locations to prevent unauthorized access.\n\nIn 2019, construction workers accidentally broke through into one of these tunnels while renovating a building on Prinsengracht, revealing artifacts that confirmed many of the wartime stories passed down through generations.",
    date: "2024-01-14",
    likes: 38,
    image: "photo-1518770660439-4636190af475"
  }
];

const StoryDetails = () => {
  const { id } = useParams();
  const story = stories.find(s => s.id === parseInt(id || '0'));

  if (!story) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-orange-50 to-blue-100 flex items-center justify-center">
        <Card className="max-w-md mx-4">
          <CardContent className="text-center py-8">
            <h2 className="text-2xl font-bold mb-4">Story Not Found</h2>
            <p className="text-gray-600 mb-6">The story you're looking for doesn't exist.</p>
            <Button asChild>
              <Link to="/share-stories">Back to Stories</Link>
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
            <Link to="/share-stories" className="text-blue-600 font-semibold">Stories</Link>
            <Link to="/visual-memories" className="text-gray-600 hover:text-green-600 transition-colors">Memories</Link>
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
            <Link to="/share-stories" className="flex items-center space-x-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Stories</span>
            </Link>
          </Button>
        </div>

        {/* Story Header Image */}
        <div className="mb-8 animate-scale-in">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src={`https://images.unsplash.com/${story.image}?w=1200&h=400&fit=crop`}
              alt={story.title}
              className="w-full h-64 md:h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div className="absolute bottom-6 left-6 text-white">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-xs bg-blue-100/20 text-white px-2 py-1 rounded-full backdrop-blur-sm">
                  {story.category}
                </span>
                <div className="flex items-center space-x-1">
                  <Heart className="w-4 h-4" />
                  <span className="text-sm">{story.likes}</span>
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ fontFamily: 'Raleway, sans-serif' }}>
                {story.title}
              </h1>
            </div>
          </div>
        </div>

        {/* Story Details */}
        <Card className="border-0 shadow-xl bg-white mb-8 animate-fade-in">
          <CardHeader>
            <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-gray-600">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <User className="w-4 h-4" />
                  <span>{story.author}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{story.date}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Tag className="w-4 h-4" />
                  <span>{story.category}</span>
                </div>
              </div>
              <div className="flex items-center space-x-1 text-red-500">
                <Heart className="w-4 h-4" />
                <span>{story.likes} likes</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="prose prose-lg max-w-none" style={{ fontFamily: 'Roboto, sans-serif' }}>
              {story.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="text-center space-y-4">
          <div className="flex justify-center space-x-4">
            <Button 
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white"
              style={{ fontFamily: 'Raleway, sans-serif' }}
            >
              <Heart className="w-4 h-4 mr-2" />
              Like Story
            </Button>
            <Button 
              variant="outline"
              style={{ fontFamily: 'Raleway, sans-serif' }}
            >
              Share Story
            </Button>
          </div>
          
          <Button 
            asChild
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
            style={{ fontFamily: 'Raleway, sans-serif' }}
          >
            <Link to="/share-stories">Read More Stories</Link>
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

export default StoryDetails;
