"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { memo, useMemo, useRef, useState } from "react";
import type { PointerEvent } from "react";
import { Color, DoubleSide, ExtrudeGeometry, Shape, Vector3 } from "three";
import type { Mesh, Group } from "three";
import { mountainRanges } from "@/data/mountainRanges";
import { turkeyFacetSeeds, turkeyOutlineRings } from "@/data/turkeyOutline";
import { projectGeoToMap, projectPeakToMap } from "@/lib/geoProjection";
import type { Peak } from "@/types/domain";

interface MapSceneProps {
  peaks: Peak[];
  completedPeakIds: Set<string>;
  onPeakSelect: (peak: Peak) => void;
  compact?: boolean;
}

interface MapControlState {
  isDragging: boolean;
  lastX: number;
  lastY: number;
  dragDistance: number;
  rotationX: number;
  rotationY: number;
  scale: number;
}

function createTurkeyGeometry() {
  const shapes = turkeyOutlineRings.map((ring) => {
    const shape = new Shape();
    ring.forEach(([x, y], index) => {
      if (index === 0) shape.moveTo(x, y);
      else shape.lineTo(x, y);
    });
    shape.closePath();
    return shape;
  });

  return new ExtrudeGeometry(shapes, {
    depth: 0.16,
    bevelEnabled: true,
    bevelSegments: 1,
    bevelSize: 0.04,
    bevelThickness: 0.05
  });
}

function TurkeyTerrain({ completedCount }: { completedCount: number }) {
  const meshRef = useRef<Mesh>(null);
  const geometry = useMemo(createTurkeyGeometry, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.z = Math.sin(clock.elapsedTime * 0.35) * 0.015;
  });

  return (
    <group rotation={[-Math.PI / 2.7, 0, 0]} position={[0, -0.1, 0]}>
      <mesh ref={meshRef} geometry={geometry} position={[0, 0, -0.08]}>
        <meshStandardMaterial
          color={completedCount > 0 ? "#6f806f" : "#303235"}
          roughness={0.82}
          metalness={0.12}
          side={DoubleSide}
        />
      </mesh>
      <mesh geometry={geometry} position={[0, 0, -0.105]} scale={[1.018, 1.018, 0.72]}>
        <meshStandardMaterial color="#c8a85a" roughness={0.72} metalness={0.34} side={DoubleSide} />
      </mesh>
      <MountainRangeLayer />
      <LowPolyFacets />
    </group>
  );
}

function MountainRangeLayer() {
  return (
    <group position={[0, 0, 0.118]}>
      {mountainRanges.map((range) => (
        <MountainRange key={range.id} points={range.points} />
      ))}
    </group>
  );
}

function MountainRange({ points }: { points: (typeof mountainRanges)[number]["points"] }) {
  const segments = useMemo(
    () =>
      points.slice(0, -1).map((point, index) => {
        const start = projectGeoToMap(point.latitude, point.longitude);
        const endPoint = points[index + 1];
        const end = projectGeoToMap(endPoint.latitude, endPoint.longitude);
        const deltaX = end.x - start.x;
        const deltaY = end.z - start.z;
        return {
          id: `${point.latitude}-${point.longitude}-${index}`,
          angle: Math.atan2(deltaY, deltaX),
          length: Math.hypot(deltaX, deltaY),
          x: start.x + deltaX / 2,
          y: start.z + deltaY / 2
        };
      }),
    [points]
  );

  return (
    <>
      {segments.map((segment) => (
        <mesh key={segment.id} position={[segment.x, segment.y, 0]} rotation={[0, 0, segment.angle]}>
          <boxGeometry args={[segment.length, 0.034, 0.032]} />
          <meshStandardMaterial color="#82bee2" emissive="#315f7c" emissiveIntensity={0.85} roughness={0.5} metalness={0.08} />
        </mesh>
      ))}
    </>
  );
}

function LowPolyFacets() {
  const facets = useMemo(
    () =>
      turkeyFacetSeeds.map(([x, y, scale], index) => ({
        x,
        y,
        scale,
        color: index % 3 === 0 ? "#4e665c" : index % 3 === 1 ? "#3f4a48" : "#746744"
      })),
    []
  );

  return (
    <>
      {facets.map((facet, index) => (
        <mesh key={index} position={[facet.x, facet.y, 0.02]} rotation={[0, 0, index * 0.7]} scale={facet.scale}>
          <coneGeometry args={[1, 0.12, 3]} />
          <meshStandardMaterial color={facet.color} roughness={0.88} metalness={0.08} />
        </mesh>
      ))}
    </>
  );
}

function PeakMarker({ peak, completed, onSelect }: { peak: Peak; completed: boolean; onSelect: (peak: Peak) => void }) {
  const marker = useRef<Group>(null);
  const color = completed ? "#f2c96d" : "#8a918b";
  const mapPosition = projectPeakToMap(peak);

  useFrame(({ clock }) => {
    if (!marker.current) return;
    marker.current.position.y = 0.16 + Math.sin(clock.elapsedTime * 2.2 + mapPosition.x) * 0.035;
  });

  return (
    <group ref={marker} position={[mapPosition.x, 0.16, mapPosition.z]} onClick={() => onSelect(peak)}>
      <mesh>
        <coneGeometry args={[0.08, 0.24, 5]} />
        <meshStandardMaterial color={color} emissive={new Color(completed ? "#7c5a19" : "#111111")} roughness={0.45} />
      </mesh>
      <mesh position={[0, 0.15, 0]}>
        <sphereGeometry args={[completed ? 0.07 : 0.05, 18, 18]} />
        <meshStandardMaterial color={color} emissive={new Color(completed ? "#dcae43" : "#1b1d1d")} emissiveIntensity={completed ? 1.8 : 0.2} />
      </mesh>
      {completed && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.08, 0]}>
          <ringGeometry args={[0.12, 0.2, 32]} />
          <meshBasicMaterial color="#f5d384" transparent opacity={0.55} />
        </mesh>
      )}
    </group>
  );
}

function SceneContent({
  peaks,
  completedPeakIds,
  onPeakSelect,
  compact,
  zoomScale,
  controls
}: MapSceneProps & { zoomScale: number; controls: { current: MapControlState } }) {
  const groupRef = useRef<Group>(null);

  function selectPeak(peak: Peak) {
    if (controls.current.dragDistance > 8) return;
    onPeakSelect(peak);
  }

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const control = controls.current;
    const idleMotion = control.isDragging ? 0 : Math.sin(clock.elapsedTime * 0.25) * 0.035;
    groupRef.current.rotation.x += (control.rotationX - groupRef.current.rotation.x) * 0.12;
    groupRef.current.rotation.y += (control.rotationY + idleMotion - groupRef.current.rotation.y) * 0.12;
    const nextScale = control.scale * zoomScale;
    groupRef.current.scale.x += (nextScale - groupRef.current.scale.x) * 0.12;
    groupRef.current.scale.y += (nextScale - groupRef.current.scale.y) * 0.12;
    groupRef.current.scale.z += (nextScale - groupRef.current.scale.z) * 0.12;
  });

  return (
    <>
      <color attach="background" args={["#11100d"]} />
      <fog attach="fog" args={["#11100d", 3.6, 7]} />
      <ambientLight intensity={1.1} />
      <directionalLight position={[2.6, 3.2, 2.4]} intensity={2.7} color="#fff0c1" />
      <pointLight position={[-2.4, 1.2, 1.4]} intensity={1.1} color="#77b6a5" />
      <group
        ref={groupRef}
        scale={compact ? 0.86 : 1}
      >
        <TurkeyTerrain completedCount={completedPeakIds.size} />
        {peaks.map((peak) => (
          <PeakMarker key={peak.id} peak={peak} completed={completedPeakIds.has(peak.id)} onSelect={selectPeak} />
        ))}
      </group>
    </>
  );
}

export const MapScene = memo(function MapScene(props: MapSceneProps) {
  const wheelScaleRef = useRef(1);
  const [zoomScale, setZoomScale] = useState(1);
  const controlsRef = useRef<MapControlState>({
    isDragging: false,
    lastX: 0,
    lastY: 0,
    dragDistance: 0,
    rotationX: 0,
    rotationY: 0,
    scale: props.compact ? 0.86 : 1
  });

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    controlsRef.current.isDragging = true;
    controlsRef.current.lastX = event.clientX;
    controlsRef.current.lastY = event.clientY;
    controlsRef.current.dragDistance = 0;
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!controlsRef.current.isDragging) return;
    const deltaX = event.clientX - controlsRef.current.lastX;
    const deltaY = event.clientY - controlsRef.current.lastY;
    controlsRef.current.lastX = event.clientX;
    controlsRef.current.lastY = event.clientY;
    controlsRef.current.dragDistance += Math.abs(deltaX) + Math.abs(deltaY);
    controlsRef.current.rotationY += deltaX * 0.008;
    controlsRef.current.rotationX = Math.max(-0.34, Math.min(0.28, controlsRef.current.rotationX + deltaY * 0.005));
  }

  function stopDragging(event: PointerEvent<HTMLDivElement>) {
    controlsRef.current.isDragging = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  function resetView() {
    controlsRef.current.rotationX = 0;
    controlsRef.current.rotationY = 0;
    wheelScaleRef.current = 1;
    setZoomScale(1);
  }

  return (
    <Canvas
      className="interactive-map-canvas"
      camera={{ position: new Vector3(0, 2.35, 3.75), fov: props.compact ? 44 : 48 }}
      gl={{ antialias: true, alpha: false }}
      dpr={[1, 2]}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={stopDragging}
      onPointerCancel={stopDragging}
      onDoubleClick={resetView}
      onWheel={(event) => {
        wheelScaleRef.current = Math.max(0.86, Math.min(1.28, wheelScaleRef.current - event.deltaY * 0.0008));
        setZoomScale(wheelScaleRef.current);
      }}
    >
      <SceneContent {...props} zoomScale={zoomScale} controls={controlsRef} />
    </Canvas>
  );
});
