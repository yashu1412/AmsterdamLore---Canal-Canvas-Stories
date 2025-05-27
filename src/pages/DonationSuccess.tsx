
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Heart, Home, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const DonationSuccess = () => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setShowConfetti(true);
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-10">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-orange-400 opacity-70 animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      )}

      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
              <MapPin className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white" style={{ fontFamily: 'Raleway, sans-serif' }}>
                AmsterdamLore
              </h1>
            </div>
          </Link>
        </div>

        {/* Success Card */}
        <Card className="border-0 shadow-2xl bg-white dark:bg-gray-800">
          <CardHeader className="text-center pb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg animate-pulse">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold text-gray-900 dark:text-white mb-4" style={{ fontFamily: 'Raleway, sans-serif' }}>
              Thank You for Supporting AmsterdamLore!
            </CardTitle>
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-blue-50 to-orange-50 dark:from-gray-700 dark:to-gray-600 rounded-lg p-6">
                <p className="text-lg text-gray-700 dark:text-gray-200 leading-relaxed" style={{ fontFamily: 'Roboto, sans-serif' }}>
                  Your €1 donation helps us keep Amsterdam's stories alive and accessible to everyone. 
                  Together, we're building a digital canvas that celebrates the rich culture and folklore of this amazing city.
                </p>
              </div>
              
              <div className="flex items-center justify-center space-x-2 text-orange-600 dark:text-orange-400">
                <Heart className="w-5 h-5 fill-current" />
                <span className="font-medium" style={{ fontFamily: 'Raleway, sans-serif' }}>
                  You're now part of the AmsterdamLore community
                </span>
                <Heart className="w-5 h-5 fill-current" />
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="text-center space-y-6">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2" style={{ fontFamily: 'Raleway, sans-serif' }}>
                What's Next?
              </h3>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1" style={{ fontFamily: 'Roboto, sans-serif' }}>
                <li>• Share your own Amsterdam story or photo</li>
                <li>• Explore stories from other community members</li>
                <li>• Discover hidden gems around the canals</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                style={{ fontFamily: 'Raleway, sans-serif' }}
              >
                <Link to="/" className="flex items-center space-x-2">
                  <Home className="w-4 h-4" />
                  <span>Return Home</span>
                </Link>
              </Button>
              
              <Button 
                variant="outline"
                className="border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-white transition-all duration-300"
                style={{ fontFamily: 'Raleway, sans-serif' }}
              >
                Share Your Story
              </Button>
            </div>

            <p className="text-xs text-gray-500 dark:text-gray-400" style={{ fontFamily: 'Roboto, sans-serif' }}>
              You'll receive an email confirmation shortly. Questions? Contact us at hello@amsterdamlore.com
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DonationSuccess;
