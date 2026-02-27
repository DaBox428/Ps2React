import React, { Suspense, useRef, useState, useEffect, useMemo } from "react";
import * as THREE from "three";
import "./App.css";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Cloud,
  Line,
  Sphere,
  Trail,
  useProgress,
  Html,
} from "@react-three/drei";

import Towers from "./components/Towers.jsx";
import MemoryCard from "./components/MemoryCard.jsx";
import PreLoader from "./components/PreLoader.jsx";
import WelcomeText from "./components/WelcomeText.jsx";
import {
  EffectComposer,
  Vignette,
  Bloom,
  Scanline,
} from "@react-three/postprocessing";
import { BlendFunction, BlurPass } from "postprocessing";

import GlassCubes from "./components/GlassCubes.jsx";

function App() {
  function Loader() {
    const { progress } = useProgress();
    return <Html center>{progress} % loaded</Html>;
  }
  const navigatorWidth = window.innerWidth;
  const loadingCanvas = useRef();
  const [showScreen, setShowScreen] = useState(1);
  const [showInsertCd, setShowInsertCd] = useState(true);

  const [isLoading, setIsLoading] = useState(false);

  const [fadeOut, setFadeOut] = useState(false);

  function handleChangeScreen(toScreen) {
    setShowScreen(toScreen);
  }

  const startTimer = () => {
    const loading = () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 9000 /* 9000 */);
    };
    loading();
  };

  function Effects() {
    return (
      <EffectComposer>
        {/*         <SSAO
          blendFunction={BlendFunction.NORMAL} // Use NORMAL to see the effect
          samples={31}
          radius={3}
          intensity={10}
        /> */}
        <Scanline
          density={2.0}
          opacity={0.5}
          blendFunction={BlendFunction.MULTIPLY}
        />
        <Vignette
          offset={0.5}
          darkness={0.7}
          eskil={false}
          blendFunction={BlendFunction.NORMAL}
        />
        {navigatorWidth > 1080 && (
          <Bloom
            radius={0.5}
            kernelSize={2}
            intensity={0.2}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.5}
          />
        )}
      </EffectComposer>
    );
  }

  function Electron({
    radius,
    speed = 1,
    zAxis,
    xAxis,
    yAxis,
    color,
    variation,
    customPosition,
    opposite,
    ...props
  }) {
    let showLights;
    navigatorWidth <= 1080 ? (showLights = false) : (showLights = true);

    const ref = useRef();

    zAxis = zAxis - 40;

    xAxis = xAxis + 10;

    yAxis = yAxis + 10;
    useFrame((state) => {
      const t = state.clock.getElapsedTime() * speed - variation;

      ref.current.position.set(
        Math.sin(t) * xAxis * opposite,
        (Math.cos(t) * yAxis * Math.atan(t)) / Math.PI / 1.25,
        Math.sin(t * (30 / 180)) + zAxis
      );
    });

    return (
      <group {...props}>
        <Trail
          local
          width={2}
          length={navigatorWidth > 1080 ? 16 : 8}
          color={new THREE.Color(color)}
          attenuation={(t) => t * t}
        >
          <mesh ref={ref}>
            <sphereGeometry args={[0.25]} />
            <meshBasicMaterial
              color={color}
              toneMapped={false}
              opacity={1}
              reflectivity
            />
            {showLights && (
              <>
                <directionalLight intensity={2} color={color} />
                <pointLight
                  intensity={8}
                  color={color}
                  distance={0}
                  decay={100}
                />
              </>
            )}
          </mesh>
        </Trail>
      </group>
    );
  }

  function Atom(props) {
    return (
      <group {...props}>
        <Electron
          position={[0, 0, 0]}
          speed={0.6}
          zAxis={114}
          xAxis={10}
          yAxis={15}
          color={0x40e2a0}
          radius={89}
          variation={Math.random() * 1.9}
          opposite={1}
          //GREEN COLOR
        />
        <Electron
          position={[0, 0, 0]}
          speed={1}
          zAxis={94}
          xAxis={9}
          yAxis={16}
          color={0xff6666}
          radius={6}
          variation={Math.random() * 10 * -1}
          opposite={-1}
          //ORANGE
        />
        <Electron
          position={[0, 0, 0]}
          speed={1}
          zAxis={60}
          xAxis={8}
          yAxis={18}
          color={0x7cb2e8}
          radius={6}
          variation={Math.random() * 3}
          opposite={-1}
          //BLUE COLOR
        />
        <Electron
          position={[0, 0, 0]}
          speed={1}
          zAxis={80}
          xAxis={8}
          yAxis={12}
          color={0xff69f8}
          radius={6}
          variation={Math.random() * -1}
          opposite={1}
          //PINK
        />
      </group>
    );
  }

  function CameraZoom() {
    // This one makes the camera move in and out

    let cameraStartPosition;
    navigatorWidth <= 1080
      ? (cameraStartPosition = 130)
      : (cameraStartPosition = 120);
    let cameraSpeedPosition = 4;
    let cameraspeedRotation = 0.05;
    useFrame(({ clock, camera }) => {
      camera.position.z = cameraStartPosition;
      camera.rotation.z = 0;
      camera.position.z =
        cameraStartPosition - clock.getElapsedTime() * cameraSpeedPosition;
      camera.rotation.z = 0 - clock.getElapsedTime() * cameraspeedRotation;
      if (clock.getElapsedTime() > 7) {
        cameraSpeedPosition += 0.4;
        cameraspeedRotation += 0.003;
      }
    });
    return null;
  }

  function onClickStartIntro() {
    setShowInsertCd(false);
    startTimer();
    setIsLoading(true);
  }

  if (showInsertCd) {
    return (
      <div className="bg-black overflow-hidden w-screen h-screen">
        <PreLoader onClick={onClickStartIntro}></PreLoader>;
      </div>
    );
  } else {
    if (isLoading) {
      return (
        <div
          ref={loadingCanvas}
          className={"h-screen bg-black relative z-0 overflow-hidden "}
          id="Towers"
        >
          <WelcomeText></WelcomeText>
          <Canvas style={{ animation: "fadeIn 2s" }} className="">
            <Suspense fallback={<Loader />}>
              <CameraZoom />
              <Towers></Towers>
              {navigatorWidth > 1080 && (
                <Cloud
                  position={[0, 0, -25]}
                  speed={0.2}
                  opacity={0.5}
                  scale={[7, 9, 7]}
                  color={new THREE.Color(0x232d61)}
                  seed={1}
                />
              )}
              {navigatorWidth > 1080 && (
                <Cloud
                  position={[8, 8, -15]}
                  speed={0}
                  opacity={0.2}
                  scale={[8, 9, 7]}
                  color={new THREE.Color(0x232d61)}
                  seed={1}
                />
              )}
              {navigatorWidth > 1080 && (
                <Cloud
                  position={[7, 0, -10]}
                  speed={0}
                  opacity={0.2}
                  scale={[7, 9, 7]}
                  color={new THREE.Color(0x000042)}
                  seed={1}
                />
              )}
              {navigatorWidth > 1080 && (
                <Cloud
                  position={[0, 7, -5]}
                  speed={0}
                  opacity={0.2}
                  scale={[7, 7, 7]}
                  color={new THREE.Color(0x000042)}
                  seed={1}
                />
              )}
              <Cloud
                position={[0, 0, 0]}
                speed={0}
                opacity={0.1}
                scale={[9, 16, 9]}
                color={new THREE.Color(0x4062bb)}
                seed={1}
              />

              <Cloud
                position={[0, 0, 0]}
                speed={0}
                opacity={0.9}
                scale={[16, 16, 26]}
                color={new THREE.Color(0x000000)}
                segments={7}
                seed={1}
              />

              <GlassCubes></GlassCubes>
              <Effects></Effects>
              <fogExp2 attach="fog" color="black" density={0.01} />
              <Atom></Atom>
            </Suspense>
          </Canvas>
        </div>
      );
    } else if (showScreen == "1") {
      return (
        <div
          className="h-screen bg-black w-screen sm:overflow-hidden"
          id="MemoryCard"
        >
          <MemoryCard handleChangeScreen={handleChangeScreen}></MemoryCard>
        </div>
      );
    } else {
      return <MemoryCard handleChangeScreen={handleChangeScreen}></MemoryCard>;
    }
  }
}

export default App;
