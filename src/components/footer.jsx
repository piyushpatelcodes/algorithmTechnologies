import { FaGithub ,FaLinkedin } from "react-icons/fa";
import { SiPaloaltonetworks } from "react-icons/si";


export default function Footer() {
    return (
      <footer className="bg-gradient-to-t from-gray-800 to-gray-900 text-white py-4">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
          
          <div className="left-0 mb-4 md:mb-0">
            <h2 className="text-lg font-bold">Company</h2>
            <ul className="flex flex-wrap space-x-4 mt-2">
              <li><a href="/about" className="hover:underline">About Us</a></li>
              <li><a href="/apply" className="hover:underline">Careers</a></li>
              {/* <li><a href="#" className="hover:underline">Blog</a></li> */}
              {/* <li><a href="#" className="hover:underline">Contact</a></li> */}
              <li><a href="#" className="hover:underline">Privacy Policy</a></li>
            </ul>
          </div>
  
          <div className="mb-4 md:mb-0">
            <h2 className="text-lg font-bold">Follow Us</h2>
            <div className="flex space-x-4 mt-2">
              <a href="https://github.com/piyushpatelcodes/" className="hover:text-gray-400">
                <FaGithub className="w-5 h-5"  />
              </a>
              <a href="https://github.com/piyushpatelcodes/" className="hover:text-gray-400">
               <FaLinkedin  className="w-5 h-5"  />
              </a>
              <a href="/" className="hover:text-gray-400">
                <SiPaloaltonetworks className="w-5 h-5"  />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-4 border-t border-gray-700 pt-2 text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} ALGORITHM Technologies. All rights reserved.</p>
        </div>
      </footer>
    );
  }
  