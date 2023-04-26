import { KeyboardControls, Loader } from "@react-three/drei";
import Game from "./Game";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";


function App() {
  return (
    <KeyboardControls
      map={[
        { name: "forward", keys: ["ArrowUp", "KeyW"] },
        { name: "backward", keys: ["ArrowDown", "KeyS"] },
        { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
        { name: "rightward", keys: ["ArrowRight", "KeyD"] },
        { name: "jump", keys: ["Space"] },
      ]}
    >
      <Canvas
        shadows
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [0, 0, -100],
        }}
      >
       
        <Suspense fallback={null}>
          <Game />
        </Suspense>
      </Canvas>
      <Loader />
      {/* <Interface /> */}
    </KeyboardControls>
  );
}

export default App;
