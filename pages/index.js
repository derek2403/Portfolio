"use client";
import { useState, useEffect } from 'react';
import MobileHome from '@/components/mobile/MobileHome';
import WebHome from '@/components/web/WebHome';

// Custom hook to detect screen size and device type
const useDeviceDetect = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Function to check the device based on screen width
    const checkDevice = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768); // Mobile breakpoint
    };

    // Check device on initial render
    checkDevice();

    // Add event listener for window resize
    window.addEventListener('resize', checkDevice);

    // Cleanup on component unmount
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  return isMobile;
};

export default function Home() {
  const isMobile = useDeviceDetect();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Ensure client-side rendering to avoid hydration issues
    setIsClient(true);
  }, []);

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      {isClient && (
        <>
          {isMobile ? <MobileHome /> : <WebHome />}
        </>
      )}
    </div>
  );
}