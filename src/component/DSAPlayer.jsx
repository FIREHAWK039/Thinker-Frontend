import React from "react";
import { Player } from "@remotion/player";
import {
  BinarySearchAnimation,
  getDurationInFrames,
} from "./BinarySearchAnimation";

const FPS = 30;

// Replace this with JSON from your API / props
const sampleData = {
  array: [2, 5, 8, 12, 16, 23, 38, 56],
  target: 16,
};

function DSAPlayer({ data = sampleData }) {
  return (
    <div className="w-full max-w-3xl overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950">
      <Player
        component={BinarySearchAnimation}
        inputProps={data}
        durationInFrames={getDurationInFrames(data, FPS)}
        fps={FPS}
        compositionWidth={900}
        compositionHeight={500}
        controls
        autoPlay={false}
        loop
        style={{
          width: "100%",
          aspectRatio: "16 / 9",
        }}
      />
    </div>
  );
}

export default DSAPlayer;
