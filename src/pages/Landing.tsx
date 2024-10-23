import React from 'react';
import { Heart, Brain, Book, Clock, Star, Shield } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, Element } from 'react-scroll';

const Logo = () => (
  <div className="flex items-center gap-2">
    <svg
      viewBox="0 0 32 32"
      className="w-8 h-8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="2" className="text-blue-600"/>
      <path
        d="M16 4 L16 28"
        stroke="currentColor"
        strokeWidth="2"
        className="text-blue-600"
      />
      <path
        d="M10 10 L22 22"
        stroke="currentColor"
        strokeWidth="2"
        className="text-blue-600"
      />
    </svg>
    <span className="text-xl font-semibold text-gray-900">Heirloom</span>
  </div>
);


const Landing = () => {
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    console.log("Attempting to load video from:", "/videos/old_people.mp4");
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/90 backdrop-blur-md z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Logo />
            <div className="hidden md:flex items-center gap-8">
              <Link to="features" smooth={true} duration={500} className="text-gray-600 hover:text-gray-900 cursor-pointer">Features</Link>
              <Link to="benefits" smooth={true} duration={500} className="text-gray-600 hover:text-gray-900 cursor-pointer">Benefits</Link>
              <Link to="cta" smooth={true} duration={500} className="text-gray-600 hover:text-gray-900 cursor-pointer">Get Started</Link>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Join Waitlist
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative pt-24 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8">
            Preserve their independence today,
            <span className="text-blue-600 block mt-2">and their wisdom forever</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-12">
            So your children can know their grandparents' stories long after they're gone.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl">
              Request Early Access
            </button>
            <button className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-50 transition-colors">
              Watch Demo
            </button>
          </div>
        </div>
      </div>

      {/* Video Section with Overlaid Quote and Feature Cards */}
      <Element name="features" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl" style={{ paddingTop: '56.25%' }}>
          {!videoError ? (
            <video
              className="absolute top-0 left-0 w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              onError={() => {
                console.error("Video failed to load");
                setVideoError(true);
              }}
            >
              <source src="/videos/old_people.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-100">
              <p className="text-gray-500">Video unavailable</p>
            </div>
          )}


          {/* Overlaid Quote */}
          <div className="absolute top-0 left-0 right-0 p-8 bg-gradient-to-b from-black/80 to-transparent rounded-t-2xl">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-4 drop-shadow-lg">
                Turn Daily Care into Lasting Memories
              </h2>
              <p className="text-xl sm:text-2xl md:text-3xl text-white leading-snug drop-shadow-md">
                The first senior care device that helps them live better and preserves their voice and stories.
              </p>
            </div>
          </div>

          {/* Overlaid Feature Cards */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent rounded-b-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <div className="bg-white/90 p-4 rounded-lg backdrop-blur-sm">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                  <Brain className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-1">Cognitive Support</h3>
                <p className="text-sm text-gray-600">
                  Real-time assistance with daily tasks and memories.
                </p>
              </div>
              <div className="bg-white/90 p-4 rounded-lg backdrop-blur-sm">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                  <Book className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-1">Legacy Preservation</h3>
                <p className="text-sm text-gray-600">
                  Capture stories and wisdom for future generations.
                </p>
              </div>
              <div className="bg-white/90 p-4 rounded-lg backdrop-blur-sm">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                  <Heart className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-1">Family Connection</h3>
                <p className="text-sm text-gray-600">
                  Keep loved ones close and preserve their stories.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Element>

      {/* Quote Section */}
      <div className="bg-blue-100 py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900">
            When remembering gets harder, Heirloom remembers everything
          </h2>
          <p className="text-2xl text-gray-700">So your family's stories and wisdom never fade away.</p>
        </div>
      </div>



      {/* Benefits Section */}
      <Element name="benefits" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">Why Choose Heirloom</h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="flex items-start gap-4">
            <Clock className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">Always-on assistance that helps maintain independence and dignity.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Star className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-semibold mb-2">Personalized Care</h3>
              <p className="text-gray-600">AI that learns and adapts to individual needs and preferences.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Shield className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-semibold mb-2">Privacy First</h3>
              <p className="text-gray-600">Secure and ethical handling of personal stories and memories.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Heart className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-semibold mb-2">Family Peace of Mind</h3>
              <p className="text-gray-600">Know your loved ones are safe and their stories are preserved.</p>
            </div>
          </div>
        </div>
      </Element>

      {/* CTA Section */}
      <Element name="cta" className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Ready to preserve your family's legacy?</h2>
          <p className="text-xl mb-12 max-w-2xl mx-auto">Join our waitlist and be among the first to experience the future of senior care and memory preservation.</p>
          <button className="bg-white text-blue-600 px-10 py-4 rounded-full text-xl font-semibold hover:bg-blue-50 transition-colors shadow-lg hover:shadow-xl">
            Join the Waitlist
          </button>
        </div>
      </Element>
    </div>
  );
};

export default Landing;
