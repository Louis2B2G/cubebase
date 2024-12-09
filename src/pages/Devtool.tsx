import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ChevronRight, FileText, Shield, Zap, Mail, Plus, Upload, Download, Menu, X } from 'lucide-react';
import * as THREE from 'three';

type FormData = {
  bookingId: string;
  totalPrice: string;
  currency: string;
  companyName: string;
  addressLine1: string;
  addressLine2: string;
  postalCode: string;
  city: string;
};

type InvestorLogo = {
  src: string;
  alt: string;
};

const INVESTOR_LOGOS: InvestorLogo[] = [
    { src: '/investors/k5.png', alt: 'K5 Global' },
    { src: '/investors/vf.png', alt: 'Venture Friends' },
    { src: '/investors/kima.png', alt: 'Kima Ventures' },
    { src: '/investors/olivier.png', alt: 'Olivier Pomel' },
    { src: '/investors/florian.png', alt: 'Florian Douetteau' },
    { src: '/investors/mei.png', alt: 'Mei Z.' },
    { src: '/investors/transpose.png', alt: 'Transpose Platform' },
    { src: '/investors/stemai.png', alt: 'StemAI' },
    { src: '/investors/ef.png', alt: 'Entrepreneur First' },
    { src: '/investors/manish.png', alt: 'Manish Kothari' },
    { src: '/investors/ketan.png', alt: 'Ketan Kothari' },
  ];

const initialFormData: FormData = {
  bookingId: '',
  totalPrice: '',
  currency: '',
  companyName: '',
  addressLine1: '',
  addressLine2: '',
  postalCode: '',
  city: ''
};

const finalFormData: FormData = {
  bookingId: 'BC-67890',
  totalPrice: '1500.0',
  currency: 'EUR',
  companyName: 'Acme Corporation',
  addressLine1: '123 Elm Street',
  addressLine2: 'Suite 500',
  postalCode: 'WC2N 5DU',
  city: 'London'
};

const CubeElements = () => {
  const desktopMountRef = useRef<HTMLDivElement | null>(null);
  const mobileMountRef = useRef<HTMLDivElement | null>(null);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const formRef = useRef<HTMLDivElement>(null);
  const cursorLightRef = useRef<THREE.PointLight | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

    // Animation loop with fixed rotation axis
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Use quaternion for smoother rotation
      cube.rotation.x += 0.005;
      cube.rotation.y += 0.005;
      
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startStreaming();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 } // Start when 30% of the form is visible
    );

    if (formRef.current) {
      observer.observe(formRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const startStreaming = async () => {
    const fields = Object.keys(finalFormData) as (keyof FormData)[];
    
    for (const field of fields) {
      const targetValue = finalFormData[field];
      
      // Stream each character of the field value
      for (let i = 0; i <= targetValue.length; i++) {
        setFormData(prev => ({
          ...prev,
          [field]: targetValue.slice(0, i)
        }));
        await sleep(50); // Adjust speed here (50ms between each character)
      }
      
      await sleep(200); // Pause between fields
    }
  };

  const supportedFormats = ['PDF', 'JPG', 'PNG', 'XLSX', 'DOC', 'EML', 'MSG', 'CSV', 'RTF'];
  
  const MobileMenu = () => (
    <div 
      className={`fixed inset-0 bg-black z-50 transform transition-transform duration-300 ease-in-out ${
        isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="flex justify-end p-4">
        <button 
          onClick={() => setIsMobileMenuOpen(false)} 
          className="p-2"
        >
          <X className="h-6 w-6" />
        </button>
      </div>
      <div className="flex flex-col items-center gap-8 pt-12">
        <a href="#features" className="text-xl text-gray-400 hover:text-white">Features</a>
        <a href="#company" className="text-xl text-gray-400 hover:text-white">Company</a>
        <a href="#pricing" className="text-xl text-gray-400 hover:text-white">Pricing</a>
        <button className="text-xl text-gray-400 hover:text-white">Sign in</button>
        <button className="w-64 px-6 py-3 bg-white text-black rounded-full hover:bg-gray-200">
          Get Started
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Top navigation bar */}
      <div className="fixed top-0 left-0 right-0 backdrop-blur-md bg-black/50 z-10 border-b border-transparent transition-all duration-300">
        <div className="container mx-auto flex justify-between items-center p-4">
          <img src="/logos/cube_white.png" alt="Cube Logo" className="h-4 ml-4" />
          
          {/* Desktop menu */}
          <div className="hidden lg:flex flex-1 justify-center gap-8">
            <a href="#features" className="text-gray-400 hover:text-white">Features</a>
            <a href="#company" className="text-gray-400 hover:text-white">Company</a>
            <a href="#pricing" className="text-gray-400 hover:text-white">Pricing</a>
          </div>
          <div className="hidden lg:flex gap-4">
            <button className="text-gray-400 hover:text-white">Sign in</button>
            <button className="px-4 py-2 bg-white text-black rounded-full hover:bg-gray-200 flex items-center gap-2">
              Get Started <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Mobile menu button */}
          <button 
            className="lg:hidden p-2" 
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu />

      <main className="container mx-auto px-4 pt-20">
        <div className="flex flex-col lg:flex-row justify-between items-center py-20 gap-12 mt-8 lg:mt-24 mb-48 px-4 lg:px-24">
          {/* Mobile cube - only shows on small screens */}
          <div 
            className="block lg:hidden w-full h-[200px]" 
            ref={mobileMountRef}
          ></div>
          
          {/* Content */}
          <div className="flex-1 max-w-2xl text-center lg:text-left">
            <div className="text-sm bg-gray-800 px-4 py-1 rounded-full mb-6 inline-flex items-center">
              Announcing our Pre-Seed<ChevronRight className="inline h-4 w-4" />
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              Data entry, reimagined with AI
            </h1>
            
            <p className="text-lg lg:text-xl text-gray-400 mb-8">
              Design a fluid and fast data entry experience, boosted by AI using Cube's UI components. 
              Create pixel-perfect forms that reduce input time by up to 80%.
            </p>
            
            <div className="flex flex-col lg:flex-row gap-4">
              <button className="w-full lg:w-auto px-6 py-3 bg-white text-black rounded-full hover:bg-gray-200 flex items-center justify-center gap-2">
                Get Started <ChevronRight className="h-4 w-4" />
              </button>
              <button className="w-full lg:w-auto px-6 py-3 border border-gray-700 rounded-full hover:bg-gray-900 flex items-center justify-center gap-2">
                Documentation <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Desktop cube - only shows on large screens */}
          <div 
            className="hidden lg:block flex-1" 
            ref={desktopMountRef} 
            style={{ width: '400px', height: '400px' }}
          ></div>
        </div>

        <div className="mb-48">
          <div className="text-center mb-8">
            <p className="text-gray-400 text-lg">Backed by</p>
          </div>
          
          <div className="relative overflow-hidden">
            <div 
              className="flex animate-scroll"
              style={{
                '--total-logos': `${INVESTOR_LOGOS.length}`,
                animationDuration: '40s',
              } as React.CSSProperties}
            >
              {/* Quadruple the logos for even smoother infinite scroll */}
              {[...INVESTOR_LOGOS, ...INVESTOR_LOGOS, ...INVESTOR_LOGOS, ...INVESTOR_LOGOS].map((logo, index) => (
                <div 
                  key={index} 
                  className="flex-shrink-0 mx-8"
                >
                  <img 
                    src={logo.src} 
                    alt={logo.alt}
                    className="h-8 w-auto grayscale"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 py-20  mb-48">
          <div className="bg-gray-900 border border-gray-800 rounded-lg">
            <div className="p-6">
              <FileText className="h-8 w-8 mb-4" />
              <h3 className="text-xl font-bold mb-2">Universal File Support</h3>
              <p className="text-gray-400">
                Support for all major file formats with intelligent data extraction and parsing.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {supportedFormats.map(format => (
                  <span key={format} className="px-2 py-1 bg-gray-800 rounded text-sm">
                    {format}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-lg">
            <div className="p-6">
              <Zap className="h-8 w-8 mb-4" />
              <h3 className="text-xl font-bold mb-2">AI-Powered Automation</h3>
              <p className="text-gray-400">
                Reduce manual entry with intelligent auto-fill and real-time validation powered by advanced LLMs.
              </p>
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-lg">
            <div className="p-6">
              <Shield className="h-8 w-8 mb-4" />
              <h3 className="text-xl font-bold mb-2">Enterprise Security</h3>
              <p className="text-gray-400">
                GDPR compliant with TLS 1.2 encryption and OAuth2 authentication support.
              </p>
            </div>
          </div>
        </div>

         {/* Form Demo Section */}
         <div className="flex flex-col lg:flex-row gap-12 lg:gap-40 py-10 lg:py-20 mb-24 lg:mb-48 px-4 lg:px-24">
          <div className="flex-1">
            <h2 className="text-4xl font-bold mb-6">
              Create the perfect data entry experience, wherever you need it
            </h2>
            <p className="text-gray-400 mb-6">
              Our intelligent components automatically extract, format and validate data, 
              reducing manual entry errors and improving efficiency.
            </p>
            <div className="space-y-4">
            <div className="p-4 bg-gray-900 rounded-lg border border-gray-800 hover:border-gray-700 cursor-pointer">
                <div className="flex items-center gap-4">
                  <Upload className="h-6 w-6" />
                  <div>
                    <div className="font-medium">Document Processing</div>
                    <div className="text-sm text-gray-400">Extract data from any file format</div>
                  </div>
                  <ChevronRight className="h-5 w-5 ml-auto" />
                </div>
              </div>
              <div className="p-4 bg-gray-900 rounded-lg border border-gray-800 hover:border-gray-700 cursor-pointer">
                <div className="flex items-center gap-4">
                  <Mail className="h-6 w-6" />
                  <div>
                    <div className="font-medium">Email Body Processing</div>
                    <div className="text-sm text-gray-400">Extract data from any email</div>
                  </div>
                  <ChevronRight className="h-5 w-5 ml-auto" />
                </div>
              </div>
              <div className="p-4 bg-gray-900 rounded-lg border border-gray-800 hover:border-gray-700 cursor-pointer">
                <div className="flex items-center gap-4">
                  <div>
                    <div className="font-medium">Countless Integrations</div>
                    <div className="text-sm text-gray-400">Cube can be natively integrated with Gmail, Outlook, or Slack, making it that much easier to set up.</div>
                    <div className="flex-1 mt-4 max-w-md bg-gray-900 p-6 rounded-lg border border-gray-800">
                        <div className="space-y-4">
                        {['Outlook', 'Gmail', 'Slack'].map(provider => (
                            <div key={provider} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <img src={`/images/${provider.toLowerCase()}.png`} alt={provider} className="h-6 w-6" />
                                <span>{provider}</span>
                            </div>
                            <input type="checkbox" className="toggle-checkbox" />
                            </div>
                        ))}
                        </div>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 ml-auto" />
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div ref={formRef} className="bg-gray-900 p-6 rounded-lg border border-gray-800">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-medium">New Shipment</h3>
                <button className="text-sm text-gray-400 hover:text-white">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <div className="space-y-4">
                <div className="relative">
                  <label className="block text-sm mb-1">Booking ID</label>
                  <div className="relative flex items-center">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-400"></div>
                    <input 
                      type="text" 
                      value={formData.bookingId}
                      readOnly
                      className="w-full bg-black border border-gray-800 rounded p-2 text-sm pl-3"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <label className="block text-sm mb-1">Total Price</label>
                    <div className="relative flex items-center">
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-400"></div>
                      <input 
                        type="text" 
                        value={formData.totalPrice}
                        readOnly
                        className="w-full bg-black border border-gray-800 rounded p-2 text-sm pl-3"
                      />
                    </div>
                  </div>
                  <div className="relative">
                    <label className="block text-sm mb-1">Currency</label>
                    <div className="relative flex items-center">
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-400"></div>
                      <input 
                        type="text" 
                        value={formData.currency}
                        readOnly
                        className="w-full bg-black border border-gray-800 rounded p-2 text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="text-lg mb-4">Client</h4>
                  
                  <div className="space-y-4">
                    <div className="relative">
                      <label className="block text-sm mb-1">Company Name</label>
                      <div className="relative flex items-center">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-400"></div>
                        <input 
                          type="text" 
                          value={formData.companyName}
                          readOnly
                          className="w-full bg-black border border-gray-800 rounded p-2 text-sm"
                        />
                      </div>
                    </div>

                    <div className="relative">
                      <label className="block text-sm mb-1">Address Line 1</label>
                      <div className="relative flex items-center">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-400"></div>
                        <input 
                          type="text" 
                          value={formData.addressLine1}
                          readOnly
                          className="w-full bg-black border border-gray-800 rounded p-2 text-sm"
                        />
                      </div>
                    </div>

                    <div className="relative">
                      <label className="block text-sm mb-1">Address Line 2</label>
                      <div className="relative flex items-center">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-400"></div>
                        <input 
                          type="text" 
                          value={formData.addressLine2}
                          readOnly
                          className="w-full bg-black border border-gray-800 rounded p-2 text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="relative">
                        <label className="block text-sm mb-1">Postal Code *</label>
                        <div className="relative flex items-center">
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-400"></div>
                          <input 
                            type="text" 
                            value={formData.postalCode}
                            readOnly
                            className="w-full bg-black border border-gray-800 rounded p-2 text-sm"
                          />
                        </div>
                      </div>
                      <div className="relative">
                        <label className="block text-sm mb-1">City *</label>
                        <div className="relative flex items-center">
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-400"></div>
                          <input 
                            type="text" 
                            value={formData.city}
                            readOnly
                            className="w-full bg-black border border-gray-800 rounded p-2 text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-white text-black rounded p-2 hover:bg-gray-200 mt-6">
                  Send to ERP
                </button>
              </div>
            </div>
          </div>
        </div>

         {/* Form Builder Section */}
         <div className="py-20 rounded-lg bg-gray-800 text-white  mb-80">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-8 text-center">Built by developers, for developers</h2>
            <p className="text-center text-gray-400 mb-12">
              Design data extraction experiences with our intuitive UI builder, embed the form in your React app, and monitor it with our dashboard.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
                <h3 className="text-2xl font-bold mb-4">Step 1: Design Your Form</h3>
                <p className="text-gray-400 mb-4">
                  Use the drag-and-drop interface to customize fields and layout to respect your schema constraints. 
                </p>
                <img src="/images/uibuilder.png" alt="Design Your Form" className="rounded-lg shadow-lg" />
              </div>

              {/* Step 2 */}
              <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
                <h3 className="text-2xl font-bold mb-4">Step 2: Embed in Your React App</h3>
                <p className="text-gray-400 mb-4">
                  Add the form to your application with just a few lines of code. You can set the model using your own OpenAI, Claude, Google, or Mistral API keys.
                </p>
                <div className="bg-black rounded p-4">
                  <pre className="text-sm text-purple-400 overflow-x-auto">
                    {`const cube = Cube('pk_test_51OjO2sDwO2fI4pI6rPXDYrM8aiCy3mDVx8FKjJArk1PptUBL7vVowCmVYj40822meVsj9eTbg7isP8W1lEFIHQxU00nAwOM5AA');

const appearance = { /* appearance */ }; // Theme, variables, titles...
const rules = {/* rules */ }; // -> Required fields, logical relationships, autocomplete, etc...

const options = {
  schema: schema, // OpenAPI compatible JSON Schema
  layout: layout, // Same structure as the schema
  inference: {
    extraction: true, /* Upload your LLM API key in Cube dashboard to start use the AI fill feature */
    streaming: true,
    model: {
      provider: 'openai',
      model: 'gpt-4o-mini',
    },
    temperature: 0.5,
    uncertainties: {
      is_displayed: true,
      style: 'left-bar',
    },
  },
};

const elements = cube.elements({ clientSecret, appearance });
const dataEntryElement = elements.create('dataEntry', options);
dataEntryElement.mount('#dataEntry-element');`}
                  </pre>
                </div>
              </div>

              {/* Step 3 */}
              <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
                <h3 className="text-2xl font-bold mb-4">Step 3: Deploy, Monitor & Optimize</h3>
                <p className="text-gray-400 mb-4">
                  Track data entry performance, run A/B tests on prompts to increase accuracy, and analyze user behavior through our Dashboard.
                </p>
                <img src="/images/analytics.png" alt="Generate Schema & Layout" className="rounded-lg shadow-lg" />
              </div>
            </div>
          </div>
        </div>
       
      </main>
    </div>
  );
};

export default CubeElements;