import React, { useState, useRef, useEffect } from 'react';

const StopWatch = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [isStopped, setIsStopped] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  const startTimeRef = useRef(0);
  const intervalIDRef = useRef(null);

  const handleStart = () => {
    setIsRunning(true);
    setIsStopped(false);
    startTimeRef.current = Date.now() - elapsedTime;
  };

  const handleStop = () => {
    if (isRunning) {
      setIsRunning(false);
      setIsStopped(true);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsStopped(false);
    setElapsedTime(0);
  };

  const formatTime = (time) => {
    let hours = Math.floor(time / (1000 * 60 * 60));
    let minutes = Math.floor((time / (1000 * 60)) % 60);
    let seconds = Math.floor((time / 1000) % 60);

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (isRunning) {
      intervalIDRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current);
      }, 1000);
    }

    return () => {
      clearInterval(intervalIDRef.current);
    };
  }, [isRunning]);

  return (
    <div
      className={`relative z-10 flex flex-col items-center justify-between p-8 md:p-12 rounded-3xl bg-slate-900/40 border backdrop-blur-2xl transition-all duration-500 w-full max-w-md h-[480px] md:h-[500px] ${
        isStopped
          ? 'border-rose-500/80 shadow-[0_0_50px_rgba(244,63,94,0.6)] animate-pulse'
          : isRunning
          ? 'border-amber-400/80 shadow-[0_0_50px_rgba(245,158,11,0.5)]'
          : 'border-slate-800/80 shadow-[0_20px_50px_rgba(0,0,0,0.6)]'
      }`}
    >
      {/* Status Indicator */}
      <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700/40 text-xs font-medium text-slate-400 tracking-wider uppercase">
        <span
          className={`w-2 h-2 rounded-full ${
            isStopped
              ? 'bg-rose-500 animate-ping'
              : isRunning
              ? 'bg-amber-400 animate-pulse'
              : 'bg-amber-500'
          }`}
        />
        {isStopped ? 'Paused' : isRunning ? 'Running' : 'Stopwatch'}
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col items-center justify-center my-auto">
        <div className="text-5xl md:text-6xl font-mono font-extrabold tracking-tight text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.2)]">
          {formatTime(elapsedTime)}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-3 gap-3 w-full">
        <button
          onClick={handleStart}
          className="group relative flex items-center justify-center py-3.5 px-4 rounded-2xl font-semibold text-sm tracking-wide text-emerald-400 bg-emerald-950/30 border border-emerald-500/30 hover:border-emerald-400/80 hover:bg-emerald-500/10 active:scale-95 transition-all duration-300 shadow-[0_0_15px_rgba(16,185,129,0.05)] hover:shadow-[0_0_25px_rgba(16,185,129,0.25)]"
        >
          <span className="relative z-10 flex items-center gap-1.5">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            Start
          </span>
        </button>

        <button
          onClick={handleStop}
          className="group relative flex items-center justify-center py-3.5 px-4 rounded-2xl font-semibold text-sm tracking-wide text-rose-400 bg-rose-950/30 border border-rose-500/30 hover:border-rose-400/80 hover:bg-rose-500/10 active:scale-95 transition-all duration-300 shadow-[0_0_15px_rgba(244,63,94,0.05)] hover:shadow-[0_0_25px_rgba(244,63,94,0.25)]"
        >
          <span className="relative z-10 flex items-center gap-1.5">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M6 6h12v12H6z" />
            </svg>
            Stop
          </span>
        </button>

        <button
          onClick={handleReset}
          className="group relative flex items-center justify-center py-3.5 px-4 rounded-2xl font-semibold text-sm tracking-wide text-slate-300 bg-slate-800/40 border border-slate-700/50 hover:border-slate-500 hover:bg-slate-800/80 hover:text-white active:scale-95 transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.02)] hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
        >
          <span className="relative z-10 flex items-center gap-1.5">
            <svg
              className="w-4 h-4 fill-none stroke-current stroke-2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Reset
          </span>
        </button>
      </div>
    </div>
  );
};

export default StopWatch;