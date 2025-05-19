
import React from 'react';

const PaymentOptions: React.FC = () => {
  return (
    <div>
      <h4 className="font-medium text-lg mb-4">Payment options</h4>
      <div className="flex flex-wrap gap-3">
        <img src="https://www.contiki.com/assets/images/footer/visa.svg" alt="Visa" className="h-10" />
        <img src="https://www.contiki.com/assets/images/footer/mastercard.svg" alt="Mastercard" className="h-10" />
        <img src="https://www.contiki.com/assets/images/footer/amex.svg" alt="American Express" className="h-10" />
        <img src="https://www.contiki.com/assets/images/footer/paypal.svg" alt="PayPal" className="h-10" />
      </div>
    </div>
  );
};

export default PaymentOptions;
