import { React, useState, useRef, useEffect } from "react";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { useFBX, useProgress } from "@react-three/drei";
import FakeGlowMaterial from "./FakeGlowMaterial";
import { useFrame } from "@react-three/fiber";
function ThreeDModel({
  modelUrl,
  modelPosition,
  modelRotation,
  meshTexture,
  modelScale,
  handleOnClickModal,

  ...props
}) {
  const colorMap = useLoader(TextureLoader, meshTexture);
  let obj = useFBX(modelUrl);
  const model = useRef();
  const light = useRef();

  if (props.repeat) {
    useFrame(({ clock }) => {
      model.current.rotation.y = 0 + clock.getElapsedTime() / 2;
    });

    obj = obj.clone();
  } else {
    useFrame(({ clock }) => {
      light.current.scale.set(
        1 + Math.sin(clock.getElapsedTime() * 3) * 0.1,
        1 + Math.sin(clock.getElapsedTime() * 3) * 0.1,
        1 + Math.sin(clock.getElapsedTime() * 3) * 0.1
      );
    });

  }

  const [isHovered, setIsHovered] = useState(false);
 

  function handleSetIsHoeverd(active) {
    setIsHovered(active);
    document.body.style.cursor = isHovered == true ? "auto" : "pointer";
  }





  return (
    <>
      {!props.repeat && (
        <mesh position={[0, 5, 57]} ref={light}>
          <sphereGeometry args={[30]} />
          <meshStandardMaterial
            color={0xffffff}
            toneMapped={false}
            opacity={2}
          />
          <FakeGlowMaterial
            falloff={1}
            glowSharpness={2}
            glowColor="#588ed5"
            opacity={1}
            glowInternalRadius={1.5}
          ></FakeGlowMaterial>

          <directionalLight intensity={1.5} color={0x7cb2e8} />
        </mesh>
      )}
      
      <mesh ref={model}>
        <primitive
          onClick={() => handleOnClickModal(modelUrl)}
          onPointerOver={() => handleSetIsHoeverd(true)}
          onPointerOut={() => handleSetIsHoeverd(false)}
          object={obj}
          scale={modelScale}
          rotation={modelRotation}
          position={modelPosition}
        />
        <meshBasicMaterial
          map={colorMap}
          toneMapped={false}
          transparent={false}
          opacity={1}
        />
      </mesh>
    </>
  );
}

export default ThreeDModel;
