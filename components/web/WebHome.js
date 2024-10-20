import { useState, useEffect } from 'react';
import Image from 'next/image';
import AboutMePopup from '@/components/web/AboutMePopup';
import ProjectsPopup from '@/components/web/ProjectsPopup';
import AchievementsPopup from '@/components/web/AchievementsPopup';

export default function WebHome() {
  const [openApps, setOpenApps] = useState({
    aboutMe: false,
    projects: false,
    achievements: false,
  });

  const [zIndices, setZIndices] = useState({
    aboutMe: 10,
    projects: 10,
    achievements: 10,
  });

  const [positions, setPositions] = useState({
    aboutMe: { x: 20, y: 20 },
    projects: { x: 40, y: 40 },
    achievements: { x: 60, y: 60 },
  });

  const [sizes, setSizes] = useState({
    aboutMe: { width: 600, height: 400 },
    projects: { width: 600, height: 400 },
    achievements: { width: 600, height: 400 },
  });

  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateWindowSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    updateWindowSize();
    window.addEventListener('resize', updateWindowSize);
    return () => window.removeEventListener('resize', updateWindowSize);
  }, []);

  const handleAppOpen = (appName) => {
    setOpenApps((prevApps) => ({ ...prevApps, [appName]: true }));
    bringToFront(appName);
  };

  const handleAppClose = (appName) => {
    setOpenApps((prevApps) => ({ ...prevApps, [appName]: false }));
  };

  const bringToFront = (appName) => {
    setZIndices((prevZIndices) => ({
      ...prevZIndices,
      [appName]: Math.max(...Object.values(prevZIndices)) + 1,
    }));
  };

  const updatePosition = (appName, newPosition) => {
    setPositions((prevPositions) => ({
      ...prevPositions,
      [appName]: newPosition,
    }));
  };

  const updateSize = (appName, newSize) => {
    setSizes((prevSizes) => ({
      ...prevSizes,
      [appName]: newSize,
    }));
  };

  return (
    <div 
      className="relative h-screen overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: "url('/assets/wallpaper.png')" }}
    >
      <div className="absolute top-0 w-full bg-gray-300 text-black p-2 flex justify-center">
        <h1 className="font-mono">Derek&apos;s Portfolio</h1>
      </div>

      {/* Container for popups */}
      <div className="relative w-full h-full">
        {/* Individual Popups */}
        {openApps.aboutMe && (
          <AboutMePopup 
            onClose={() => handleAppClose('aboutMe')} 
            zIndex={zIndices.aboutMe}
            bringToFront={() => bringToFront('aboutMe')}
            position={positions.aboutMe}
            size={sizes.aboutMe}
            updatePosition={(newPosition) => updatePosition('aboutMe', newPosition)}
            updateSize={(newSize) => updateSize('aboutMe', newSize)}
            windowSize={windowSize}
          />
        )}
        {openApps.projects && (
          <ProjectsPopup 
            onClose={() => handleAppClose('projects')} 
            zIndex={zIndices.projects}
            bringToFront={() => bringToFront('projects')}
            position={positions.projects}
            size={sizes.projects}
            updatePosition={(newPosition) => updatePosition('projects', newPosition)}
            updateSize={(newSize) => updateSize('projects', newSize)}
            windowSize={windowSize}
          />
        )}
        {openApps.achievements && (
          <AchievementsPopup 
            onClose={() => handleAppClose('achievements')} 
            zIndex={zIndices.achievements}
            bringToFront={() => bringToFront('achievements')}
            position={positions.achievements}
            size={sizes.achievements}
            updatePosition={(newPosition) => updatePosition('achievements', newPosition)}
            updateSize={(newSize) => updateSize('achievements', newSize)}
            windowSize={windowSize}
          />
        )}
      </div>

      {/* Dock at the bottom */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex items-center bg-white/70 rounded-t-lg p-2 space-x-3">
        <div
          className="w-12 h-12 cursor-pointer"
          onClick={() => handleAppOpen('aboutMe')}
        >
          <Image src="/assets/aboutme.png" alt="About Me" width={48} height={48} />
        </div>
        <div
          className="w-12 h-12 cursor-pointer"
          onClick={() => handleAppOpen('projects')}
        >
          <Image src="/assets/project.png" alt="Projects" width={48} height={48} />
        </div>
        <div
          className="w-12 h-12 cursor-pointer"
          onClick={() => handleAppOpen('achievements')}
        >
          <Image src="/assets/achievement.png" alt="Achievements" width={48} height={48} />
        </div>
      </div>
    </div>
  );
}
