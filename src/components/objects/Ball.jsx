import { useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import React, { useRef, useState } from "react";
import * as THREE from "three";
import { PATH_LENGTH, POLE_HEIGHT } from "../../common/constants";
import useGame from "../../stores/useGame";

let minPlayerPos = 0;
export default function Ball() {
  const player = useRef();
  const [smoothCameraPosition] = useState(() => new THREE.Vector3(10, 10, 10));
  const [smoothTargetPosition] = useState(() => new THREE.Vector3());
  const pathCount = useGame((state) => state.pathCount);
  const addPath = useGame((state) => state.addPath);

  const cameraMovement = (state, pPos, delta) => {
    // Camera
    const playerPosition = player.current.translation();
    const cameraPosition = new THREE.Vector3(2.5, 0, -10);

    cameraPosition.copy(playerPosition);
    cameraPosition.y += pPos - 0.7;
    // cameraPosition.x -= playerPosition.x

    const cameraTarget = new THREE.Vector3();
    cameraTarget.copy(playerPosition);
    cameraTarget.y += pPos - 0.25;

    smoothCameraPosition.lerp(cameraPosition, 3 * delta);
    smoothTargetPosition.lerp(cameraTarget, 3 * delta);

    state.camera.position.copy(smoothCameraPosition);
    state.camera.lookAt(playerPosition);
  };
  useFrame((state, delta) => {
    const pTranslation = player.current.translation();
    if (pTranslation.y < -PATH_LENGTH * pathCount + PATH_LENGTH / 2) {
      addPath();
    }
    if (pTranslation.y < minPlayerPos) {
      minPlayerPos = pTranslation.y;
      state.camera.position.z = -20;
      state.camera.position.y = minPlayerPos;
    }
  });

  return (
    <RigidBody
      enabledTranslations={[false, true]}
      ref={player}
      lockRotations={true}
      colliders="ball"
      restitution={0.9}
    >
      <mesh position={[0, 0, -3]} scale={0.6}>
        <sphereGeometry />
        <meshNormalMaterial />
      </mesh>
    </RigidBody>
  );
}
