import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

/*
  JSON shape:
  { "array": [2,5,8,12,16,23,38,56], "target": 16, "secondsPerStep": 2, "title": "Binary Search" }
*/

/* ---------- Generate steps from the JSON ---------- */
export const buildSteps = (arr, target) => {
  const steps = [];
  let low = 0;
  let high = arr.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const value = arr[mid];

    if (value === target) {
      steps.push({ low, high, mid, done: true, message: `Target found: ${target}` });
      return steps;
    }
    if (value < target) {
      steps.push({
        low, high, mid, done: false,
        message: `${target} is greater than ${value}. Search the right half.`,
      });
      low = mid + 1;
    } else {
      steps.push({
        low, high, mid, done: false,
        message: `${target} is smaller than ${value}. Search the left half.`,
      });
      high = mid - 1;
    }
  }

  steps.push({
    low, high, mid: null, done: true,
    message: `${target} is not in the array.`,
  });
  return steps;
};

/* ---------- Video length (use this in the Player) ---------- */
export const getDurationInFrames = (data, fps = 30) => {
  const sorted = [...data.array].sort((a, b) => a - b);
  const steps = buildSteps(sorted, data.target);
  return Math.round((steps.length * (data.secondsPerStep ?? 2) + 1) * fps);
};

/* ---------- Moving arrow ---------- */
const Pointer = ({ x, label, color, direction, opacity = 1 }) => {
  // direction "down": label on top, arrow points down at the box (for MID)
  // direction "up":   arrow points up at the box, label below   (for LOW / HIGH)
  const arrow = (
    <svg width="20" height="22" viewBox="0 0 20 22">
      {direction === "down" ? (
        <path d="M10 22 L1 8 H7 V0 H13 V8 H19 Z" fill={color} />
      ) : (
        <path d="M10 0 L1 14 H7 V22 H13 V14 H19 Z" fill={color} />
      )}
    </svg>
  );
  const text = (
    <span style={{ color, fontWeight: 700, fontSize: 15, lineHeight: "16px" }}>
      {label}
    </span>
  );
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        transform: "translateX(-50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        opacity,
      }}
    >
      {direction === "down" ? (
        <>
          {text}
          {arrow}
        </>
      ) : (
        <>
          {arrow}
          {text}
        </>
      )}
    </div>
  );
};

/* ---------- Component ---------- */
export const BinarySearchAnimation = ({
  title = "Binary Search",
  array,
  target,
  secondsPerStep = 2,
}) => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();

  // Binary search needs a sorted array
  const numbers = React.useMemo(() => [...array].sort((a, b) => a - b), [array]);
  const steps = React.useMemo(() => buildSteps(numbers, target), [numbers, target]);

  const stepFrames = Math.round(secondsPerStep * fps);
  const step = Math.min(Math.floor(frame / stepFrames), steps.length - 1);
  const current = steps[step];
  const prev = steps[Math.max(step - 1, 0)];

  const local = frame - step * stepFrames;

  // box pulse (same as before)
  const opacity = interpolate(local, [0, 10], [0.5, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // arrow slide: 0 -> 1 during the first ~0.6s of every step
  const move = interpolate(local, [0, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Shrink boxes for long arrays so they fit
  const GAP = 12;
  const box = Math.max(32, Math.min(56, (width - 96) / numbers.length - GAP));
  const rowWidth = numbers.length * box + (numbers.length - 1) * GAP;
  const xOf = (i) => i * (box + GAP) + box / 2;
  const slide = (from, to) => xOf(from) + (xOf(to) - xOf(from)) * move;

  const lowX = slide(prev.low, current.low);
  const highX = slide(prev.high, current.high);
  const prevMid = prev.mid ?? current.low;
  const midIdx = current.mid ?? prevMid;
  const midX = slide(prevMid, midIdx);
  const midOpacity = current.mid === null ? 1 - move : 1;

  // when LOW and HIGH meet, nudge them apart so both stay visible
  const nudge = interpolate(Math.abs(lowX - highX), [0, box], [14, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="bg-zinc-950 text-white items-center justify-center p-8">
      <h1 className="text-3xl font-bold mb-2">{title}</h1>

      <p className="text-zinc-400 mb-6">Find the target: {target}</p>

      {/* boxes + moving arrows */}
      <div
        style={{
          position: "relative",
          width: rowWidth,
          height: box,
          marginTop: 44,
          marginBottom: 50,
        }}
      >
        <div style={{ display: "flex", gap: GAP }}>
          {numbers.map((number, index) => {
            const isMid = index === current.mid;
            const isFound = current.done && isMid;
            const isActive = index >= current.low && index <= current.high;

            return (
              <div
                key={index}
                style={{
                  opacity: isMid ? opacity : 1,
                  width: box,
                  height: box,
                }}
                className={`flex items-center justify-center
                  rounded-lg border text-lg font-semibold
                  ${
                    isFound
                      ? "border-green-400 bg-green-500 text-white"
                      : isMid
                      ? "border-blue-400 bg-blue-500 text-white"
                      : isActive
                      ? "border-zinc-600 bg-zinc-800"
                      : "border-zinc-800 bg-zinc-900 text-zinc-600"
                  }`}
              >
                {number}
              </div>
            );
          })}
        </div>

        {/* MID arrow (above the boxes) */}
        <div style={{ position: "absolute", top: -44, left: 0 }}>
          <Pointer
            x={midX}
            label="MID"
            color="#60a5fa"
            direction="down"
            opacity={midOpacity}
          />
        </div>

        {/* LOW and HIGH arrows (below the boxes) */}
        <div style={{ position: "absolute", top: box + 6, left: 0 }}>
          <Pointer x={lowX - nudge} label="LOW" color="#facc15" direction="up" />
          <Pointer x={highX + nudge} label="HIGH" color="#f87171" direction="up" />
        </div>
      </div>

      <div className="flex gap-6 text-lg">
        <p>Low: {current.low}</p>
        <p>High: {current.high}</p>
        <p>Mid: {current.mid ?? "-"}</p>
        <p>
          Middle element: {current.mid !== null ? numbers[current.mid] : "-"}
        </p>
      </div>

      <p
        className={`mt-4 ${
          current.done && current.mid !== null ? "text-green-400" : "text-blue-400"
        }`}
      >
        {current.message}
      </p>
    </AbsoluteFill>
  );
};
