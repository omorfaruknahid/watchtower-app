import React, { useState, useRef, useEffect } from 'react';

const Timer = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [isStopped, setIsStopped] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [targetTime, setTargetTime] = useState(1 * 60 * 1000);
  const [customMinutes, setCustomMinutes] = useState(1);
  const [isFinished, setIsFinished] = useState(false);

  const startTimeRef = useRef(0);
  const intervalIDRef = useRef(null);

  const handleStart = () => {
    const parsedMinutes = parseFloat(customMinutes);
    if (customMinutes === '' || isNaN(parsedMinutes) || parsedMinutes <= 0) {
      alert('Please enter a valid target time before starting.');
      return;
    }

    if (elapsedTime >= targetTime) return;

    setIsFinished(false);
    setIsStopped(false);
    setIsRunning(true);
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
    setIsFinished(false);
  };

  const setPresetTime = (minutes) => {
    handleReset();
    const newTarget = minutes * 60 * 1000;
    setTargetTime(newTarget);
    setCustomMinutes(minutes);
  };

  const updateCustomMinutes = (newVal) => {
    if (newVal === '') {
      setCustomMinutes('');
      return;
    }

    const parsed = parseFloat(newVal);
    if (!isNaN(parsed)) {
      setCustomMinutes(parsed);
      handleReset();
      setTargetTime(parsed * 60 * 1000);
    }
  };

  const handleInputBlur = () => {
    const parsed = parseFloat(customMinutes);

    if (customMinutes === '' || isNaN(parsed) || parsed < 0.5) {
      alert('Minimum time limit is 0.5 minutes (30 seconds).');
      setCustomMinutes(0.5);
      handleReset();
      setTargetTime(0.5 * 60 * 1000);
    }
  };

  const adjustMinutes = (delta) => {
    const currentVal = parseFloat(customMinutes) || 0.5;
    const newVal = Math.max(0.5, currentVal + delta);
    updateCustomMinutes(newVal);
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
        const currentTime = Date.now() - startTimeRef.current;

        if (currentTime >= targetTime) {
          setElapsedTime(targetTime);
          setIsRunning(false);
          setIsFinished(true);
        } else {
          setElapsedTime(currentTime);
        }
      }, 1000);
    }

    return () => {
      clearInterval(intervalIDRef.current);
    };
  }, [isRunning, targetTime]);

  return (
    <div
      className={`relative z-10 flex flex-col items-center justify-between p-8 md:p-12 rounded-3xl bg-slate-900/40 border backdrop-blur-2xl transition-all duration-500 w-full max-w-md h-[480px] md:h-[500px] ${
        isFinished
          ? 'border-emerald-400 shadow-[0_0_60px_rgba(16,185,129,0.8)] animate-pulse'
          : isStopped
          ? 'border-rose-500/80 shadow-[0_0_50px_rgba(244,63,94,0.6)] animate-pulse'
          : 'border-slate-800/80 shadow-[0_20px_50px_rgba(0,0,0,0.6)]'
      }`}
    >
      {/* Status Indicator */}
      <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700/40 text-xs font-medium text-slate-400 tracking-wider uppercase">
        <span
          className={`w-2 h-2 rounded-full ${
            isFinished
              ? 'bg-emerald-400 animate-ping'
              : isStopped
              ? 'bg-rose-500 animate-ping'
              : 'bg-green-200 animate-pulse'
          }`}
        />
        {isFinished ? 'Time Up!' : isStopped ? 'Paused' : 'Timer'}
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col items-center justify-center w-full my-auto">
        <div className="text-5xl md:text-6xl font-mono font-extrabold tracking-tight text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.2)] mb-6">
          {formatTime(elapsedTime)}
        </div>

        {/* Preset & Custom Controls */}
        <div className="flex flex-col items-center gap-3 w-full">
          <div className="grid grid-cols-3 gap-2 w-full">
            {[1, 5, 15].map((mins) => (
              <button
                key={mins}
                onClick={() => setPresetTime(mins)}
                disabled={isRunning}
                className={`py-1.5 px-3 rounded-xl font-medium text-xs transition-all duration-200 border ${
                  targetTime === mins * 60 * 1000
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-[0_0_10px_rgba(16,185,129,0.2)]'
                    : 'bg-slate-800/40 text-slate-400 border-slate-700/40 hover:text-slate-200 hover:bg-slate-800/70'
                } ${isRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {mins}m
              </button>
            ))}
          </div>

          <div className="w-full p-2 rounded-2xl bg-slate-800/30 border border-slate-700/40 flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium tracking-wider uppercase pl-2">
              Custom
            </span>

            <div className="flex items-center gap-1 bg-slate-900/60 p-1 rounded-xl border border-slate-700/50">
              <button
                onClick={() => adjustMinutes(-1)}
                disabled={isRunning || parseFloat(customMinutes) <= 0.5}
                className="w-7 h-7 flex items-center justify-center rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed font-bold"
              >
                -
              </button>

              <div className="flex items-center font-mono text-emerald-400 px-1">
                <input
                  type="number"
                  max="180"
                  min="0.5"
                  step="any"
                  value={customMinutes}
                  onChange={(e) => updateCustomMinutes(e.target.value)}
                  onBlur={handleInputBlur}
                  disabled={isRunning}
                  className="bg-transparent text-emerald-400 font-mono text-xs text-center focus:outline-none w-10 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <span className="text-[10px] text-emerald-500/80">m</span>
              </div>

              <button
                onClick={() => adjustMinutes(1)}
                disabled={isRunning}
                className="w-7 h-7 flex items-center justify-center rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed font-bold"
              >
                +
              </button>
            </div>
          </div>
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

export default Timer;