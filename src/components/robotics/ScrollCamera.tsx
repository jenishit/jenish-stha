'use client';

import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useState } from 'react';

export default function ScrollCamera() {
  const { camera } = useThree();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame(() => {
    // Smooth camera movement based on scroll
    camera.position.z = Math.max(5, 10 - scrollY * 0.003);
    camera.position.y = 2 + scrollY * 0.001;

    // Tilt camera slightly based on scroll
    camera.rotation.x = -Math.min(0.5, scrollY * 0.0001);
  });

  return null;
}
