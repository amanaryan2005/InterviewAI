const BARS = [
  { h: 30, dur: 0.9, delay: 0.00 }, { h: 55, dur: 1.1, delay: 0.05 },
  { h: 75, dur: 0.8, delay: 0.10 }, { h: 90, dur: 1.3, delay: 0.15 },
  { h: 65, dur: 1.0, delay: 0.20 }, { h: 80, dur: 0.7, delay: 0.25 },
  { h: 45, dur: 1.2, delay: 0.12 }, { h: 95, dur: 0.9, delay: 0.08 },
  { h: 70, dur: 1.1, delay: 0.18 }, { h: 40, dur: 0.8, delay: 0.22 },
  { h: 85, dur: 1.0, delay: 0.03 }, { h: 60, dur: 1.3, delay: 0.07 },
  { h: 50, dur: 0.9, delay: 0.16 }, { h: 78, dur: 1.1, delay: 0.28 },
  { h: 42, dur: 0.8, delay: 0.33 }, { h: 88, dur: 1.0, delay: 0.38 },
  { h: 62, dur: 1.2, delay: 0.43 }, { h: 48, dur: 0.9, delay: 0.11 },
  { h: 92, dur: 1.1, delay: 0.19 }, { h: 58, dur: 0.8, delay: 0.24 },
  { h: 72, dur: 1.0, delay: 0.29 }, { h: 38, dur: 1.3, delay: 0.34 },
  { h: 83, dur: 0.7, delay: 0.39 }, { h: 56, dur: 1.1, delay: 0.44 },
];

interface WaveformVisualizerProps {
  isActive: boolean;
  color?: string;
  height?: number;
  barCount?: number;
}

export function WaveformVisualizer({
  isActive,
  color = "#00d4ff",
  height = 48,
  barCount = 24,
}: WaveformVisualizerProps) {
  const bars = BARS.slice(0, barCount);

  return (
    <div
      className="flex items-center justify-center gap-[2.5px]"
      style={{ height }}
      aria-hidden="true"
    >
      {bars.map((bar, i) => (
        <div
          key={i}
          className="rounded-full transition-opacity duration-300"
          style={{
            width: "3px",
            height: isActive ? `${bar.h}%` : "15%",
            backgroundColor: color,
            opacity: isActive ? 0.85 : 0.25,
            transformOrigin: "bottom",
            animation: isActive
              ? `waveBar ${bar.dur}s ease-in-out ${bar.delay}s infinite`
              : "none",
            transition: "height 0.2s ease, opacity 0.3s ease",
          }}
        />
      ))}
    </div>
  );
}
