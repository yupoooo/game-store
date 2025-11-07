import React from 'react';
import { ChevronRightIcon } from './Icons';

interface GameItemButtonProps {
    icon: React.ElementType;
    name: string;
    onClick: () => void;
}

const GameItemButton: React.FC<GameItemButtonProps> = ({ icon: Icon, name, onClick }) => {
    return (
        <button onClick={onClick} className="group w-full flex items-center justify-between p-3 bg-blue-900/50 border border-blue-700 rounded-lg transition-all duration-300 hover:bg-blue-800/70 hover:shadow-[0_0_15px_rgba(0,255,255,0.3)] hover:border-cyan-400/50">
            <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-[#0d102d] flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                </div>
                <span className="font-semibold tracking-wide text-white/90">{name}</span>
            </div>
            <ChevronRightIcon className="w-5 h-5 text-blue-400 group-hover:text-cyan-300 transition-colors" />
        </button>
    );
};

export default GameItemButton;
