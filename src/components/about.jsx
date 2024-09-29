import React from 'react';
import { FaRust ,FaNodeJs ,FaReact ,FaPython } from 'react-icons/fa';
import { SiNextdotjs ,SiExpress,SiMongodb  } from "react-icons/si";


export default function AboutUs() {
  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gray-900">
       
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
        />
      </div>

      <div className="relative z-10 p-6 max-w-3xl mx-auto text-center text-white">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          About Us
        </h1>
        <p className="mt-4 text-lg leading-relaxed sm:mt-6">
          At ALGORITHM Technologies, we strive to create innovative solutions that empower individuals and businesses. Our mission is to leverage technology to solve real-world problems, making life easier and more efficient for everyone.
        </p>
        <p className="mt-4 text-lg leading-relaxed sm:mt-6">
          Our team is composed of passionate individuals who are dedicated to pushing the boundaries of technology. We believe in continuous learning and improvement, and we embrace challenges as opportunities for growth.
        </p>
        
       

        <div className="mt-6">
          <h2 className="text-2xl font-bold">Our Values</h2>
          <ul className="mt-2 space-y-2 text-left">
            <li className="flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-[#ff80b5]"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 1C4.477 1 0 5.477 0 11c0 5.523 4.477 10 10 10s10-4.477 10-10S15.523 1 10 1zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z" />
                <path d="M10 4a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm1 9H9v-1h2v1z" />
              </svg>
              Innovation
            </li>
            <li className="flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-[#ff80b5]"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 1C4.477 1 0 5.477 0 11c0 5.523 4.477 10 10 10s10-4.477 10-10S15.523 1 10 1zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z" />
                <path d="M10 4a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm1 9H9v-1h2v1z" />
              </svg>
              Integrity
            </li>
            <li className="flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-[#ff80b5]"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 1C4.477 1 0 5.477 0 11c0 5.523 4.477 10 10 10s10-4.477 10-10S15.523 1 10 1zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z" />
                <path d="M10 4a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm1 9H9v-1h2v1z" />
              </svg>
              Excellence
            </li>
          </ul>
        </div>

         {/* MERN Stack Logos Section */}
         <div className="mt-8">
          <h2 className="text-2xl font-bold">Technologies We Use</h2>
          <div className="flex justify-center space-x-6 mt-4 text-4xl"> 
          
          <SiMongodb className="text-green-500" title="Node.js" />
          <SiExpress   title="Next.js" />
            <FaReact className="text-blue-600" title="React" />
            <FaNodeJs className="text-green-500" title="Node.js" />
            <SiNextdotjs  title="Next.js" />
            <FaPython className="text-amber-300" title="Python" />
            <FaRust className="text-gray-400" title="Rust" />
            
            
          </div>
        </div>

        {/* Avatars Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold">Meet Our Team</h2>
          <div className="flex justify-center space-x-4 mt-4">
            <div className="flex flex-col items-center">
              <img
                src="robot.jpeg"
                alt="Team Member 1"
                className="w-24 h-24 rounded-full border-4 border-[#ff80b5] shadow-lg"
              />
              <p className="mt-2 text-sm">Piyush Patel</p>
              <p className="text-xs text-gray-400">Lead Developer</p>
            </div>
            <div className="flex flex-col items-center">
              <img
                src="developer.jpeg"
                alt="Team Member 2"
                className="w-24 h-24 rounded-full border-4 border-[#ff80b5] shadow-lg"
              />
              <p className="mt-2 text-sm">Amarjeet Kumar</p>
              <p className="text-xs text-gray-400">Accounts Manager</p>
            </div>
            <div className="flex flex-col items-center">
              <img
                src="java.jpeg"
                alt="Team Member 3"
                className="w-24 h-24 rounded-full border-4 border-[#ff80b5] shadow-lg"
              />
              <p className="mt-2 text-sm">Akash Kant</p>
              <p className="text-xs text-gray-400">Product Manager</p>
            </div>
          </div>
        </div>


      </div>
      
    </div>
  );
}
