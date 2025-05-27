import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface StripeCheckoutProps {
  amount?: number;
  currency?: string;
  description?: string;
}

const StripeCheckout = ({ amount = 100, currency = 'eur', description = 'Donate to AmsterdamLore' }: StripeCheckoutProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleStripeRedirect = async () => {
    setIsLoading(true);
    toast({
      title: 'Redirecting to Stripe...',
      description: 'Please wait while we prepare your secure payment.',
    });


    const origin = window.location.origin;
 
    const successUrl = `${origin}/donation-success`;
    const cancelUrl = `${origin}/donation-cancelled`;
    
  
    window.location.href = `https://buy.stripe.com/test_cNi00c3KydhD2qieg6gw000?success_url=${encodeURIComponent(successUrl)}&cancel_url=${encodeURIComponent(cancelUrl)}`;
    setIsLoading(false);
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b">
        <CardTitle className="text-xl font-medium">{description}</CardTitle>
      </CardHeader>

      <CardContent className="p-6">
        <p className="text-gray-600 text-sm mb-4">
          You'll be redirected to a secure Stripe checkout page to complete your {currency.toUpperCase()} {(amount/100).toFixed(2)} donation.
        </p>
      </CardContent>

      <CardFooter className="p-6 bg-gradient-to-r from-gray-50 to-gray-100 border-t">
        <Button
          onClick={handleStripeRedirect}
          disabled={isLoading}
          className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
        >
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Redirecting...</span>
            </div>
          ) : (
            `Pay ${(amount/100).toFixed(2)} ${currency.toUpperCase()}`
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default StripeCheckout;
