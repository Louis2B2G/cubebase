import React, { useEffect, useRef, useState, useMemo } from 'react';
import { ChevronRight, FileText, Shield, Zap, Mail, Plus, Upload, Download, Menu, X, Check, Puzzle, Scale, Eye, Ghost, Code, Terminal, ArrowLeft, ArrowRight } from 'lucide-react';
import * as THREE from 'three';
import { createRoot } from 'react-dom/client';
import DashboardMetrics from '../components/Metrics';
import Form from '../components/Form';
import Cube from '../components/Cube';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { createGlobalStyle } from 'styled-components';
import FloatingKeywords from '../components/FloatingKeywords';

type InvestorLogo = {
  src: string;
  alt: string;
};

type PricingTier = {
  name: string;
  price: string;
  description: string;
  features: string[];
  buttonText: string;
  isPopular?: boolean;
};

type AnnouncementModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type ScrollProgress = {
  currentIndex: number;
};

type ScrollSection = {
  text: string[];
  isSmall: boolean;
};

const INVESTOR_LOGOS: InvestorLogo[] = [
  { src: '/investors/k5.png', alt: 'K5 Global' },
  { src: '/investors/google.png', alt: 'Google' },
  //{ src: '/investors/vf.png', alt: 'Venture Friends' },
  //{ src: '/investors/kima.png', alt: 'Kima Ventures' },
  { src: '/investors/olivier.png', alt: 'Olivier Pomel' },
  //{ src: '/investors/florian.png', alt: 'Florian Douetteau' },
  //{ src: '/investors/mei.png', alt: 'Mei Z.' },
  //{ src: '/investors/transpose.png', alt: 'Transpose Platform' },
  //{ src: '/investors/stemai.png', alt: 'StemAI' },
  //{ src: '/investors/ef.png', alt: 'Entrepreneur First' },
  //{ src: '/investors/manish.png', alt: 'Manish Kothari' },
  //{ src: '/investors/ketan.png', alt: 'Ketan Kothari' },
];

const CORE_FEATURES = [
  {
    icon: 'Puzzle',
    title: 'Seamless Integration',
    description: 'Drop-in replacement for your existing browser automation code. Works with Playwright, Puppeteer, or Selenium - no code changes needed. Direct connection via Chrome DevTools Protocol.'
  },
  {
    icon: 'Scale',
    title: 'Scalable',
    description: 'Launch thousands of concurrent browser instances instantly. Our serverless infrastructure eliminates wait times and handles all scaling automatically.'
  },
  {
    icon: 'Zap',
    title: 'Fast',
    description: 'Edge-located browsers minimize latency between browsers and your users. Each browser instance runs on dedicated 4 vCPU hardware for maximum performance.'
  },
  {
    icon: 'Shield',
    title: 'Secure',
    description: 'Fully isolated browser instances with SOC-2 Type 1 and HIPAA compliance. Available as self-hosted for complete control. Configurable logging lets you manage sensitive data.'
  },
  {
    icon: 'Eye',
    title: 'Observable',
    description: 'Monitor browser activity in real-time with our embeddable Live View. Enable direct user control of browser sessions. Full session recording with source capture for easy debugging.'
  },
  {
    icon: 'Ghost',
    title: 'Stealth',
    description: 'Built-in captcha solving, residential proxies, and browser fingerprinting keep your automations undetected. Smart proxy routing automatically selects optimal IPs for each target.'
  },
  {
    icon: 'Code',
    title: 'Extensible',
    description: 'Full API support for file operations and custom browser extensions. Persist cookies and browser state across sessions with our Contexts API. Official Node.js and Python SDKs.'
  },
  {
    icon: 'Terminal',
    title: 'Developer First',
    description: 'Start coding in minutes with our Browser Playground and AI code generator. Detailed documentation covers performance optimization, parallel execution, and authentication patterns.'
  }
];

const USE_CASES = [
  {
    title: 'Give your AI Agents a Browser',
    description: 'Real-time human-in-the-loop controls using our Live View feature for enhanced oversight and flexibility. Integrations with all major AI SDKs that work right out of the box.',
    media: {
      type: 'video',
      src: 'videobrowsing.mov'
    }
  },
  {
    title: 'Automate Web Workflows',
    description: 'Convert manual web tasks into automated code. Navigate complex web flows programmatically, fill forms with precision, and handle file operations automatically.',
    media: {
      type: 'image',
      src: '/images/workflows.png'
    }
  },
  {
    title: 'Reliable, Adaptive Web Scraping',
    description: 'Extract data reliably from any website, including dynamic pages requiring user interaction. Automate data collection at scale with built-in error handling.',
    media: {
      type: 'image',
      src: '/images/scrape.png'
    }
  }
];

// Update SCROLL_SECTIONS with the type
const SCROLL_SECTIONS: ScrollSection[] = [
  {
    text: ["Deploying virtual browsers at scale", "is hard."],
    isSmall: false
  },
  {
    text: ["Build your application,", "we'll handle the infra."],
    isSmall: false
  },
  {
    text: ["One line of code.", "Infinite virtual browsers."],
    isSmall: false
  }
];

const SHOW_SCROLLING_INVESTORS = false;  // Toggle this to switch between scrolling and static

const MouseTracker = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div
      className="fixed w-32 h-32 pointer-events-none z-10"
      animate={{
        x: mousePosition.x - 64,
        y: mousePosition.y - 64,
      }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 15,
        mass: 0.1
      }}
    >
      <div className="w-full h-full rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 blur-xl" />
    </motion.div>
  );
};

const ScrollSections = () => {
  const { scrollYProgress } = useScroll();
  
  const heroScale = useSpring(useTransform(scrollYProgress, [0, 0.2], [1, 0.7]), {
    stiffness: 200,
    damping: 20
  });
  
  const gridScale = useSpring(useTransform(scrollYProgress, [0, 1], [1, 2]), {
    stiffness: 50,
    damping: 30
  });

  const [scrollProgress, setScrollProgress] = useState<ScrollProgress>({ currentIndex: 0 });

  useEffect(() => {
    const handleScroll = () => {
      const viewportHeight = window.innerHeight;
      const scrolled = window.scrollY;
      const progress = Math.min(scrolled / (viewportHeight * 6), 1);
      const currentIndex = Math.floor(progress * 5); // Adjust based on number of sections
      setScrollProgress({ currentIndex });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="lg:mb-0 mb-8">
      <div className="relative w-full max-w-6xl mx-auto px-8">
        <div className="h-[300vh] pointer-events-none">
          <div className="sticky top-0 h-screen flex items-center justify-center">
            <ParticleEffect />
            {SCROLL_SECTIONS.map((section, index) => (
              <motion.div
                key={index}
                className="absolute"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: scrollProgress.currentIndex === index ? 1 : 0
                }}
                transition={{ duration: 0.5 }}
              >
                {(index === 1 || index === 2) ? (
                  <div className="flex flex-col items-center">
                    <div className="mb-20">
                      <Cube width={300} height={300} />
                    </div>
                    <h2 className={`${section.isSmall ? 'text-2xl lg:text-4xl' : 'text-5xl lg:text-8xl'} font-bold text-center`}>
                      {section.text.map((line: string, i: number) => (
                        <div
                          key={i}
                          className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500"
                        >
                          {line}
                        </div>
                      ))}
                    </h2>
                  </div>
                ) : (
                  <h2 className={`${section.isSmall ? 'text-2xl lg:text-4xl' : 'text-5xl lg:text-8xl'} font-bold text-center`}>
                    {section.text.map((line: string, i: number) => (
                      <div
                        key={i}
                        className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500"
                      >
                        {line}
                      </div>
                    ))}
                  </h2>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ParticleEffect = () => (
  <div className="fixed inset-0 pointer-events-none">
    {[...Array(1000)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
        style={{
          width: Math.random() * 4 + 1 + 'px',
          height: Math.random() * 4 + 1 + 'px',
          opacity: Math.random() * 0.5 + 0.2,
        }}
        initial={{
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight * 60,
        }}
        animate={{
          y: [null, -window.innerHeight * 6],
          x: [null, Math.random() * 200 - 100],
        }}
        transition={{
          duration: Math.random() * 15 + 15,
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
          delay: Math.random() * 5,
        }}
      />
    ))}
  </div>
);

const Landing = () => {
  const desktopMountRef = useRef<HTMLDivElement | null>(null);
  const mobileMountRef = useRef<HTMLDivElement | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showGetStartedModal, setShowGetStartedModal] = useState(false);
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);
  const cursorLightRef = useRef<THREE.PointLight | null>(null);
  const { scrollYProgress } = useScroll();
  const [showScrolling, setShowScrolling] = useState(true);
  
  const heroScale = useSpring(useTransform(scrollYProgress, [0, 0.2], [1, 0.7]), {
    stiffness: 200,
    damping: 20
  });
  
  const gridScale = useSpring(useTransform(scrollYProgress, [0, 1], [1, 2]), {
    stiffness: 50,
    damping: 30
  });

  const [scrollProgress, setScrollProgress] = useState<ScrollProgress>({ currentIndex: 0 });

  useEffect(() => {
    // Helper function to check if an element is visible
    const isElementVisible = (element: HTMLElement | null) => {
      if (!element) return false;
      const style = window.getComputedStyle(element);
      return style.display !== 'none' && style.visibility !== 'hidden';
    };

    // Only get the visible mount point
    const mount = isElementVisible(desktopMountRef.current) ? desktopMountRef.current : 
                  isElementVisible(mobileMountRef.current) ? mobileMountRef.current : null;
    
    if (!mount) return;

    // Scene setup with fog for light diffusion
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    scene.fog = new THREE.FogExp2(0x000000, 0.05);

    // Camera adjustment for better perspective
    const camera = new THREE.PerspectiveCamera(
      45,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 7;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mount.appendChild(renderer.domElement);

    // Create a bigger geometry from the start
    const geometry = new THREE.BoxGeometry(3, 3, 3);
    const material = new THREE.MeshPhysicalMaterial({
      color: 0x000000,
      metalness: 1,
      roughness: 0.1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.4,
      fog: true
    });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Add white edges to the cube at the same scale
    const edges = new THREE.EdgesGeometry(geometry);
    const lineMaterial = new THREE.LineBasicMaterial({ 
      color: 0x000000,
      linewidth: 0,
      fog: true
    });
    const wireframe = new THREE.LineSegments(edges, lineMaterial);
    cube.add(wireframe);

    // Light setup from top-right
    const mainLight = new THREE.PointLight(0xffffff, 300, 100);
    mainLight.position.set(5, 5, 3);
    scene.add(mainLight);

    // Add volumetric light effect
    const lightGeometry = new THREE.SphereGeometry(0.5, 16, 16);
    const lightMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.5,
      fog: true
    });
    const lightSphere = new THREE.Mesh(lightGeometry, lightMaterial);
    lightSphere.position.copy(mainLight.position);
    scene.add(lightSphere);

    // Subtle secondary light for balance
    const secondaryLight = new THREE.PointLight(0xffffff, 100, 100);
    secondaryLight.position.set(-3, 2, 3);
    scene.add(secondaryLight);

    // Ambient light for overall visibility
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    // Add cursor light
    const cursorLight = new THREE.PointLight(0xffffff, 150, 10);
    cursorLight.position.set(0, 0, 5);
    scene.add(cursorLight);
    cursorLightRef.current = cursorLight;

    // Add mouse move handler
    const handleMouseMove = (event: MouseEvent) => {
      if (!cursorLightRef.current || !mount) return;

      // Convert mouse position to normalized device coordinates (-1 to +1)
      const rect = mount.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      // Update light position
      cursorLightRef.current.position.set(x * 5, y * 5, 5);
    };

    mount.addEventListener('mousemove', handleMouseMove);

    // Add more dynamic lighting
    const spotLight = new THREE.SpotLight(0x4444ff, 100);
    spotLight.position.set(0, 10, 10);
    spotLight.angle = Math.PI / 4;
    spotLight.penumbra = 0.1;
    spotLight.decay = 2;
    spotLight.distance = 200;
    scene.add(spotLight);

    // Add floating particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 1000;
    const positions = new Float32Array(particleCount * 3);
    
    for(let i = 0; i < particleCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 20;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.0,
      transparent: true,
      opacity: 0.5
    });
    
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Enhanced animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      cube.rotation.x += 0.005;
      cube.rotation.y += 0.005;
      
      // Animate particles
      particles.rotation.y += 0.0005;
      const positions = particles.geometry.attributes.position.array;
      for(let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(Date.now() * 0.001 + positions[i]) * 0.01;
      }
      particles.geometry.attributes.position.needsUpdate = true;
      
      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      const width = mount.clientWidth;
      const height = mount.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      mount.removeEventListener('mousemove', handleMouseMove);
      mount.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      edges.dispose();
      lineMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  // Function to handle documentation click
  const handleDocumentationClick = () => {
    window.location.href = 'https://cube.docs.buildwithfern.com/getting-started/introduction';
  };

  // Add these scroll handler functions
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const MobileMenu = () => (
    <div className={`md:hidden fixed inset-0 bg-black z-50 transform transition-transform duration-300 ease-in-out ${
      isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
    }`}>
      <div className="flex justify-end p-4">
        <button onClick={() => setIsMobileMenuOpen(false)} className="p-2">
          <X className="h-6 w-6" />
        </button>
      </div>
      <div className="flex flex-col items-center gap-8 pt-12">
        <button onClick={handleDocumentationClick} className="text-xl text-gray-400 hover:text-white">
          Documentation
        </button>
        <button 
          onClick={() => {
            scrollToSection('features');
            setIsMobileMenuOpen(false);
          }} 
          className="text-xl text-gray-400 hover:text-white"
        >
          Features
        </button>
        <button 
          onClick={() => {
            scrollToSection('use-cases');
            setIsMobileMenuOpen(false);
          }} 
          className="text-xl text-gray-400 hover:text-white"
        >
          Use Cases
        </button>
        <button 
          onClick={() => setShowGetStartedModal(true)} 
          className="w-64 px-6 py-3 bg-white text-black rounded-full hover:bg-gray-200"
        >
          Get Started
        </button>
      </div>
    </div>
  );

  const GetStartedModal = () => {
    console.log('Modal rendering, showGetStartedModal:', showGetStartedModal);
    return (
      <div 
        className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] transition-all duration-300 ${
          showGetStartedModal ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex items-center justify-center min-h-screen p-4">
          <div className="bg-[#0B0F17] p-8 rounded-2xl max-w-xl w-full mx-4 relative">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-4xl font-bold">Get in touch with us</h2>
              <button 
                onClick={() => setShowGetStartedModal(false)} 
                className="text-gray-400 hover:text-white"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <form className="space-y-6">
              <div>
                <label className="block text-lg mb-2">Company Name</label>
                <input 
                  type="text" 
                  className="w-full bg-black border border-gray-800 rounded-lg p-3 focus:border-white focus:outline-none text-gray-300"
                  placeholder="Enter your company name"
                />
              </div>
              
              <div>
                <label className="block text-lg mb-2">Email</label>
                <input 
                  type="email" 
                  className="w-full bg-black border border-gray-800 rounded-lg p-3 focus:border-white focus:outline-none text-gray-300"
                  placeholder="you@company.com"
                />
              </div>
              
              <div>
                <label className="block text-lg mb-2">Expected Monthly Extractions</label>
                <select className="w-full bg-black border border-gray-800 rounded-lg p-3 focus:border-white focus:outline-none text-gray-300 appearance-none">
                  <option value="">Select volume</option>
                  <option value="1000">Up to 1,000</option>
                  <option value="10000">1,000 - 10,000</option>
                  <option value="50000">10,000 - 50,000</option>
                  <option value="unlimited">50,000+</option>
                </select>
              </div>

              <div>
                <label className="block text-lg mb-2">Use Case</label>
                <textarea 
                  className="w-full bg-black border border-gray-800 rounded-lg p-3 focus:border-white focus:outline-none text-gray-300 h-24"
                  placeholder="Brief description of your use case"
                />
              </div>

              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  id="terms" 
                  className="rounded bg-black border-gray-800"
                />
                <label htmlFor="terms" className="text-gray-400">
                  I agree to the{' '}
                  <a href="#" className="text-white hover:underline">Terms of Service</a>
                  {' '}and{' '}
                  <a href="#" className="text-white hover:underline">Privacy Policy</a>
                </label>
              </div>

              <button 
                type="submit" 
                className="w-full bg-white text-black rounded-full py-4 font-medium hover:bg-gray-200 transition-colors text-lg"
              >
                Create Account
              </button>

              <p className="text-center text-gray-400">
                Already have an account?{' '}
                <button className="text-white hover:underline">Sign in</button>
              </p>
            </form>
          </div>
        </div>
      </div>
    );
  };

  const AnnouncementModal = ({ isOpen, onClose }: AnnouncementModalProps) => (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-start justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className="bg-gray-900 p-8 rounded-xl max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto mt-20"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 500 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-3xl font-bold">Cube Raises $3.5M Pre-Seed Round</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-white">
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-gray-300 mb-6">
                We're excited to announce that Cube has raised $3.5M in pre-seed funding to build programmable web browser infrastructure for AI. While humans have browsers like Chrome and Firefox, AI needs reliable, scalable browser infrastructure. The round was led by K5 Global, with participation from Venture Friends, Kima Ventures, and notable angel investors including Olivier Pomel (Datadog), Florian Douetteau (Dataiku), and other industry leaders.
              </p>

              <h3 className="text-xl font-bold mb-4">The Problem</h3>
              <p className="text-gray-300 mb-6">
                Running browsers at scale is a massive engineering challenge. Our customers face daily headaches with "captcha solving", "state persistence", "cookies", "proxies", "websocket routing", "chrome flags", "process management", "session recording", and more. These challenges shouldn't be their focus.
              </p>

              <h3 className="text-xl font-bold mb-4">Our Solution</h3>
              <p className="text-gray-300 mb-6">
                Cube provides the infrastructure layer for AI to reliably use the web. As software evolves to do more work for us, it needs to browse the web just like humans do. Our infrastructure handles the complex stateful distributed system so you can focus on building.
              </p>

              <h3 className="text-xl font-bold mb-4">The Team</h3>
              <p className="text-gray-300 mb-6">
                Founded by Louis de Benoist, Victor Plaisance, and Sacha Ichbiah, Cube brings deep expertise in distributed systems and browser infrastructure. The founding team built and scaled similar systems at companies like Twilio, where they learned firsthand the challenges of running stateful distributed systems at scale. Based in San Francisco, the team has already grown to more than 10 members and is actively expanding.
              </p>

              <h3 className="text-xl font-bold mb-4">Join Us</h3>
              <p className="text-gray-300 mb-6">
                Whether you're building AI agents, automating workflows, or scaling web operations, Cube provides the infrastructure you need. We're excited to serve customers who share our vision of making the web programmatically accessible. Visit cube.com to start your free trial today.
              </p>

              <p className="text-gray-300 italic">
                The future of software is software that does work for us. Join us in building that future.
              </p>

              <div className="flex flex-wrap gap-4 mt-8">
                <button 
                  onClick={() => window.location.href = 'https://cube.docs.buildwithfern.com'} 
                  className="px-6 py-3 bg-white text-black rounded-full hover:bg-gray-200"
                >
                  View Documentation
                </button>
                <button 
                  onClick={() => window.location.href = 'https://getcube.ai/careers'} 
                  className="px-6 py-3 border border-gray-700 rounded-full hover:bg-gray-900"
                >
                  View Open Positions
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const UseCasesSection = () => {
    return (
      <div className="container mx-auto px-4 py-24">
        <h2 className="text-4xl font-bold mb-16 text-center">Use Cases</h2>
        <div className="space-y-12">
          <div className="bg-black p-8 rounded-xl border border-white/10 hover:border-white/20 transition-colors">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h3 className="text-3xl font-bold mb-4">
                  Give your AI Agents a Browser
                </h3>
                <p className="text-gray-400 text-lg">
                  Real-time human-in-the-loop controls using our Live View feature for enhanced oversight and flexibility. Integrations with all major AI SDKs that work right out of the box.
                </p>
              </div>
              <div className="relative h-[400px] rounded-xl overflow-hidden bg-gray-800">
                <video 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  ref={(el) => {
                    if (el) {
                      el.playbackRate = 2.0;
                    }
                  }}
                  style={{ 
                    pointerEvents: 'none',
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    position: 'absolute',
                    top: 0,
                    left: 0
                  }}
                >
                  <source src="videobrowsing.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20" />
              </div>
            </div>
          </div>

          {/* Second Card - Image */}
          <div className="bg-black p-8 rounded-xl border border-white/10 hover:border-white/20 transition-colors">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h3 className="text-3xl font-bold mb-4">
                  Automate Web Workflows
                </h3>
                <p className="text-gray-400 text-lg">
                  Convert manual web tasks into automated code. Navigate complex web flows programmatically, fill forms with precision, and handle file operations automatically.
                </p>
              </div>
              <div className="relative h-[400px] rounded-xl overflow-hidden bg-gray-800">
                <img
                  src="images/workflow.gif"
                  alt="Automate Web Workflows"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20" />
              </div>
            </div>
          </div>

          {/* Third Card - Image */}
          <div className="bg-black p-8 rounded-xl border border-white/10 hover:border-white/20 transition-colors">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h3 className="text-3xl font-bold mb-4">
                  Reliable, Adaptive Web Scraping
                </h3>
                <p className="text-gray-400 text-lg">
                  Extract data reliably from any website, including dynamic pages requiring user interaction. Automate data collection at scale with built-in error handling.
                </p>
              </div>
              <div className="relative h-[400px] rounded-xl overflow-hidden bg-gray-800">
                <img
                  src="/images/scrape.png"
                  alt="Web Scraping"
                  className="absolute p-5 inset-0 h-full w-full"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    // Create parallax effect for grid lines
    const handleScroll = () => {
      const gridElements = document.querySelectorAll('.grid-line');
      const scrolled = window.pageYOffset;
      
      gridElements.forEach((el, index) => {
        const element = el as HTMLElement;
        const speed = index % 2 === 0 ? 0.2 : -0.2;
        element.style.transform = `translateX(${scrolled * speed}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Nav bar moved outside of everything else */}
      <nav className="fixed top-0 left-0 right-0 w-full z-[9999] px-4 py-4">
        <div className="max-w-6xl mx-auto">
          <div className="backdrop-blur-xl bg-white/[0.02] rounded-full px-6 py-3 border border-white/10 shadow-lg">
            <div className="flex justify-between items-center">
              {/* Logo */}
              <div className="flex-shrink-0">
                <img src="logos/cube_white.png" alt="Cube" className="h-4 w-auto" />
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                <button 
                  onClick={handleDocumentationClick}
                  className="text-gray-200 hover:text-white transition-colors"
                >
                  Documentation
                </button>
                <button 
                  onClick={() => scrollToSection('features')}
                  className="text-gray-200 hover:text-white transition-colors"
                >
                  Features
                </button>
                <button 
                  onClick={() => scrollToSection('use-cases')}
                  className="text-gray-200 hover:text-white transition-colors"
                >
                  Use Cases
                </button>
                <button 
                  onClick={() => setShowGetStartedModal(true)}
                  className="px-6 py-2 bg-white text-black rounded-full hover:bg-gray-200 transition-colors"
                >
                  Get Started
                </button>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <button 
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="p-2 text-gray-300 hover:text-white"
                >
                  <Menu className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Only show FloatingKeywords when we're at index 1 */}
      {scrollProgress.currentIndex === 1 && <FloatingKeywords />}

      <motion.div className="min-h-screen bg-black text-white relative">
        {/* Hero Section */}
        <motion.section 
          className="relative min-h-screen flex items-center justify-center z-[2]"
          style={{ scale: heroScale }}
        >
          {/* Grid Background - Lowest z-index */}
          <motion.div 
            className="absolute top-0 left-0 right-0 z-[-1]"
            style={{ 
              scale: gridScale,
              height: '90vh',
              clipPath: 'inset(0 0 0 0)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
              maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)'
            }}
          >
            <div className="absolute inset-0">
              {[...Array(40)].map((_, i) => (
                <motion.div
                  key={i}
                  className="grid-line absolute h-[2px] w-full bg-gradient-to-r from-transparent via-purple-500/40 to-transparent"
                  initial={{ 
                    opacity: 0,
                    top: 0
                  }}
                  animate={{ 
                    opacity: 0.8,
                    top: `${i * 2.5}vh`
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 50,
                    damping: 20,
                    delay: i * 0.02
                  }}
                  style={{
                    left: 0,
                    transform: `translateX(${(i % 2) * 100}px)`,
                    boxShadow: '0 0 20px rgba(147, 51, 234, 0.5)'
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* ParticleEffect with higher z-index */}
          <div className="z-[1]">
            <ParticleEffect />
          </div>

          {/* Hero content with highest z-index */}
          <div className="relative z-[3]">
            <div className="flex flex-col lg:flex-row justify-between items-center py-20 gap-12 lg:mt-24 lg:mb-48 mb-16 px-4 lg:px-24">
              <div className="flex-1 max-w-2xl text-center lg:text-left">
                <div 
                  className="text-sm bg-gray-800 px-4 py-1 rounded-full mb-6 inline-flex items-center cursor-pointer hover:bg-gray-700"
                  onClick={() => setShowAnnouncementModal(true)}
                >
                  Announcing Cube <ChevronRight className="inline h-4 w-4" />
                </div>
                
                <h1 className="text-5xl lg:text-8xl font-bold mb-6 relative group">
                  <span className="relative inline-block">
                    <span className="absolute -inset-x-20 -inset-y-10 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-blue-600/20 blur-[100px] opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
                    <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 animate-gradient-x">
                      A Web Browser for Your AI
                    </span>
                  </span>
                </h1>
                
                <div className="flex flex-col lg:flex-row gap-4">
                  <button 
                    onClick={() => {
                      console.log('Get Started clicked!');
                      console.log('Current modal state:', showGetStartedModal);
                      setShowGetStartedModal(true);
                      console.log('New modal state:', true);
                    }}
                    className="relative group px-8 py-4 bg-transparent overflow-hidden rounded-full border border-purple-500 hover:border-purple-400 transition-colors"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 group-hover:opacity-75 transition-opacity" />
                    <div className="relative flex items-center justify-center gap-2">
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                        Get Started
                      </span>
                      <ChevronRight className="h-4 w-4 text-purple-400" />
                    </div>
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 blur-xl opacity-25 group-hover:opacity-50 transition-opacity" />
                  </button>
                  <button 
                    onClick={handleDocumentationClick} 
                    className="w-full lg:w-auto px-6 py-3 border border-gray-700 rounded-full hover:bg-gray-900 flex items-center justify-center gap-2"
                  >
                    Documentation <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Desktop Cube */}
              <div className="hidden lg:block flex-1 pl-20">
                <Cube width={500} height={500} />
              </div>
            </div>
          </div>
        </motion.section>

        {/* Investors Section */}
        <div className="relative mb-16 z-10">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-center mb-8">
              {/* <p className="text-gray-400 text-lg">Backed by</p> */}
            </div>
            
            {/* Scrolling investors section */}
            {SHOW_SCROLLING_INVESTORS && (
              <div className="relative overflow-hidden">
                <div 
                  className="flex animate-scroll"
                  style={{
                    '--total-logos': `${INVESTOR_LOGOS.length}`,
                    animationDuration: '20s',
                  } as React.CSSProperties}
                >
                  {[...INVESTOR_LOGOS, ...INVESTOR_LOGOS, ...INVESTOR_LOGOS, ...INVESTOR_LOGOS].map((logo, index) => (
                    <div 
                      key={index} 
                      className="flex-shrink-0 mx-8"
                    >
                      <img 
                        src={logo.src} 
                        alt={logo.alt}
                        className="h-8 w-auto grayscale hover:grayscale-0 transition"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Static investors section */}
            {!SHOW_SCROLLING_INVESTORS && (
              <div className="flex flex-wrap justify-center items-center gap-12">
                {INVESTOR_LOGOS.map((logo, index) => (
                  <div 
                    key={index}
                    className="flex-shrink-0"
                  >
                    <img 
                      src={logo.src} 
                      alt={logo.alt}
                      className="h-8 w-auto grayscale hover:grayscale-0 transition"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Scroll Sections */}
        <div className="relative z-10">
          <ScrollSections />
        </div>

        {/* How it Works Section */}
        <div className="relative mb-64 z-10">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-5xl font-bold mb-12 text-left">How it Works</h2>
            <p className="text-xl text-gray-400 text-left leading-relaxed">
              Managing headless browsers shouldn't be your concern.
              Cube provides enterprise-grade infrastructure to run and monitor browser automation at any scale. 
              We handle the complex infrastructure so you can focus on building your applications.
            </p>
          </div>
        </div>

        {/* Features Section */}
        <div id="features" className="relative mb-16 px-4 lg:px-8 z-10">
          <h2 className="text-4xl font-bold mb-16 text-center">Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CORE_FEATURES.map(feature => (
              <motion.div
                key={feature.title}
                className="group relative bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-lg overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative p-6">
                  {feature.icon === 'Puzzle' && <Puzzle className="h-6 w-6 mb-4 text-white" />}
                  {feature.icon === 'Scale' && <Scale className="h-6 w-6 mb-4 text-white" />}
                  {feature.icon === 'Zap' && <Zap className="h-6 w-6 mb-4 text-white" />}
                  {feature.icon === 'Shield' && <Shield className="h-6 w-6 mb-4 text-white" />}
                  {feature.icon === 'Eye' && <Eye className="h-6 w-6 mb-4 text-white" />}
                  {feature.icon === 'Ghost' && <Ghost className="h-6 w-6 mb-4 text-white" />}
                  {feature.icon === 'Code' && <Code className="h-6 w-6 mb-4 text-white" />}
                  {feature.icon === 'Terminal' && <Terminal className="h-6 w-6 mb-4 text-white" />}
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Use Cases Section */}
        <div id="use-cases" className="relative z-10">
          <UseCasesSection />
        </div>
      </motion.div>

      {/* Mobile menu and modals */}
      <MobileMenu />
      <GetStartedModal />
      <AnnouncementModal isOpen={showAnnouncementModal} onClose={() => setShowAnnouncementModal(false)} />

      {/* Footer */}
      <footer className="relative z-10 mt-32 pb-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="backdrop-blur-xl bg-white/[0.02] rounded-2xl px-8 py-12 border border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              {/* Logo and Description */}
              <div className="col-span-1 md:col-span-2">
                <img src="logos/cube_white.png" alt="Cube" className="h-4 w-auto mb-6" />
                <p className="text-gray-400 max-w-sm">
                  Deploy virtual browsers at scale. Built for developers, by developers.
                </p>
              </div>

              {/* Product Links */}
              <div>
                <h3 className="text-sm font-semibold text-white mb-4">Product</h3>
                <ul className="space-y-3">
                  <li>
                    <button onClick={handleDocumentationClick} className="text-gray-400 hover:text-white transition-colors">
                      Documentation
                    </button>
                  </li>
                  <li>
                    <button onClick={() => scrollToSection('features')} className="text-gray-400 hover:text-white transition-colors">
                      Features
                    </button>
                  </li>
                  <li>
                    <button onClick={() => scrollToSection('use-cases')} className="text-gray-400 hover:text-white transition-colors">
                      Use Cases
                    </button>
                  </li>
                </ul>
              </div>

              {/* Company Links */}
              <div>
                <h3 className="text-sm font-semibold text-white mb-4">Company</h3>
                <ul className="space-y-3">
                  <li>
                    <button onClick={() => setShowGetStartedModal(true)} className="text-gray-400 hover:text-white transition-colors">
                      Get Started
                    </button>
                  </li>
                  <li>
                    <a href="https://github.com/cubebase" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                      GitHub
                    </a>
                  </li>
                  <li>
                    <button onClick={() => setShowContactModal(true)} className="text-gray-400 hover:text-white transition-colors">
                      Contact
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="mt-12 pt-8 border-t border-white/10">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-gray-400 text-sm">
                  © {new Date().getFullYear()} Cube. All rights reserved.
                </div>
                <div className="flex space-x-6">
                  <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Privacy Policy
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Terms of Service
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Landing;