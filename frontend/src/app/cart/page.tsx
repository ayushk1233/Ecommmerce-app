'use client';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import axios from '@/lib/axios';
import { useAuth } from '@/contexts/AuthContext';

interface CartItem {
  _id: string;
  productId: {
    _id: string;
    name: string;
    price: number;
    image: string;
  };
  quantity: number;
}

interface Cart {
  _id: string;
  items: CartItem[];
}

export default function CartPage() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const router = useRouter();

  const fetchCart = useCallback(async () => {
    try {
      const response = await axios.get('/cart');
      
      // Filter out any items where the product is null (deleted products)
      const validItems = response.data.items.filter((item: CartItem) => item.productId != null);
      
      // If some items were filtered out, show a message to the user
      if (validItems.length < response.data.items.length) {
        alert('Some products in your cart are no longer available and have been removed.');
      }
      
      setCart({ ...response.data, items: validItems });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching cart:', error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    fetchCart();
  }, [user, router, fetchCart]);

  const removeFromCart = useCallback(async (productId: string) => {
    try {
      const response = await axios.delete(`/cart/remove/${productId}`);
      setCart(response.data);
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  }, []);

  const updateQuantity = useCallback(async (productId: string, newQuantity: number) => {
    try {
      const response = await axios.put(`/cart/update/${productId}`, { quantity: newQuantity });
      setCart(response.data);
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  }, []);

  const getTotalPrice = () => {
    if (!cart) return 0;
    return cart.items.reduce((total, item) => {
      return total + ((item.productId?.price || 0) * item.quantity);
    }, 0).toFixed(2);
  };

  if (loading) {
    return <div className="text-center">Loading cart...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Your Shopping Cart</h1>
      
      {!cart || cart.items.length === 0 ? (
        <div className="text-center bg-white p-8 rounded-lg shadow-md">
          <p className="text-gray-700 mb-4">Your cart is empty</p>
          <button
            onClick={() => router.push('/')}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6">
            {cart.items.map((item) => (
              <div key={item._id} className="flex items-center justify-between border-b py-4 last:border-b-0">
                <div className="flex items-center space-x-4">
                  {item.productId ? (
                    <>
                      <Image
                        src={item.productId.image || '/placeholder-product.jpg'}
                        alt={item.productId.name}
                        width={64}
                        height={64}
                        className="w-16 h-16 object-cover rounded"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/placeholder-product.jpg';
                        }}
                      />
                      <div>
                        <h3 className="font-semibold text-gray-900">{item.productId.name}</h3>
                        <p className="text-gray-800 font-medium">₹{item.productId.price}</p>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center">
                        <span className="text-gray-400">N/A</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-400">Product Not Available</h3>
                        <p className="text-gray-400">Item may have been removed</p>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center space-x-4">
                  {item.productId ? (
                    <>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.productId._id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="bg-gray-200 text-gray-900 px-2 py-1 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          -
                        </button>
                        <span className="px-3 py-1 border rounded text-gray-900 font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.productId._id, item.quantity + 1)}
                          className="bg-gray-200 text-gray-900 px-2 py-1 rounded hover:bg-gray-300"
                        >
                          +
                        </button>
                      </div>
                      
                      <div className="text-right">
                        <p className="font-semibold">
                          ₹{(item.productId.price * item.quantity).toFixed(2)}
                        </p>
                        <button
                          onClick={() => removeFromCart(item.productId._id)}
                          className="text-red-500 text-sm hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="text-right">
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="text-red-500 text-sm hover:text-red-700"
                      >
                        Remove Unavailable Item
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            <div className="mt-6 pt-6 border-t">
              <div className="flex justify-between items-center">
                <span className="text-xl font-semibold text-gray-900">Total: ₹{getTotalPrice()}</span>
                <div className="space-x-4">
                  <button
                    onClick={() => router.push('/')}
                    className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
                  >
                    Continue Shopping
                  </button>
                  <button
                    onClick={() => alert('Checkout functionality not implemented')}
                    className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}