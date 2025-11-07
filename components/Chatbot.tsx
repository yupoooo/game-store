import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Chat } from "@google/genai";
import type { CartItem, View, ProductCategory } from '../types';
import { PaperAirplaneIcon, XMarkIcon } from './Icons';

interface ChatbotProps {
    cart: CartItem[];
    currentView: View;
    selectedCategory: ProductCategory | null;
    onClose: () => void;
}

const Chatbot: React.FC<ChatbotProps> = ({ cart, currentView, selectedCategory, onClose }) => {
    const [messages, setMessages] = useState<{ role: 'user' | 'model', text: string }[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatRef = useRef<Chat | null>(null);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const cartItemsDescription = cart.map(item => `${item.name} (${item.price})`).join(', ');

        let contextDescription = "The user is browsing the main product categories.";
        if (currentView === 'products' && selectedCategory) {
            contextDescription = `The user is currently viewing products in the '${selectedCategory.name}' category.`;
        } else if (currentView === 'cart') {
            contextDescription = "The user is currently in their shopping cart.";
        }

        const systemInstruction = `You are a friendly and helpful shopping assistant for Game SY, a digital store. ${contextDescription} Here are the items in the user's cart: ${cartItemsDescription || 'The cart is empty'}. Help them with any questions they have about their items, payment, or other products available in the store. Keep your answers concise and helpful.`;

        chatRef.current = ai.chats.create({
            model: 'gemini-2.5-flash',
            config: {
                systemInstruction,
            },
        });

        // Initial message from bot
        setMessages([{ role: 'model', text: 'Hello! How can I help you today?' }]);
    }, [cart, currentView, selectedCategory]);

     useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading || !chatRef.current) return;

        const userMessage = { role: 'user' as const, text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const responseStream = await chatRef.current.sendMessageStream({ message: input });
            let modelResponse = '';
            setMessages(prev => [...prev, { role: 'model', text: '' }]);

            for await (const chunk of responseStream) {
                modelResponse += chunk.text;
                setMessages(prev => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1].text = modelResponse;
                    return newMessages;
                });
            }
        } catch (error) {
            console.error("Gemini API error:", error);
            setMessages(prev => [...prev, { role: 'model', text: "Sorry, I'm having trouble connecting. Please try again later." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-md flex flex-col z-20 rounded-[1.8rem]">
            <header className="p-4 border-b border-blue-800/50 flex items-center justify-between shrink-0">
                 <h4 className="font-bold text-white/90">Support Assistant</h4>
                 <button onClick={onClose} className="p-1.5 rounded-full bg-red-500/80 hover:bg-red-500">
                    <XMarkIcon className="w-5 h-5 text-white"/>
                </button>
            </header>
            <div className="flex-grow p-4 overflow-y-auto space-y-4">
                 {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] p-3 rounded-2xl text-white/90 ${msg.role === 'user' ? 'bg-cyan-600/50 rounded-br-none' : 'bg-blue-800/60 rounded-bl-none'}`}>
                           {msg.text}
                        </div>
                    </div>
                ))}
                {isLoading && messages[messages.length-1].role === 'user' && (
                     <div className="flex justify-start">
                        <div className="max-w-[80%] p-3 rounded-2xl bg-blue-800/60 rounded-bl-none text-white/90">
                           <div className="flex items-center space-x-2">
                                <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
                                <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-150"></span>
                                <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-300"></span>
                           </div>
                        </div>
                    </div>
                )}
                 <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSendMessage} className="p-4 border-t border-blue-800/50 shrink-0">
                <div className="flex items-center space-x-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask a question..."
                        className="w-full bg-blue-900/50 border border-blue-700 rounded-full px-4 py-2 text-white/90 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
                        disabled={isLoading}
                    />
                    <button type="submit" className="p-2.5 bg-cyan-500 rounded-full disabled:bg-gray-600 hover:bg-cyan-400 transition-colors">
                        <PaperAirplaneIcon className="w-5 h-5 text-gray-900"/>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Chatbot;
