import React, { useState } from 'react';
import { ShoppingCart as CartIcon, User } from 'lucide-react';
import { ProductCard } from './components/ProductCard';
import { Cart } from './components/Cart';
import { OrderSummary } from './components/OrderSummary';
import { LandingPage } from './components/LandingPage';
import { SignIn } from './components/SignIn';
import { Payment } from './components/Payment';
import { MyOrders } from './components/MyOrders';
import { products } from './data/products';
import { CartItem, Product } from './types';

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showMyOrders, setShowMyOrders] = useState(false);

  const addToCart = (product: Product) => {
    setCartItems(items => {
      const existingItem = items.find(item => item.product.id === product.id);
      if (existingItem) {
        return items.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...items, { product, quantity: 1 }];
    });
    setShowCart(true);
  };

  const updateQuantity = (productId: number, quantity: number) => {
    setCartItems(items =>
      items.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const removeItem = (productId: number) => {
    setCartItems(items => items.filter(item => item.product.id !== productId));
  };

  const handleCheckout = () => {
    setShowCart(false);
    setShowPayment(true);
  };

  const handlePaymentComplete = () => {
    setShowPayment(false);
    setShowOrderSummary(true);
  };

  const handleContinueShopping = () => {
    setShowOrderSummary(false);
    setCartItems([]);
    setShowProducts(true);
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const processingFees = cartItems.reduce((sum, item) => sum + item.product.processingFee * item.quantity, 0);
  const shippingFees = cartItems.reduce((sum, item) => sum + item.product.shippingFee, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + processingFees + shippingFees + tax;

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 
            onClick={() => {
              setShowProducts(false);
              setShowMyOrders(false);
            }} 
            className="text-2xl font-bold text-gray-900 cursor-pointer"
          >
            Best Buy Shop
          </h1>
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                setShowProducts(true);
                setShowMyOrders(false);
              }}
              className="text-gray-600 hover:text-gray-900"
            >
              Shop
            </button>
            <button
              onClick={() => {
                setShowMyOrders(true);
                setShowProducts(false);
              }}
              className="text-gray-600 hover:text-gray-900"
            >
              My Orders
            </button>
            <button
              onClick={() => setShowSignIn(true)}
              className="text-gray-600 hover:text-gray-900"
            >
              <User size={24} />
            </button>
            <button
              onClick={() => setShowCart(true)}
              className="relative p-2 text-gray-600 hover:text-gray-900"
            >
              <CartIcon size={24} />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {showMyOrders ? (
          <MyOrders />
        ) : showOrderSummary ? (
          <OrderSummary
            order={{
              items: cartItems,
              subtotal,
              tax,
              shipping: shippingFees,
              processingFees,
              total
            }}
            onContinueShopping={handleContinueShopping}
          />
        ) : showProducts ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        ) : (
          <LandingPage />
        )}
      </main>

      {showCart && (
        <Cart
          items={cartItems}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeItem}
          onCheckout={handleCheckout}
          onClose={() => setShowCart(false)}
        />
      )}

      {showSignIn && (
        <SignIn onClose={() => setShowSignIn(false)} />
      )}

      {showPayment && (
        <Payment
          items={cartItems}
          subtotal={subtotal}
          tax={tax}
          shipping={shippingFees}
          processingFees={processingFees}
          total={total}
          onClose={() => setShowPayment(false)}
          onComplete={handlePaymentComplete}
        />
      )}
    </div>
  );
}

export default App;