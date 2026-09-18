Excited to share my latest web application: Watch Tower! 
I built Watch Tower a modern, high-precision web app featuring both a Stopwatch and a Timer, built with a focus on real-time accuracy, sleek UI design, and responsive interaction.

Key Highlights & Engineering Details:
 Modern Tech Stack: Powered by React (utilizing hooks like useState, useEffect, and useRef for optimal DOM and state control) and styled with Tailwind CSS.

High Precision: Built around precise delta-time math (Date.now() - startTime) rather than naive interval increments, ensuring flawless accuracy even during tab throttling or background switches.

Reactive Neon Ambient UI: Styled with a dark slate/rock texture aesthetic featuring dynamic glowing state borders:

  Amber Glow: Indicates active stopwatch tracking.
  Rose Glow & Pulse: Signals paused/stopped states.
  Emerald Wave: Triggers when the timer target is reached.

Dynamic Timer Customization: Offers quick preset controls (1m, 5m, 15m) and custom minute adjustments (with input validation enforcing min/max limits).

Ultra-Responsive: Optimized grid structure with unified card containers that scale smoothly across mobile and desktop displays.
