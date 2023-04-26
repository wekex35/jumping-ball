import { Environment, OrbitControls, Sky } from "@react-three/drei";

import React, { useEffect, useRef, useState } from "react";
import Lights from "./components/Lights";
import useGame from "./stores/useGame";
import { Perf } from "r3f-perf";
import Poles from "./components/objects/Pole";
import Ball from "./components/objects/Ball";
import * as THREE from "three";

import { Canvas } from "@react-three/fiber";
import { Physics, RigidBody } from "@react-three/rapier";

function Plane(props) {
  const ref = useRef();
  return (
    <mesh ref={ref}>
      <planeGeometry args={[100, 100]} />
    </mesh>
  );
}

function Cube(props) {
  const ref = useRef();
  return (
    <mesh ref={ref}>
      <boxGeometry />
    </mesh>
  );
}

export default function Game() {
  return (
    <Physics debug>
      {/* <OrbitControls/> */}
      <Lights />

      <Poles />
      <Ball />
     <RigidBody position={[0, -30, 0]} type="fixed">
     <mesh >
        <boxGeometry args={[15, 0.5,15]} />
        <meshNormalMaterial  />
      </mesh>
     </RigidBody>
    </Physics>
  );
}
