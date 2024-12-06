import React, { useState, useEffect, useCallback } from 'react';
import { ChevronRight, MapPin, Calendar, Users, Sparkles, Brain, Truck, Network } from 'lucide-react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

const CyberBackground = () => {
  const canvasRef = useCallback((node: HTMLCanvasElement | null) => {
    if (!node) return;
    const ctx = node.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resize = () => {
      node.width = window.innerWidth;
      node.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Create particles
    const particles: Particle[] = Array.from({ length: 100 }, () => ({
      x: Math.random() * node.width,
      y: Math.random() * node.height,
      size: Math.random() * 10 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.5 + 0.2,
    }));

    // Animation loop
    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, node.width, node.height);

      particles.forEach((particle) => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Wrap around edges
        if (particle.x < 0) particle.x = node.width;
        if (particle.x > node.width) particle.x = 0;
        if (particle.y < 0) particle.y = node.height;
        if (particle.y > node.height) particle.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, ${particle.opacity})`; // blue-500
        ctx.fill();

        // Draw connections
        particles.forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.1 * (1 - distance / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden z-0">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 bg-black"
        style={{ filter: 'blur(1px)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black" />
    </div>
  );
};

interface GlowingTextProps {
  children: React.ReactNode;
  className?: string;
}

const GlowingText = ({ children, className = '' }: GlowingTextProps) => (
  <span className={`relative inline-block ${className}`}>
    <span className="relative z-10">{children}</span>
    <span className="absolute inset-0 blur-xl bg-blue-500/20" />
  </span>
);

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div
      className="relative p-8 rounded-xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 
                 hover:border-blue-500/50 transition-all duration-500 transform hover:-translate-y-2 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`absolute inset-0 bg-blue-500/5 transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
      <Icon className={`w-12 h-12 text-blue-500 mb-6 transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`} />
      <h3 className="text-2xl font-bold mb-4 text-white">{title}</h3>
      <p className="text-gray-400 text-lg">{description}</p>
    </div>
  );
};

const FuturisticSpeakerHighlight = () => {
  return (
    <div className="relative py-32 bg-black text-white overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-blue-900/20 opacity-50" />
      <div className="absolute inset-0" 
           style={{
             backgroundImage: `url(${process.env.PUBLIC_URL}/grid.svg)`,
             backgroundSize: '2000px 500px',
             backgroundRepeat: 'repeat',
             backgroundPosition: 'center',
             maskImage: 'linear-gradient(180deg, rgba(255,255,255,0), white, rgba(255,255,255,0))',
             WebkitMaskImage: 'linear-gradient(180deg, rgba(255,255,255,0), white, rgba(255,255,255,0))',
             animation: 'pulse 15s ease-in-out infinite',
           }} 
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-black mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500 text-transparent bg-clip-text">
              Speakers d'Exception
            </span>
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto px-4">
            Rencontrez les visionnaires qui façonnent l'avenir du transport routier et de l'intelligence artificielle
          </p>
        </div>

        {/* Speakers grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {[
            {
              name: "Thibaud Guedon",
              title: "Transports Groussard",
              role: "Directeur d'exploitation",
              image: "/images/thibaud.png",
              topics: ["Innovation", "Stratégie", "Leadership"],
              linkedin: "#"
            },
            {
              name: "Sebastien Ruffle",
              title: "Groupe Sinari",
              role: "Directeur Général",
              image: "/images/seb.png",
              topics: ["Tech", "Product", "Scale-up"],
              linkedin: "#"
            },
            {
              name: "Antoine Sauvage",
              title: "Ovrsea",
              role: "CTO",
              image: "/images/antoine.png",
              topics: ["Tech", "Product", "Scale-up"],
              linkedin: "#"
            }
          ].map((speaker, i) => (
            <div 
              key={i} 
              className="group relative bg-gradient-to-br from-white/10 to-transparent 
                         rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-blue-500/20
                         transition-all duration-500"
            >
              {/* Glass effect background */}
              <div className="absolute inset-0 backdrop-blur-sm bg-white/5 group-hover:bg-white/10 transition-colors duration-500" />
              
              <div className="relative p-6 flex flex-col items-center text-center">
                {/* Image container */}
                <div className="relative w-48 h-48 mb-6 rounded-full overflow-hidden border-2 border-white/10 
                               group-hover:border-blue-500/50 transition-all duration-500">
                  <img 
                    src={speaker.image} 
                    alt={speaker.name} 
                    className="w-full h-full object-cover transform scale-100 group-hover:scale-110 
                             transition-all duration-700 filter grayscale group-hover:grayscale-0" 
                  />
                  {/* Subtle overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-60" />
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 
                               text-transparent bg-clip-text group-hover:scale-105 transition-transform">
                    {speaker.name}
                  </h3>
                  <p className="text-lg font-medium text-white/90">{speaker.title}</p>
                  <p className="text-blue-400">{speaker.role}</p>
                  
                  {/* Topics 
                  <div className="flex flex-wrap gap-2 justify-center mt-4">
                    {speaker.topics.map((topic, j) => (
                      <span 
                        key={j}
                        className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full 
                                 text-sm text-blue-400 backdrop-blur-sm"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                  */}

                  {/* LinkedIn button
                  <a 
                    href={speaker.linkedin}
                    className="inline-flex items-center space-x-2 mt-4 px-4 py-2 rounded-full
                             bg-white/5 hover:bg-blue-500/20 border border-white/10 hover:border-blue-500/50
                             transition-all duration-300"
                  >
                    <span>LinkedIn</span>
                    <ChevronRight className="w-4 h-4" />
                  </a>
                   */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Landing = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative bg-black text-white overflow-hidden">
      <CyberBackground />
      
      {/* Hero Section */}
      <div className="relative min-h-[80vh] flex items-center pb-20 z-10">
        <div className="container mx-auto px-8 relative z-10 pt-20">
          <div className="inline-flex items-center space-x-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full 
                         px-6 py-3 mb-8 animate-pulse">
            <Calendar className="w-4 h-4 text-blue-400" />
            <span className="text-base">25 janvier 2024</span>
            <span className="text-blue-500">•</span>
            <MapPin className="w-4 h-4 text-blue-400" />
            <span className="text-base">Hôtel Le Marois, Paris</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black mb-8 leading-tight">
          <GlowingText className="">Le Grand Meetup</GlowingText><br />
          <span className="bg-gradient-to-r from-[#00FFFF] to-[#FF00FF] text-transparent bg-clip-text">
            IA & Transport Routier
          </span><br />
          <span className="text-white/90">L'Avenir des TMS</span>
          </h1>

          <p className="text-xl text-gray-300 max-w-2xl mb-12 leading-relaxed">
            Un meetup exclusif réunissant les acteurs majeurs du transport routier et les experts en intelligence artificielle. 
            Venez découvrir comment l'IA révolutionne déjà la gestion du transport et façonne l'avenir des TMS.
          </p>

          <button className="group relative px-10 py-5 bg-blue-500 hover:bg-blue-600 rounded-xl font-bold text-lg
                           transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/20">
            <span className="relative z-10 flex items-center space-x-3">
              <span>Réserver votre place</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 rounded-xl opacity-0 
                          group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
          </button>

          <div className="mt-12 flex items-center space-x-4 text-base">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
              <span className="font-bold">IA</span>
            </div>
            <span className="text-gray-400">Organisé par <span className="text-white font-semibold">Cube AI</span></span>
          </div>
        </div>
      </div>

      {/* Speakers Section */}
      <section className="relative py-20 lg:py-28 z-10">
        <FuturisticSpeakerHighlight />
      </section>

      {/* Features Section */}
      <section className="relative py-20 lg:py-28 z-10">
        <div className="container mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                Une Expérience Unique
              </span>
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Découvrez pourquoi cet événement est incontournable pour les professionnels du transport
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={Brain}
              title="La Pointe de l'Innovation"
              description="Explorez les dernières avancées en IA appliquées au transport : elimination de la saisie manuelle, cotations automatiques, appels automatiques, etc."
            />
            <FeatureCard
              icon={Network}
              title="Échanges & Networking"
              description="Rencontrez ceux qui transforment l'industrie du transport et créez des connexions stratégiques pour votre entreprise."
            />
            <FeatureCard
              icon={Truck}
              title="TMS Nouvelle Génération"
              description="Quel est l'avenir du TMS ? Découvrez les solutions qui intègrent l'IA pour une gestion plus intelligente de votre roadmap produit."
            />
          </div>
        </div>
      </section>

      {/* Stats Section 
      <section className="relative py-20 lg:py-28 z-10">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { number: "20+", label: "Experts & Intervenants" },
              { number: "150+", label: "Professionnels du Transport" },
              { number: "10+", label: "Solutions Innovantes" }
            ].map((stat, i) => (
              <div key={i} className="text-center group">
                <div className="text-5xl font-black mb-4 bg-gradient-to-r from-blue-400 to-blue-600 
                              text-transparent bg-clip-text group-hover:scale-110 transition-transform">
                  {stat.number}
                </div>
                <div className="text-lg text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      */}
    </div>
  );
};

export default Landing;