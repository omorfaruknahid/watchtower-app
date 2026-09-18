import React from 'react';
import StopWatch from './components/StopWatch';
import Timer from './components/Timer';

const App = () => {
  return (
    <div className="relative min-h-screen bg-[#06080e] text-slate-100 font-sans flex flex-col items-center justify-center p-6 overflow-hidden">
      
      {/* 1. Deep Dark Slate Base */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#070a12] to-[#030408]" />

      {/* 2. Vibrant Electric Neon Flares (Glow Effects) */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-amber-500/25 rounded-full blur-[110px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/3 right-1/4 translate-x-1/2 translate-y-1/2 w-80 h-80 bg-emerald-500/25 rounded-full blur-[110px] pointer-events-none animate-pulse" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* 3. Subtle Rock Grid Texture */}
      <div 
        className="absolute inset-0 opacity-[0.12] pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 50%, rgba(255,255,255,0.15) 1px, transparent 1px),
            linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px, 36px 36px, 36px 36px',
        }}
      />

      {/* Main Content Layer */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-5xl">
        
        {/* Vibrant Gradient Title */}
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-emerald-300 to-cyan-400 mb-10 drop-shadow-[0_0_30px_rgba(52,211,153,0.3)] text-center">
          Watch Tower
        </h1>

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl items-center justify-items-center">
          <StopWatch />
          <Timer />
        </div>

      </div>

    </div>
  );
};

export default App;