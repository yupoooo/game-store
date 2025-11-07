
import React from 'react';
import MobileMockup from './components/MobileMockup';

const App: React.FC = () => {
    return (
        <main className="relative min-h-screen w-full bg-gradient-to-br from-[#08051c] via-[#0a0a2a] to-[#1d0b38] text-white overflow-hidden flex flex-col items-center justify-center p-4">
            {/* Decorative gradients and shapes */}
            <div className="absolute top-0 left-0 w-1/2 h-1/2 -translate-x-1/4 -translate-y-1/4 bg-purple-600/20 rounded-full filter blur-[150px] opacity-50"></div>
            <div className="absolute bottom-0 right-0 w-1/2 h-1/2 translate-x-1/4 translate-y-1/4 bg-cyan-400/20 rounded-full filter blur-[150px] opacity-50"></div>
            
            <div className="absolute top-[15%] right-[10%] w-[200px] h-[1px] bg-gradient-to-l from-purple-500 to-transparent"></div>
            <div className="absolute top-[15%] right-[10%] w-[1px] h-[100px] bg-gradient-to-b from-purple-500 to-transparent"></div>
            
            <div className="absolute bottom-[10%] right-[5%] text-cyan-400/30 text-4xl font-thin">+</div>
            <div className="absolute top-[20%] left-[5%] text-purple-500/20 text-xl font-thin">.</div>
            <div className="absolute bottom-[25%] left-[10%] text-cyan-400/20 text-3xl font-thin">.</div>


            <div className="relative z-10 flex flex-col items-center justify-center gap-8 w-full">
                {/* Top: Branding Text */}
                <div className="flex flex-col items-center text-center">
                    <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-widest" style={{ textShadow: '0 0 15px rgba(0, 255, 255, 0.7), 0 0 5px rgba(0, 255, 255, 0.9)' }}>
                        <span className="text-cyan-400">Game</span>
                        <span className="text-cyan-300"> SY</span>
                    </h1>
                    <p className="mt-2 text-lg md:text-2xl font-semibold text-white/90 tracking-wider">
                        THE ULTIMATE DIGITAL STORE IN SYRIA!
                    </p>
                </div>

                {/* Center: Mobile Mockup */}
                <div className="w-full max-w-sm">
                    <MobileMockup />
                </div>
            </div>
        </main>
    );
};

export default App;
