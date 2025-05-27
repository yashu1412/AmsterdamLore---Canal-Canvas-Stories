
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { XCircle, ArrowLeft, RefreshCw, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const DonationCancelled = () => {
  const handleRetry = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
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

        {/* Cancelled Card */}
        <Card className="border-0 shadow-2xl bg-white dark:bg-gray-800">
          <CardHeader className="text-center pb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <XCircle className="w-12 h-12 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold text-gray-900 dark:text-white mb-4" style={{ fontFamily: 'Raleway, sans-serif' }}>
              Payment Cancelled
            </CardTitle>
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-gray-700 dark:to-gray-600 rounded-lg p-6">
                <p className="text-lg text-gray-700 dark:text-gray-200 leading-relaxed" style={{ fontFamily: 'Roboto, sans-serif' }}>
                  No worries! Your donation was cancelled and no payment was processed. 
                  You can always try again when you're ready to support AmsterdamLore.
                </p>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300" style={{ fontFamily: 'Roboto, sans-serif' }}>
                We understand that sometimes things don't go as planned. Your support means the world to us, 
                whenever you're ready to contribute.
              </p>
            </div>
          </CardHeader>
          
          <CardContent className="text-center space-y-6">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2" style={{ fontFamily: 'Raleway, sans-serif' }}>
                Other Ways to Support
              </h3>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1" style={{ fontFamily: 'Roboto, sans-serif' }}>
                <li>• Share AmsterdamLore with friends and family</li>
                <li>• Submit your own stories and photos</li>
                <li>• Follow us on social media</li>
                <li>• Spread the word about Amsterdam's rich culture</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={handleRetry}
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                style={{ fontFamily: 'Raleway, sans-serif' }}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
              
              <Button 
                asChild
                variant="outline"
                className="border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-white transition-all duration-300"
                style={{ fontFamily: 'Raleway, sans-serif' }}
              >
                <Link to="/" className="flex items-center space-x-2">
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Home</span>
                </Link>
              </Button>
            </div>

            <p className="text-xs text-gray-500 dark:text-gray-400" style={{ fontFamily: 'Roboto, sans-serif' }}>
              Questions? Contact us at hello@amsterdamlore.com
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DonationCancelled;
