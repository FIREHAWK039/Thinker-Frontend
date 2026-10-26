
import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const numbers = [2, 5, 8, 12, 16, 23, 38, 56];

export const BinarySearchAnimation = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Each step lasts 2 seconds.
  const step = Math.min(Math.floor(frame / (2 * fps)), 3);

  const steps = [
    { low: 0, high: 7, mid: 3 },
    { low: 4, high: 7, mid: 5 },
    { low: 4, high: 4, mid: 4 },
    { low: 4, high: 4, mid: 4 },
  ];

  const current = steps[step];

  const opacity = interpolate(
    frame % (2 * fps),
    [0, 10],
    [0.5, 1],
    { extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill className="bg-zinc-950 text-white items-center justify-center p-8">

      <h1 className="text-3xl font-bold mb-4">
        Binary Search
      </h1>

      <p className="text-zinc-400 mb-10">
        Find the target: 16
      </p>

      <div className="flex gap-3">
        {numbers.map((number, index) => {
          const isMid = index === current.mid;
          const isActive =
            index >= current.low && index <= current.high;

          return (
            <div
              key={number}
              style={{ opacity: isMid ? opacity : 1 }}
              className={`flex h-14 w-14 items-center justify-center
                rounded-lg border text-lg font-semibold
                ${
                  isMid
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

      <div className="mt-8 space-y-3 text-lg">
        <p>Low: {current.low}</p>
        <p>High: {current.high}</p>
        <p>Mid: {current.mid}</p>
        <p>
          Middle element: {numbers[current.mid]}
        </p>
      </div>

      <p className="mt-8 text-blue-400">
        {step === 0
          ? "16 is greater than 12. Search the right half."
          : step === 1
          ? "16 is smaller than 23. Search the left half."
          : "Target found: 16"}
      </p>

    </AbsoluteFill>
  );
};
