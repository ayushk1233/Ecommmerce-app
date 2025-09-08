'use client';

interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CartSummaryProps {
  items: CartItem[];
  total: number;
}

export default function CartSummary({ items, total }: CartSummaryProps) {
  const shipping = total > 50 ? 0 : 9.99;
  const tax = total * 0.08; // 8% tax
  const finalTotal = total + shipping + tax;

  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
      
      <div className="space-y-3">
        <div className="flex justify-between">
          <span>Subtotal ({items.length} items)</span>
          <span>₹{total.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between">
          <span>Shipping</span>
          <span className={shipping === 0 ? 'text-green-600' : ''}>
            {shipping === 0 ? 'FREE' : `₹${shipping.toFixed(2)}`}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span>Tax</span>
          <span>₹{tax.toFixed(2)}</span>
        </div>
        
        {shipping > 0 && (
          <div className="text-sm text-gray-600 bg-blue-50 p-2 rounded">
            💡 Add ₹{(50 - total).toFixed(2)} more to get free shipping!
          </div>
        )}
        
        <hr />
        
        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>
          <span>₹{finalTotal.toFixed(2)}</span>
        </div>
      </div>
      
      <button className="w-full mt-4 bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors font-semibold">
        Proceed to Checkout
      </button>
      
      <p className="text-xs text-gray-500 mt-2 text-center">
        Secure checkout with SSL encryption
      </p>
    </div>
  );
}