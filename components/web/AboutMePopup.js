import { useCallback } from 'react';
import Image from 'next/image';
import Draggable from 'react-draggable';
import { Resizable } from 'react-resizable';
import 'react-resizable/css/styles.css';

export default function AboutMePopup({ onClose, zIndex, bringToFront, position, size, updatePosition, updateSize }) {
  const handleDrag = useCallback((e, ui) => {
    updatePosition({ x: ui.x, y: ui.y });
  }, [updatePosition]);

  const handleResize = useCallback((e, { size: newSize, handle }) => {
    const deltaX = newSize.width - size.width;
    const deltaY = newSize.height - size.height;
    
    updateSize(newSize);
    
    if (handle.includes('w')) {
      updatePosition({ x: position.x - deltaX, y: position.y });
    }
    if (handle.includes('n')) {
      updatePosition({ x: position.x, y: position.y - deltaY });
    }
  }, [size, position, updatePosition, updateSize]);

  return (
    <Draggable
      handle=".popup-header"
      onStart={bringToFront}
      position={position}
      onDrag={handleDrag}
    >
      <Resizable
        width={size.width}
        height={size.height}
        onResize={handleResize}
        minConstraints={[400, 300]}
        maxConstraints={[window.innerWidth * 0.9, window.innerHeight * 0.9]}
        className="absolute border border-gray-300 rounded-lg shadow-lg bg-white overflow-hidden"
        style={{ zIndex, position: 'absolute' }}
      >
        <div style={{ width: size.width, height: size.height }} className="flex flex-col">
          {/* Header */}
          <div className="popup-header flex items-center justify-between p-2 bg-gradient-to-b from-gray-200 to-gray-300 border-b border-gray-400">
            <div className="flex space-x-2">
              <button className="w-3 h-3 bg-red-500 rounded-full" onClick={onClose} />
              <button className="w-3 h-3 bg-yellow-500 rounded-full" />
              <button className="w-3 h-3 bg-green-500 rounded-full" />
            </div>
            <div className="text-center text-sm font-semibold">About Me</div>
            <div className="w-16"></div>
          </div>

          {/* Toolbar */}
          <div className="flex items-center space-x-2 p-2 bg-gray-100 border-b border-gray-300">
            {['⬅️', '➡️', '🔄', '🏠', '➕'].map((icon, index) => (
              <button key={index} className="w-8 h-8 flex items-center justify-center bg-white border border-gray-300 rounded">
                {icon}
              </button>
            ))}
            <input 
              type="text" 
              className="flex-grow h-8 px-2 border border-gray-300 rounded bg-gray-50 text-gray-500" 
              value="portfolio/aboutme.html" 
              readOnly
            />
          </div>

          {/* Content */}
          <div className="flex-grow flex overflow-hidden">
            {/* Left section (fixed) */}
            <div className="w-1/3 p-4 overflow-y-auto">
              <h1 className="text-3xl font-bold mb-2">Liew Qi Jian</h1>
              <h2 className="text-xl text-gray-600 mb-4">Student</h2>
              <p className="text-l mb-4">
              Pursuing a Bachelor&apos;s degree in Computer Science specialize in Data Science at TARUMT. Currently the Founder and President of TARUMT Blockchain Club.</p>
              <div className="social-links mb-4 space-y-2">
                <a href="mailto:derekliew0@gmail.com" className="flex items-center space-x-2" target="_blank" rel="noopener noreferrer">
                  <Image src="https://static.vecteezy.com/system/resources/previews/022/613/021/non_2x/google-mail-gmail-icon-logo-symbol-free-png.png" alt="Gmail" width={24} height={24} className="object-contain" />
                  <span>derekliew0@gmail.com</span>
                </a>
                <a href="https://www.instagram.com/liew_qijian/" className="flex items-center space-x-2" target="_blank" rel="noopener noreferrer">
                  <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/2048px-Instagram_logo_2016.svg.png" alt="Instagram" width={24} height={24} className="object-contain" />
                  <span>liew_qijian</span>
                </a>
                <a href="https://www.linkedin.com/in/derek2403" className="flex items-center space-x-2" target="_blank" rel="noopener noreferrer">
                  <Image src="https://i.pinimg.com/originals/b2/f8/28/b2f828513f21444829a619ce563d4d4e.png" alt="LinkedIn" width={24} height={24} className="object-contain" />
                  <span>derek2403</span>
                </a>
                <a href="https://github.com/derek2403/" className="flex items-center space-x-2" target="_blank" rel="noopener noreferrer">
                  <Image src="https://cdn.worldvectorlogo.com/logos/github-icon-2.svg" alt="GitHub" width={24} height={24} className="object-contain" />
                  <span>derek2403</span>
                </a>
                <a href="https://x.com/derek2403?s=21" className="flex items-center space-x-2" target="_blank" rel="noopener noreferrer">
                  <Image src="https://freelogopng.com/images/all_img/1657045444twitter-logo-transparent-png.png" alt="X (Twitter)" width={24} height={24} className="object-contain" />
                  <span>@derek2403</span>
                </a>
                <a href="https://t.me/dxx_j" className="flex items-center space-x-2" target="_blank" rel="noopener noreferrer">
                  <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Telegram_2019_Logo.svg/2048px-Telegram_2019_Logo.svg.png" alt="Telegram" width={24} height={24} className="object-contain" />
                  <span>@dxx_j</span>
                </a>
                <a href="https://api.whatsapp.com/send/?phone=60127173985&text&type=phone_number&app_absent=0" className="flex items-center space-x-2" target="_blank" rel="noopener noreferrer">
                  <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/2044px-WhatsApp.svg.png" alt="WhatsApp" width={24} height={24} className="object-contain" />
                  <span>+60127173985</span>
                </a>
              </div>
            </div>

            {/* Right section (scrollable) */}
            <div className="w-2/3 p-4 space-y-4 overflow-y-auto">
              <div className="bg-gray-100 rounded-lg p-4">
                <h3 className="text-xl font-semibold mb-2">Background</h3>
                <p>I am passionate about software development, Web3, and AI, actively participating in projects, hackathons, and research. I aim to drive impact through open-source contributions and transformative solutions, with a focus on software engineering, data science, and blockchain.</p>
              </div>
              <div className="bg-gray-100 rounded-lg p-4">
                <h3 className="text-xl font-semibold mb-2">Current Focus</h3>
                <p>Current Focus

I am currently focused on Web3 and AI, exploring innovative technologies that bridge Web2 and Web3 to drive user adoption. My primary interests within Web3 include DeFi, infrastructure, and DePIN, where I aim to build solutions that enhance accessibility and functionality. Simultaneously, I am delving into AI development, creating tools that address everyday challenges and improve quality of life. My goal is to leverage both Web3 and AI to deliver impactful, real-world solutions.</p>
              </div>
              <div className="bg-gray-100 rounded-lg p-4">
                <h3 className="text-xl font-semibold mb-2">Experience</h3>
                <div className="mb-2">
                  <h4 className="font-semibold">Technical Executive at KW Furniture Hardware</h4>
                  <p className="text-sm text-gray-600">2021 — Present</p>
                  <p>Address and resolve database issues within the company. Troubleshoot and provide solutions for technical and IT-related problems.</p>
                </div>
                <div className="mb-2">
                  <h4 className="font-semibold">Part Time Tuition Teacher at Little Master Education Holdings</h4>
                  <p className="text-sm text-gray-600">2024 — Present</p>
                  <p>Instructs children in English, Chinese, and Bahasa Malaysia. Provides guidance and solutions to enhance their learning experience, helping them to become better students.</p>
                </div>
              </div>
              <div className="bg-gray-100 rounded-lg p-4">
                <h3 className="text-xl font-semibold mb-2">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {['Web Deveolpment', 'Patient Education', 'AI', 'Database','Web3','Programming','Backend Development','Frontend Development','Machine Learning','Leadership'].map((skill, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-200 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="bg-gray-100 rounded-lg p-4">
                <h3 className="text-xl font-semibold mb-2">Education</h3>
                <div className="space-y-4">
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <h4 className="font-semibold">High School in Science Stream</h4>
                    <p className="text-sm text-gray-600">Chong Hwa Independent High School, 2016-2021</p>
                    <p className="text-sm font-medium mt-1">Roles & Achievements:</p>
                    <ul className="list-disc list-inside text-sm ml-2">
                      <li>Vice President of Chong Hwa Lion Dance Club</li>
                    </ul>
                    <h4 className="font-semibold mt-4">A-Levels in Computer Science, Physics, and Mathematics</h4>
                    <p className="text-sm text-gray-600">Tunku Abdul Rahman University of Management and Technology, 2022-2024</p>
                    <p className="text-sm font-medium mt-1">Roles & Achievements:</p>
                    <ul className="list-disc list-inside text-sm ml-2">
                      <li>Lion Dance Performer in Kwong Ngai Lion Dance</li>
                    </ul>
                    <h4 className="font-semibold mt-4">Bachelor of Computer Science in Data Science</h4>
                    <p className="text-sm text-gray-600">Tunku Abdul Rahman University of Management and Technology, 2024</p>
                    <p className="text-sm font-medium mt-1">Roles & Achievements:</p>
                    <ul className="list-disc list-inside text-sm ml-2">
                      <li>Founder and President of TARUMT Blockchain Club</li>
                      <li>Dean&apos;s List and President&apos;s List awardee in 2024</li>
                      <li>Various Hackathon Participant and Winner</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="bg-gray-100 rounded-lg p-4">
                <h3 className="text-xl font-semibold mb-2">Interests</h3>
                <p>I am passionate about programming, AI, blockchain, and software development. I enjoy exploring new frameworks, participating in hackathons, and contributing to open-source projects. Outside of tech, I have a strong interest in sports like table tennis and basketball, as well as music appreciation.</p>
              </div>
            </div>
          </div>
        </div>
      </Resizable>
    </Draggable>
  );
}