import { PivotControls } from "@react-three/drei";
import React from "react";
import * as THREE from "three";
export default function PoleCollar(props) {
  return (
    <group rotation={[0, Math.PI, 0]} {...props}>
      <mesh>
        <cylinderGeometry args={[1, 1, 0.5, 32, 1, false, 0, Math.PI * 1.75]} />
        <meshNormalMaterial />
      </mesh>
      <mesh rotation={[0, -Math.PI / 2, 0]} position={[0, 0, 0.5]}>
        <planeGeometry args={[1, 0.5, 5, 5]} />
        <meshNormalMaterial />
      </mesh>
      <mesh rotation={[0, -Math.PI * 1.75, 0]} position={[-0.355, 0, 0.355]}>
        <planeGeometry args={[1, 0.5,5, 5]} />
        <meshNormalMaterial />
      </mesh>
    </group>
  );
}
