
import React, { useState, useRef, useEffect } from 'react';
import Chatbot from './Chatbot';
import { PRODUCT_CATEGORIES } from '../constants';
import GameItemButton from './GameItemButton';
import type { ProductCategory, Product, CartItem, View } from '../types';
import { ChevronLeftIcon, ShoppingCartIcon, TrashIcon, ChatBubbleLeftRightIcon, CheckCircleIcon } from './Icons';

// --- PROFILE BUTTON ---
const ProfileButton: React.FC<{ username: string; onLogout: () => void }> = ({ username, onLogout }) => (
    <button 
        onClick={onLogout} 
        title="Logout"
        className="w-7 h-7 bg-cyan-600 rounded-full flex items-center justify-center text-sm font-bold text-gray-900 ring-2 ring-cyan-400/80 hover:ring-cyan-300 transition-all"
    >
        {username.charAt(0).toUpperCase()}
    </button>
);


// --- SCREEN WRAPPER & HEADERS ---
interface ScreenHeaderProps {
    title: string;
    onBack?: () => void;
    cartCount?: number;
    onCartClick?: () => void;
    currentUser?: string | null;
    onLogout?: () => void;
    hideCart?: boolean;
}

const ScreenHeader: React.FC<ScreenHeaderProps> = ({ title, onBack, cartCount = 0, onCartClick, currentUser, onLogout, hideCart = false }) => (
    <header className="flex items-center justify-between p-4 border-b border-blue-800/50 shrink-0">
        <div className="w-12">
            {onBack && (
                <button onClick={onBack} className="p-1 rounded-full hover:bg-blue-800/70 transition-colors">
                    <ChevronLeftIcon className="w-6 h-6 text-cyan-400" />
                </button>
            )}
        </div>
         <h3 className="font-bold text-lg uppercase tracking-wider text-white/90 text-center whitespace-nowrap overflow-hidden text-ellipsis">{title}</h3>
        <div className="w-12 flex items-center justify-end space-x-3">
            {!hideCart && onCartClick && (
                 <button onClick={onCartClick} className="relative">
                    <ShoppingCartIcon className="w-6 h-6 text-cyan-400" />
                    {cartCount > 0 && (
                        <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
                            {cartCount}
                        </div>
                    )}
                </button>
            )}
             {currentUser && onLogout && (
                 <ProfileButton username={currentUser} onLogout={onLogout} />
            )}
        </div>
    </header>
);

// --- VIEWS / SCREENS ---
const LoginView: React.FC<{ onLogin: (username: string) => void }> = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLoginClick = () => {
        if (!username.trim() || !password.trim()) {
            setError('Please enter both username and password.');
            return;
        }
        setError('');
        setIsLoading(true);
        setTimeout(() => {
            onLogin(username);
        }, 1500);
    };

    return (
        <div className="p-4 flex flex-col justify-center h-full bg-gradient-to-b from-[#0d102d] to-[#150d34]">
             <h2 className="text-center text-4xl font-bold uppercase tracking-wider mt-6 mb-12" style={{ textShadow: '0 0 10px rgba(0, 255, 255, 0.6)' }}>
                <span className="text-cyan-400">Game</span>
                <span className="text-cyan-300"> SY</span>
            </h2>
            <div className="space-y-4">
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full bg-blue-900/50 border border-blue-700 rounded-lg px-4 py-3 text-white/90 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all placeholder:text-blue-300/50" />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-blue-900/50 border border-blue-700 rounded-lg px-4 py-3 text-white/90 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all placeholder:text-blue-300/50" />
            </div>
             {error && <p className="text-red-400 text-sm text-center mt-3">{error}</p>}
            <button 
                onClick={handleLoginClick}
                disabled={isLoading}
                className="w-full mt-8 bg-cyan-500 text-gray-900 font-bold py-3 rounded-lg transition-all duration-300 hover:bg-cyan-400 hover:shadow-[0_0_15px_rgba(0,255,255,0.4)] disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center"
            >
                {isLoading ? <div className="w-6 h-6 border-2 border-gray-900 border-t-transparent rounded-full animate-spin"></div> : 'Login'}
            </button>
        </div>
    );
};

const CategoryListView: React.FC<{ onSelectCategory: (category: ProductCategory) => void }> = ({ onSelectCategory }) => {
    return (
        <div className="p-4 flex flex-col">
            <div className="flex flex-col space-y-4 pt-4">
                {PRODUCT_CATEGORIES.map((item) => (
                    <GameItemButton key={item.id} icon={item.icon} name={item.name} onClick={() => onSelectCategory(item)} />
                ))}
            </div>
        </div>
    );
};

const ProductItem: React.FC<{ product: Product; onAddToCart: (product: Product) => void }> = ({ product, onAddToCart }) => {
    return (
        <div className="flex items-center justify-between p-3 bg-blue-900/30 border border-blue-800/50 rounded-lg">
            <div>
                <p className="font-semibold text-white/90">{product.name}</p>
                <p className="text-sm text-cyan-400/80">{product.price}</p>
            </div>
            <button
                onClick={() => onAddToCart(product)}
                className="px-3 py-1 text-sm font-bold text-cyan-900 bg-cyan-400 rounded-md transition-all duration-300 hover:bg-cyan-300 hover:shadow-[0_0_10px_rgba(0,255,255,0.4)] active:scale-95"
            >
                Add
            </button>
        </div>
    );
};


const ProductListView: React.FC<{ category: ProductCategory, onAddToCart: (product: Product) => void }> = ({ category, onAddToCart }) => {
    return (
        <main className="flex-grow p-4 overflow-y-auto">
            <div className="flex flex-col space-y-3">
                {category.products.map((product) => (
                    <ProductItem key={product.id} product={product} onAddToCart={onAddToCart} />
                ))}
            </div>
        </main>
    );
};

const CartView: React.FC<{ cart: CartItem[], onRemoveFromCart: (cartItemId: string) => void, onCheckout: () => void }> = ({ cart: cartProp, onRemoveFromCart, onCheckout }) => {
    const [localCart, setLocalCart] = useState(cartProp);
    const [exitingItems, setExitingItems] = useState<Record<string, boolean>>({});

    useEffect(() => {
        // Sync localCart with cart prop for ADDITIONS only.
        if (cartProp.length > localCart.length) {
            // Find the new items and add them.
            const newItems = cartProp.filter(pItem => !localCart.some(lItem => lItem.cartItemId === pItem.cartItemId));
            setLocalCart(prev => [...prev, ...newItems]);
        }
        // Removals are handled by `handleRemoveWithAnimation`.
    }, [cartProp, localCart]);


    const handleRemoveWithAnimation = (cartItemId: string) => {
        // Trigger exit animation
        setExitingItems(prev => ({ ...prev, [cartItemId]: true }));
        
        // Remove from state after animation
        setTimeout(() => {
            onRemoveFromCart(cartItemId);
            setLocalCart(prev => prev.filter(item => item.cartItemId !== cartItemId));
            // No need to clean up exitingItems state, as the whole component will re-render without the item
        }, 300); // Animation duration
    };

    const totalPrice = cartProp.reduce((total, item) => {
        return total + parseFloat(item.price.replace('$', ''));
    }, 0).toFixed(2);
    
    return (
         <main className="flex-grow p-4 overflow-y-auto flex flex-col">
            {localCart.length === 0 ? (
                 <div className="flex-grow flex flex-col items-center justify-center text-center text-blue-300/70">
                    <ShoppingCartIcon className="w-16 h-16 mb-4"/>
                    <h4 className="font-bold text-xl">Your Cart is Empty</h4>
                    <p className="text-sm max-w-xs">Looks like you haven't added anything to your cart yet.</p>
                </div>
            ) : (
                <>
                    <div className="flex flex-col space-y-3 flex-grow">
                        {localCart.map((item) => (
                             <div 
                                key={item.cartItemId} 
                                className={`flex items-center justify-between p-3 bg-blue-900/30 border border-blue-800/50 rounded-lg ${exitingItems[item.cartItemId] ? 'animate-fadeOut' : 'animate-fadeIn'}`}
                            >
                                <div>
                                    <p className="font-semibold text-white/90">{item.name}</p>
                                    <p className="text-sm text-cyan-400/80">{item.price}</p>
                                </div>
                                <button
                                    onClick={() => handleRemoveWithAnimation(item.cartItemId)}
                                    disabled={Object.values(exitingItems).some(v => v)}
                                    className="p-2 text-red-400 rounded-md transition-all duration-300 hover:bg-red-500/20 disabled:opacity-50"
                                >
                                    <TrashIcon className="w-5 h-5" />
                                </button>
                            </div>
                        ))}
                    </div>
                     <div className="pt-4 mt-4 border-t border-blue-800/50">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-lg font-semibold text-white/80">Total:</span>
                            <span className="text-2xl font-bold text-cyan-400">${totalPrice}</span>
                        </div>
                        <button onClick={onCheckout} className="w-full bg-cyan-500 text-gray-900 font-bold py-3 rounded-lg transition-all duration-300 hover:bg-cyan-400 hover:shadow-[0_0_15px_rgba(0,255,255,0.4)]">
                            Proceed to Checkout
                        </button>
                    </div>
                </>
            )}
         </main>
    );
};

const CheckoutView: React.FC<{ cart: CartItem[], playerId: string, setPlayerId: (id: string) => void, onConfirmOrder: () => void }> = ({ cart, playerId, setPlayerId, onConfirmOrder }) => {
     const totalPrice = cart.reduce((total, item) => {
        return total + parseFloat(item.price.replace('$', ''));
    }, 0).toFixed(2);

    return (
        <main className="flex-grow p-4 overflow-y-auto flex flex-col justify-between">
            <div>
                 <h4 className="font-bold text-xl text-white/90 mb-2">Order Summary</h4>
                 <div className="space-y-2 max-h-40 overflow-y-auto pr-2 mb-4 border-b border-blue-800/50 pb-4">
                     {cart.map(item => (
                         <div key={item.cartItemId} className="flex justify-between text-sm">
                             <span className="text-white/80">{item.name}</span>
                             <span className="text-cyan-400/90">{item.price}</span>
                         </div>
                     ))}
                 </div>
                 <div className="flex justify-between items-center mb-6">
                    <span className="text-lg font-semibold text-white/80">Total:</span>
                    <span className="text-2xl font-bold text-cyan-400">${totalPrice}</span>
                </div>
                
                <h4 className="font-bold text-xl text-white/90 mb-4">Delivery Information</h4>
                <div className="space-y-2">
                    <label htmlFor="playerId" className="text-sm font-semibold text-blue-200/80">Player ID / In-Game Username</label>
                    <input 
                        id="playerId"
                        type="text" 
                        placeholder="e.g., 5123456789" 
                        value={playerId}
                        onChange={(e) => setPlayerId(e.target.value)}
                        className="w-full bg-blue-900/50 border border-blue-700 rounded-lg px-4 py-3 text-white/90 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all placeholder:text-blue-300/50" 
                    />
                </div>
            </div>

            <button onClick={onConfirmOrder} className="w-full mt-6 bg-cyan-500 text-gray-900 font-bold py-3 rounded-lg transition-all duration-300 hover:bg-cyan-400 hover:shadow-[0_0_15px_rgba(0,255,255,0.4)]">
                Confirm & Pay via WhatsApp
            </button>
        </main>
    );
};

const ConfirmationView: React.FC<{ onNewOrder: () => void }> = ({ onNewOrder }) => {
    return (
        <main className="flex-grow p-4 overflow-y-auto flex flex-col items-center justify-center text-center">
            <CheckCircleIcon className="w-24 h-24 text-cyan-400 mb-6" />
            <h2 className="text-2xl font-bold text-white/90 mb-2">Order Sent!</h2>
            <p className="text-blue-200/80 max-w-xs mb-8">
                Your order details have been sent. Please complete the payment in WhatsApp to receive your items.
            </p>
            <button onClick={onNewOrder} className="w-full bg-cyan-500 text-gray-900 font-bold py-3 rounded-lg transition-all duration-300 hover:bg-cyan-400 hover:shadow-[0_0_15px_rgba(0,255,255,0.4)]">
                Start New Order
            </button>
        </main>
    )
}


// --- MAIN COMPONENT ---
const MobileMockup: React.FC = () => {
    const [view, setView] = useState<View>('login');
    const [currentUser, setCurrentUser] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<ProductCategory | null>(null);
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isGlobalChatOpen, setIsGlobalChatOpen] = useState(false);
    const [playerId, setPlayerId] = useState('');

    // Effect for LOADING state from localStorage on initial mount
    useEffect(() => {
        try {
            const savedStateJSON = localStorage.getItem('gameSyState');
            if (savedStateJSON) {
                const savedState = JSON.parse(savedStateJSON);
                if (savedState.currentUser) {
                    setCurrentUser(savedState.currentUser);
                    setCart(savedState.cart || []);
                    setView(savedState.view || 'categories');
                    setSelectedCategory(savedState.selectedCategory || null);
                    setPlayerId(savedState.playerId || '');
                }
            }
        } catch (error) {
            console.error("Failed to load state from localStorage", error);
            localStorage.removeItem('gameSyState'); // Clear corrupted state
        }
    }, []);

    // Effect for SAVING state to localStorage whenever it changes
    useEffect(() => {
        try {
            if (currentUser) { // Only save state if a user is logged in
                const stateToSave = {
                    currentUser,
                    cart,
                    view,
                    selectedCategory,
                    playerId,
                };
                localStorage.setItem('gameSyState', JSON.stringify(stateToSave));
            }
        } catch (error) {
            console.error("Failed to save state to localStorage", error);
        }
    }, [currentUser, cart, view, selectedCategory, playerId]);


    const handleLogin = (username: string) => {
        setCurrentUser(username);
        setView('categories');
    };

    const handleLogout = () => {
        localStorage.removeItem('gameSyState');
        setCurrentUser(null);
        setCart([]);
        setSelectedCategory(null);
        setPlayerId('');
        setView('login');
    };

    const handleSelectCategory = (category: ProductCategory) => {
        setSelectedCategory(category);
        setView('products');
    };

    const handleAddToCart = (product: Product) => {
        const newCartItem: CartItem = {
            ...product,
            cartItemId: `${product.id}-${Date.now()}`
        };
        setCart(prevCart => [...prevCart, newCartItem]);
    };

    const handleRemoveFromCart = (cartItemId: string) => {
        setCart(prevCart => prevCart.filter(item => item.cartItemId !== cartItemId));
    };

    const handleConfirmOrder = () => {
        if (!playerId.trim()) {
            alert("Please enter your Player ID.");
            return;
        }

        const totalPrice = cart.reduce((total, item) => {
            return total + parseFloat(item.price.replace('$', ''));
        }, 0).toFixed(2);

        const orderDetails = cart.map(item => `- ${item.name} (${item.price})`).join('\n');

        const message = `Hello Game SY, I would like to place an order:\n\n*Items:*\n${orderDetails}\n\n*Total Price:* $${totalPrice}\n\n*Player ID:* ${playerId}\n\nThank you!`;

        const whatsappNumber = "963945328146"; // Syria country code + number
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

        window.open(whatsappUrl, '_blank');
        setView('confirmation');
    };

    const handleNewOrder = () => {
        setCart([]);
        setPlayerId('');
        setSelectedCategory(null);
        setView('categories');
    }

    const renderContent = () => {
        switch (view) {
            case 'login':
                return <LoginView onLogin={handleLogin} />;
            case 'categories':
                return (
                    <div className="flex flex-col h-full">
                        <ScreenHeader title="Categories" cartCount={cart.length} onCartClick={() => setView('cart')} currentUser={currentUser} onLogout={handleLogout} />
                        <CategoryListView onSelectCategory={handleSelectCategory} />
                    </div>
                );
            case 'products':
                if (!selectedCategory) return null; // Should not happen
                return (
                    <div className="flex flex-col h-full">
                        <ScreenHeader title={selectedCategory.name} onBack={() => setView('categories')} cartCount={cart.length} onCartClick={() => setView('cart')} currentUser={currentUser} onLogout={handleLogout} />
                        <ProductListView category={selectedCategory} onAddToCart={handleAddToCart} />
                    </div>
                );
            case 'cart':
                return (
                    <div className="flex flex-col h-full relative">
                        <ScreenHeader title="Your Cart" onBack={() => setView(selectedCategory ? 'products' : 'categories')} currentUser={currentUser} onLogout={handleLogout} hideCart />
                        <CartView cart={cart} onRemoveFromCart={handleRemoveFromCart} onCheckout={() => setView('checkout')} />
                    </div>
                );
            case 'checkout':
                return (
                     <div className="flex flex-col h-full">
                        <ScreenHeader title="Checkout" onBack={() => setView('cart')} currentUser={currentUser} onLogout={handleLogout} hideCart />
                        <CheckoutView cart={cart} playerId={playerId} setPlayerId={setPlayerId} onConfirmOrder={handleConfirmOrder} />
                    </div>
                );
            case 'confirmation':
                 return (
                     <div className="flex flex-col h-full">
                        <ScreenHeader title="Order Placed" currentUser={currentUser} onLogout={handleLogout} hideCart />
                        <ConfirmationView onNewOrder={handleNewOrder} />
                    </div>
                );
        }
    };

    return (
        <div className="relative mx-auto border-gray-800 bg-gray-900/80 border-[8px] rounded-[2.5rem] h-[600px] w-[300px] shadow-2xl shadow-cyan-500/10 backdrop-blur-sm">
            <div className="w-[140px] h-[18px] bg-gray-900 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
            <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[11px] top-[72px] rounded-s-lg"></div>
            <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[11px] top-[124px] rounded-s-lg"></div>
            <div className="h-[64px] w-[3px] bg-gray-800 absolute -end-[11px] top-[142px] rounded-e-lg"></div>
            <div className="rounded-[2rem] overflow-hidden w-full h-full bg-[#0d102d] relative">
                {renderContent()}
                
                {isGlobalChatOpen && (
                    <Chatbot 
                        cart={cart}
                        currentView={view}
                        selectedCategory={selectedCategory}
                        onClose={() => setIsGlobalChatOpen(false)} 
                    />
                )}
            </div>
             {/* Global Chat Button */}
            {currentUser && !isGlobalChatOpen && view !== 'confirmation' && view !== 'checkout' && (
                 <button onClick={() => setIsGlobalChatOpen(true)} className="absolute bottom-6 right-3 w-14 h-14 bg-cyan-500 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/30 hover:bg-cyan-400 transition-all active:scale-95 z-10 animate-pulse">
                     <ChatBubbleLeftRightIcon className="w-8 h-8 text-gray-900"/>
                 </button>
            )}
        </div>
    );
};

export default MobileMockup;
