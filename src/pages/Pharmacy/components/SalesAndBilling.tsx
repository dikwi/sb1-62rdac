import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { fetchItems } from '../../../services/api';
import { Plus, Minus, ShoppingCart, Search } from 'lucide-react';

const SalesAndBilling: React.FC = () => {
  const { data: items } = useQuery('items', fetchItems);
  const [cart, setCart] = useState<Array<{ id: string; name: string; quantity: number; price: number }>>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'Medicine' | 'Supply'>('Medicine');

  const filteredItems = items?.filter((item: any) => 
    item.type === filterType && 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const addToCart = (item: any) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCart(cart.map(cartItem =>
        cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
      ));
    } else {
      setCart([...cart, { id: item.id, name: item.name, quantity: 1, price: item.price }]);
    }
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(id);
    } else {
      setCart(cart.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const total = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);

  const handleCheckout = () => {
    // Implement checkout logic
    console.log('Checkout:', cart);
  };

  return (
    <div className="flex">
      <div className="w-2/3 pr-4">
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setFilterType('Medicine')}
                className={`px-3 py-1 rounded-md ${
                  filterType === 'Medicine' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                }`}
              >
                Medicines
              </button>
              <button
                onClick={() => setFilterType('Supply')}
                className={`px-3 py-1 rounded-md ${
                  filterType === 'Supply' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                }`}
              >
                Supplies
              </button>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-md w-64"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {filteredItems.map((item: any) => (
            <div key={item.id} className="border p-4 rounded-md">
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-sm text-gray-600">{item.genericName}</p>
              <p>Price: ${item.price.toFixed(2)}</p>
              <p>Stock: {item.stock}</p>
              <button
                onClick={() => addToCart(item)}
                disabled={item.stock === 0}
                className={`mt-2 w-full px-2 py-1 rounded-md text-white ${
                  item.stock === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
                }`}
              >
                {item.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="w-1/3 pl-4 border-l">
        <h2 className="text-xl font-semibold mb-4">Shopping Cart</h2>
        {cart.map(item => (
          <div key={item.id} className="flex justify-between items-center mb-2 p-2 border rounded-md">
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-600">${item.price.toFixed(2)} each</p>
            </div>
            <div className="flex items-center">
              <button 
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="text-red-500 hover:text-red-700"
              >
                <Minus size={16} />
              </button>
              <span className="mx-2">{item.quantity}</span>
              <button 
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="text-green-500 hover:text-green-700"
              >
                <Plus size={16} />
              </button>
              <span className="ml-2 min-w-[80px] text-right">${(item.quantity * item.price).toFixed(2)}</span>
            </div>
          </div>
        ))}
        <div className="mt-4 border-t pt-4">
          <div className="flex justify-between font-semibold text-lg">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button
            onClick={handleCheckout}
            disabled={cart.length === 0}
            className={`mt-4 w-full py-2 rounded-md flex items-center justify-center ${
              cart.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
            } text-white`}
          >
            <ShoppingCart className="mr-2" size={20} />
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default SalesAndBilling;