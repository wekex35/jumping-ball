import React, { useEffect, useRef } from "react";

import PoleCollar from "./PoleCollar";
import { RigidBody, euler, quat, vec3 } from "@react-three/rapier";
import { POLE_HEIGHT } from "../../common/constants";
import { v4 } from "uuid";
import { degToRad, randFloat, randInt } from "three/src/math/MathUtils";
import { OrbitControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useGesture } from "@use-gesture/react";
import * as THREE from "three";
import useGame from "../../stores/useGame";



export function Pole() {
  return (
    <div>Pole</div>
  )
}


export default function Poles() {
  const pole1 = useRef();
  const pole2 = useRef();
  const pathCount = useGame((state) => state.pathCount);

  useFrame(() => {
    // if (pathCount > 1 && !isPathAdded) {

    //   const rand = RandomMinMax(1, PATH_WIDTH);
    //   let spawnX = 0;
    //   if (pathCount % 2) {
    //     const translation = pole2.current.translation();
       
    //     pole1.position = [spawnX, pY, pZ - PATH_LENGTH];

    //   } else {
    //     const [sX, sY, sZ] = pole1.scale;
    //     const [pX, pY, pZ] = pole1.position;
    //     if (sX > 1) {
    //       spawnX = RandomMinMax(0, (PATH_WIDTH - rand) / 2);
    //       pole2.scale = [RandomMinMax(1, PATH_WIDTH), sY, sZ];
    //     }
    //     pole2.position = [spawnX, pY, pZ - PATH_LENGTH];
    //     setPath([pole1, pole2]);
    //   }
    //   pathAdded();
    // }
  });

  const bind = useGesture(
    {
      onDrag: ({ active, movement, direction, cancel, tap }) => {
        const [mx, my] = movement;
        if (!mx) return;
        const delta = 0.01;
        const cQ = quat(pole1.current.rotation())
        const euRotation = new THREE.Euler().setFromQuaternion(cQ)
        // euRotation._y += mx < 0 ? -delta : delta
        // console.log({euRotation});
        // pole1.current.setRotation(
        //   new THREE.Quaternion().setFromEuler(euRotation)
        // );
        pole1.current.setRotation(
          new THREE.Quaternion().setFromEuler(new THREE.Euler(0,  mx * delta, 0))
        );
      },
      onDragEnd: ({ active, movement, direction, cancel, tap }) => {},
    },
    { target: window }
  );
  return (
    <group >
      <RigidBody
        type="kinematicPosition"
        key={v4()}
        ccd={true}
        lockTranslations={true}
        colliders={"trimesh"}
        restitution={1}
        ref={pole1}
      >
        <mesh position={[0, -POLE_HEIGHT / 2, 0]}>
          <cylinderGeometry args={[2, 2, POLE_HEIGHT, 32, 1]} />
          <meshNormalMaterial />
        </mesh>

        {Array(POLE_HEIGHT / 5)
          .fill(0)
          .map((v, index, arr) => {
            if (arr.length == index + 1) return null;
            return (
              <PoleCollar
                key={v4()}
                scale={[4, 3, 4]}
                position={[0, -5 * (index + 1), 0]}
                rotation={[0, Math.PI * randFloat(0, 2), 0]}
              />
            );
          })}
      </RigidBody>

    </group>
  );
}
