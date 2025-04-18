import React, { useState, useEffect } from "react";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import { RazorpayPayment } from "../../utils/RazorpayService";
import { IndianRupee, ShoppingBag, Trash2, Plus, Minus, Gift, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

const CartPage: React.FC = () => {
  const [cart, setCart] = useState<Product[]>([]);
  const [giftCardCode, setGiftCardCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [discountApplied, setDiscountApplied] = useState(false);
  const [invalidCode, setInvalidCode] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  useEffect(() => {
    const cartData = JSON.parse(sessionStorage.getItem("cart") || "[]");
    setCart(cartData);
  }, []);

  const updateQuantity = (id: number, change: number) => {
    const updatedCart = cart
      .map((item) => {
        if (item.id === id) {
          const newQuantity = item.quantity + change;
          if (newQuantity >= 0 && newQuantity <= 50) {
            return { ...item, quantity: newQuantity };
          }
          return item;
        }
        return item;
      })
      .filter((item) => item.quantity > 0);
    setCart(updatedCart);
    sessionStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const applyGiftCard = () => {
    const validCodes: Record<string, number> = {
      DHRUV: 10,
      DEV: 5,
      CARTIFYECOMMERCE: 15,
      NEWUSER: 10,
    };

    if (validCodes[giftCardCode]) {
      setDiscount(validCodes[giftCardCode]);
      setDiscountApplied(true);
      setInvalidCode(false);
    } else {
      setInvalidCode(true);
      setDiscount(0);
      setDiscountApplied(false);
    }
  };

  const removeGiftCard = () => {
    setGiftCardCode("");
    setDiscount(0);
    setDiscountApplied(false);
    setInvalidCode(false);
  };

  const subtotal = cart
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const grandTotal = parseFloat(subtotal);
  const deliveryCharge = cart.length === 0 || grandTotal >= 500 ? 0 : 50;
  const discountAmount = (grandTotal * discount) / 100;
  const totalWithDeliveryAndDiscount =
    grandTotal + deliveryCharge - discountAmount;

  const handleCheckout = async () => {
    setPaymentError(null);

    await RazorpayPayment(
      totalWithDeliveryAndDiscount,
      "INR",
      (paymentId: unknown) => {
        alert(`Payment successful! ID: ${paymentId}`);

        sessionStorage.removeItem("cart");
        setCart([]);
      },
      (error: React.SetStateAction<string | null>) => {
        setPaymentError(error);
      }
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-white to-indigo-50">
      <Navbar cartCount={cartCount} />

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div className="p-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-8 flex items-center">
                <ShoppingBag className="mr-3 h-8 w-8 text-indigo-600" />
                Your Shopping Cart
                <span className="text-indigo-600 ml-3 text-2xl">
                  ({cart.length} {cart.length === 1 ? "item" : "items"})
                </span>
              </h1>

              {paymentError && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r-lg">
                  <div className="flex">
                    <div className="ml-3">
                      <p className="text-sm text-red-700">{paymentError}</p>
                    </div>
                  </div>
                </div>
              )}

              {cart.length === 0 ? (
                <div className="text-center py-16 bg-gradient-to-b from-gray-50 to-white rounded-xl border border-gray-100">
                  <div className="mx-auto h-32 w-32 text-gray-400">
                    <ShoppingBag className="w-full h-full" />
                  </div>
                  <h3 className="mt-6 text-2xl font-semibold text-gray-900">
                    Your cart is empty
                  </h3>
                  <p className="mt-2 text-gray-500 text-lg">
                    Start adding some amazing products!
                  </p>
                  <div className="mt-8">
                    <Link
                      to="/"
                      className="inline-flex items-center px-6 py-3 border border-transparent rounded-full shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
                    >
                      Continue Shopping
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="space-y-8">
                  <div className="divide-y divide-gray-200">
                    {cart.map(({ id, title, price, image, quantity }) => (
                      <div 
                        key={id}
                        className="py-8 flex flex-col sm:flex-row hover:bg-gray-50 transition-colors duration-200 rounded-lg px-4 group"
                      >
                        <div className="flex-shrink-0 mb-4 sm:mb-0">
                          <div className="w-40 h-40 rounded-xl p-4 bg-white shadow-sm group-hover:shadow-md transition-shadow">
                            <img
                              src={image}
                              alt={title}
                              className="w-full h-full object-contain"
                            />
                          </div>
                        </div>

                        <div className="ml-0 sm:ml-8 flex-1 flex flex-col">
                          <div className="flex-1">
                            <h2 className="text-xl font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                              {title}
                            </h2>
                            <p className="mt-2 text-xl font-medium text-indigo-600 flex items-center">
                              <IndianRupee size={20} />
                              {(price).toFixed(2)}
                            </p>
                          </div>

                          <div className="mt-6 flex items-center justify-between">
                            {quantity === 5 && (
                              <p className="text-sm text-red-500 font-medium">
                                Maximum quantity reached
                              </p>
                            )}

                            <div className="flex items-center space-x-6">
                              <div className="inline-flex items-center border-2 border-gray-200 rounded-full shadow-sm">
                                <button
                                  onClick={() => updateQuantity(id, -1)}
                                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-l-full transition-colors"
                                >
                                  <Minus size={18} />
                                </button>
                                <span className="px-4 py-2 border-x border-gray-200 text-center w-12 font-medium">
                                  {quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(id, 1)}
                                  className={`p-2 rounded-r-full transition-colors ${
                                    quantity === 5
                                      ? "text-gray-400 cursor-not-allowed"
                                      : "text-gray-600 hover:bg-gray-100"
                                  }`}
                                  disabled={quantity === 5}
                                >
                                  <Plus size={18} />
                                </button>
                              </div>

                              <button
                                onClick={() => updateQuantity(id, -quantity)}
                                className="flex items-center text-red-600 hover:text-red-500 transition-colors"
                              >
                                <Trash2 size={18} className="mr-1" />
                                <span className="font-medium">Remove</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-200 pt-8">
                    <div className="space-y-6">
                      <div className="flex justify-between text-lg font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p className="flex items-center">
                          <IndianRupee size={20} />
                          {subtotal}
                        </p>
                      </div>

                      <div className="flex justify-between">
                        <p className="text-gray-600">Delivery</p>
                        <p className={`${deliveryCharge === 0 ? "text-green-600" : "text-gray-900"}`}>
                          {deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge}`}
                        </p>
                      </div>

                      {discountApplied && (
                        <div className="flex justify-between">
                          <p className="text-gray-600">
                            Discount ({discount}%)
                          </p>
                          <p className="text-green-600 flex items-center">
                            -<IndianRupee size={20} />
                            {discountAmount.toFixed(2)}
                          </p>
                        </div>
                      )}

                      <div className="mt-6">
                        {discountApplied ? (
                          <div className="flex items-center justify-between bg-green-50 p-4 rounded-xl border border-green-100">
                            <div className="flex items-center">
                              <Gift className="h-5 w-5 text-green-500 mr-2" />
                              <p className="font-medium text-green-800">
                                Gift card applied ({discount}% off)
                              </p>
                            </div>
                            <button
                              onClick={removeGiftCard}
                              className="text-red-600 hover:text-red-500 font-medium"
                            >
                              Remove
                            </button>
                          </div>
                        ) : (
                          <div>
                            <label
                              htmlFor="gift-card"
                              className="block text-sm font-medium text-gray-700 mb-2"
                            >
                              Gift card or discount code
                            </label>
                            <div className="flex">
                              <input
                                type="text"
                                id="gift-card"
                                placeholder="Enter Code"
                                value={giftCardCode}
                                onChange={(e) => setGiftCardCode(e.target.value)}
                                className="block w-full p-3 rounded-l-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                              />
                              <button
                                onClick={applyGiftCard}
                                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-r-xl shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                              >
                                Apply
                              </button>
                            </div>
                            {invalidCode && (
                              <p className="mt-2 text-sm text-red-600">
                                Invalid gift card code
                              </p>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="flex justify-between text-xl font-bold text-gray-900 pt-6 border-t border-gray-200">
                        <p>Total</p>
                        <p className="flex items-center">
                          <IndianRupee size={24} />
                          {totalWithDeliveryAndDiscount.toFixed(2)}
                        </p>
                      </div>

                      <div className="mt-8">
                        <button
                          onClick={handleCheckout}
                          className="w-full flex justify-center items-center px-8 py-4 border border-transparent rounded-xl shadow-sm text-lg font-medium text-white bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={cart.length === 0}
                        >
                          Proceed to Checkout
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </button>
                      </div>

                      <div className="mt-6 text-center">
                        <Link
                          to="/"
                          className="text-indigo-600 hover:text-indigo-500 font-medium inline-flex items-center"
                        >
                          <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
                          Continue Shopping
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CartPage;
