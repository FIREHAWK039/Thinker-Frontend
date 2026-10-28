import React from "react";
import { Player } from "@remotion/player";
import { BinarySearchAnimation } from "./BinarySearchAnimation";

function DSAPlayer() {
  return (
    <div className="w-full max-w-3xl overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950">

      <Player
        component={BinarySearchAnimation}
        durationInFrames={240}
        fps={30}
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
