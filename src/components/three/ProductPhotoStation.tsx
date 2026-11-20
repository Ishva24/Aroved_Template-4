"use client";

import { useEffect, useState, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import type { Product } from "@/lib/products";

const textureCache = new Map<string, THREE.Texture>();

export function useProductTexture(url?: string) {
  const [texture, setTexture] = useState<THREE.Texture | null>(() => {
    if (!url) return null;
    return textureCache.get(url) || null;
  });

  useEffect(() => {
    if (!url) return;
    if (textureCache.has(url)) {
      setTexture(textureCache.get(url)!);
      return;
    }
    const loader = new THREE.TextureLoader();
    loader.load(
      url,
      (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.generateMipmaps = false;
        tex.minFilter = THREE.LinearFilter;
        tex.magFilter = THREE.LinearFilter;
        textureCache.set(url, tex);
        setTexture(tex);
      },
      undefined,
      (err) => {
        console.error("Failed to load product texture:", url, err);
      }
    );
  }, [url]);

  return texture;
}

interface ProductPhotoStationProps {
  product: Product;
  color: THREE.Color;
  focus: number;
}

/**
 * 3D Holographic Showcase Plaque for authentic product photography.
 * Blends seamlessly with real product photos on a floating acrylic pedestal.
 */
export function ProductPhotoStation({ product, color, focus }: ProductPhotoStationProps) {
  const texture = useProductTexture(product.image);
  const cardGroup = useRef<THREE.Group>(null);
  const glowRim = useRef<THREE.MeshBasicMaterial>(null);

  useFrame((state, dt) => {
    if (!cardGroup.current) return;
    // Floating levitation bob
    cardGroup.current.position.y = 0.24 + Math.sin(state.clock.elapsedTime * 1.5) * 0.04 * (0.5 + focus * 0.5);
    // Smooth, slow 360-degree turntable rotation
    cardGroup.current.rotation.y += dt * (0.28 + focus * 0.32);

    if (glowRim.current) {
      glowRim.current.opacity = 0.45 + focus * 0.55;
    }
  });

  return (
    <group ref={cardGroup} position={[0, 0.22, 0]}>
      {/* Acrylic Plaque Base with soft clinical white finish for seamless studio photo blending */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.22, 1.22, 0.04]} />
        <meshStandardMaterial
          color="#ffffff"
          roughness={0.12}
          metalness={0.08}
          transparent
          opacity={0.96}
        />
      </mesh>

      {/* Radiant category accent rim */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.25, 1.25, 0.042]} />
        <meshBasicMaterial
          ref={glowRim}
          color={color}
          wireframe
          transparent
          opacity={0.55}
          toneMapped={false}
        />
      </mesh>

      {/* Front Face: Authentic High-Resolution Product Photography */}
      {texture ? (
        <mesh position={[0, 0, 0.022]}>
          <planeGeometry args={[1.18, 1.18]} />
          <meshBasicMaterial
            map={texture}
            transparent
            opacity={0.99}
            toneMapped={false}
          />
        </mesh>
      ) : (
        <mesh position={[0, 0, 0.022]}>
          <planeGeometry args={[1.18, 1.18]} />
          <meshStandardMaterial color="#f0f6fc" />
        </mesh>
      )}

      {/* Back Face: Identical crisp image, flipped horizontally so it reads cleanly from behind */}
      {texture && (
        <mesh position={[0, 0, -0.022]} rotation={[0, Math.PI, 0]} scale={[-1, 1, 1]}>
          <planeGeometry args={[1.18, 1.18]} />
          <meshBasicMaterial
            map={texture}
            transparent
            opacity={0.99}
            toneMapped={false}
          />
        </mesh>
      )}

      {/* Magnetic levitation halo below the plaque */}
      <mesh position={[0, -0.68, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.3, 0.02, 16, 48]} />
        <meshBasicMaterial color={color} transparent opacity={0.6 + focus * 0.4} toneMapped={false} />
      </mesh>

      {/* Floor projection glow under the plaque */}
      <mesh position={[0, -0.86, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.5, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.25 + focus * 0.45} toneMapped={false} />
      </mesh>
    </group>
  );
}
