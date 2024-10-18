import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowRight } from 'lucide-react';
import Features from '@/components/Features';
import EarlyAccessForm from '@/components/EarlyAccessForm';
import PixelatedSection from '@/components/PixelatedSection';

// In your parent component
const peopleData = {
  title: "People",
  subtitle: "Relationship-focused Meeting Assistant",
  logo_path: "/people/logo.svg",
  cards: [
    {
      title: "Be more present in meetings",
      subtitle: "Never take notes on a video call again. Automatically receive human-quality meeting notes after your meetings.",
      image_path: "/people/1.png",
      image_scale: 0.9 // Add scale factor for each image
    },
    {
      title: "Perfect relationship recall",
      subtitle: "Be at ease. Day.ai remembers everything about the people you meet and email. Search to find any detail.",
      image_path: "/people/2.png",
      image_scale: 0.7
    },
    {
      title: "Follow-ups, finished",
      subtitle: "Just press send on an auto-generated follow up email with meeting highlights and action items written in a human tone.",
      image_path: "/people/3.png",
      image_scale: 0.8
    },
    {
      title: "All of your relationships, in one place",
      subtitle: "Share contacts and relationship history across your team.",
      image_path: "/people/4.png",
      image_scale: 0.9
    },
    {
      title: "Follow up reminders",
      subtitle: "Nothing slips through the cracks. Day.ai will remind you to follow up at the right time.",
      image_path: "/people/5.png",
      image_scale: 0.88
    }
  ]
};

const pipelinesData = {
  title: "Pipelines",
  subtitle: "Automatically-organized CRM",
  logo_path: "/pipelines/logo.svg", // Assuming you have this logo
  cards: [
    {
      title: "Your pipeline, updated",
      subtitle: "Just had a great meeting? The deal is created automatically and sits in the right stage.",
      image_path: "/pipelines/1.png",
      image_scale: 1
    },
    {
      title: "Keep everyone aligned",
      subtitle: "Share your pipeline update async. Use meeting time to strategize.",
      image_path: "/pipelines/2.png",
      image_scale: 0.76
    },
    {
      title: "Deliver a great experience",
      subtitle: "No need to manually update, once tasks are completed, the deal moves itself.",
      image_path: "/pipelines/3.png",
      image_scale: 0.8
    },
    {
      title: "Your forecast on demand",
      subtitle: "Automatic forecast generation keeps everyone up to date.",
      image_path: "/pipelines/4.png",
      image_scale: 1
    }
  ]
};

const pagesData = {
  title: "Pages",
  subtitle: "Customer-centric Knowledge Base",
  logo_path: "/pages/logo.svg", // Assuming you have this logo
  cards: [
    {
      title: "Communicate trends and patterns",
      subtitle: "Tell the right story with objective sources from conversations.",
      image_path: "/pages/1.png",
      image_scale: 0.76
    },
    {
      title: "Prioritize effectively",
      subtitle: "Make fast decisions on what to work on next by listening to customers.",
      image_path: "/pages/2.png",
      image_scale: 0.9
    },
    {
      title: "Collaborate with prospects and customers",
      subtitle: "Stay aligned on next steps, communicate effectively - even when you're not in the room.",
      image_path: "/pages/3.png",
      image_scale: 0.85
    },
    {
      title: "Organize marketing assets",
      subtitle: "Save customer quotes and content ideas to speed up creation.",
      image_path: "/pages/4.png",
      image_scale: 0.9
    },
    {
      title: "Create documentation",
      subtitle: "Explaining yourself over and over? Let Day.ai turn your repetition into documentation.",
      image_path: "/pages/5.png",
      image_scale: 0.9
    }
  ]
};

// Add this new component after the Landing component
const AnimatedCRM = () => {
  const [animationStep, setAnimationStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const componentRef = useRef(null);

  const customerText = "Customer";
  const relationshipText = "Relationship";
  const managementText = "Management";
  const intelligenceText = "Intelligence";
  const totalSteps = relationshipText.length + managementText.length + intelligenceText.length + 20;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (componentRef.current) {
      observer.observe(componentRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let timer: number | null = null;
    if (isVisible) {
      timer = window.setInterval(() => {
        setAnimationStep((prev) => (prev < totalSteps) ? prev + 1 : prev);
      }, 80);
    }

    return () => {
      if (timer !== null) {
        window.clearInterval(timer);
      }
    };
  }, [isVisible, totalSteps]);

  const showStrikethroughRelationship = animationStep > relationshipText.length + managementText.length + 5;
  const showStrikethroughManagement = animationStep > relationshipText.length + managementText.length + 10;
  const strikethroughProgressRelationship = Math.min(100, (animationStep - relationshipText.length - managementText.length - 5) * 10);
  const strikethroughProgressManagement = Math.min(100, (animationStep - relationshipText.length - managementText.length - 10) * 10);
  const showIntelligence = animationStep > relationshipText.length + managementText.length + 20;

  return (
    <div ref={componentRef} className="flex-grow flex flex-col items-center justify-center text-center px-4 mb-20">
      {/* Desktop version */}
      <h1 className="hidden md:block text-5xl font-bold mb-4 relative">
        <span className="text-black">{customerText}</span>{' '}
        <span className="relative inline-block">
          <span className={`relative ${showStrikethroughRelationship ? 'text-gray-400' : 'text-blue-500'}`}>
            {relationshipText.slice(0, Math.min(animationStep, relationshipText.length))}
            {showStrikethroughRelationship && (
              <span className="absolute inset-0 flex items-center overflow-hidden">
                <svg className="absolute left-0 w-full h-6" viewBox="0 0 100 8" preserveAspectRatio="none">
                  <path
                    d={`M0,4 Q25,8 50,4 T100,4`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    className="text-blue-500"
                    style={{
                      strokeDasharray: '100',
                      strokeDashoffset: 100 - strikethroughProgressRelationship,
                      transition: 'stroke-dashoffset 0.1s ease-out'
                    }}
                  />
                </svg>
              </span>
            )}
          </span>
          {showIntelligence && (
            <span className="text-blue-500 absolute text-5xl font-bold" style={{ top: '-1.2em', left: '2em', whiteSpace: 'nowrap' }}>
              {intelligenceText.slice(0, animationStep - relationshipText.length - managementText.length - 20)}
            </span>
          )}
        </span>
        {' '} {/* Added space here */}
        <span className="relative inline-block">
          <span className={`relative ${showStrikethroughManagement ? 'text-gray-400' : 'text-blue-500'}`}>
            {managementText.slice(0, Math.min(Math.max(0, animationStep - relationshipText.length), managementText.length))}
          </span>
          {showStrikethroughManagement && (
            <span className="absolute inset-0 flex items-center overflow-hidden">
              <svg className="absolute left-0 w-full h-6" viewBox="0 0 100 8" preserveAspectRatio="none">
                <path
                  d={`M0,4 Q25,8 50,4 T100,4`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  className="text-blue-500"
                  style={{
                    strokeDasharray: '100',
                    strokeDashoffset: 100 - strikethroughProgressManagement,
                    transition: 'stroke-dashoffset 0.1s ease-out'
                  }}
                />
              </svg>
            </span>
          )}
        </span>
      </h1>

      {/* Mobile version */}
      <h1 className="md:hidden text-6xl font-bold mb-4 relative flex flex-col items-center">
        <span className="text-black mb-2">{customerText}</span>
        {showIntelligence && (
          <span className="text-blue-500 mb-2">
            {intelligenceText.slice(0, animationStep - relationshipText.length - managementText.length - 20)}
          </span>
        )}
        <span className="relative inline-block mb-2">
          <span className={`relative ${showStrikethroughRelationship ? 'text-gray-400' : 'text-blue-500'}`}>
            {relationshipText.slice(0, Math.min(animationStep, relationshipText.length))}
          </span>
          {showStrikethroughRelationship && (
            <span className="absolute inset-0 flex items-center overflow-hidden">
              <svg className="absolute left-0 w-full h-6" viewBox="0 0 100 8" preserveAspectRatio="none">
                <path
                  d={`M0,4 Q25,8 50,4 T100,4`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  className="text-blue-500"
                  style={{
                    strokeDasharray: '100',
                    strokeDashoffset: 100 - strikethroughProgressRelationship,
                    transition: 'stroke-dashoffset 0.1s ease-out'
                  }}
                />
              </svg>
            </span>
          )}
        </span>
        <span className="relative inline-block">
          <span className={`relative ${showStrikethroughManagement ? 'text-gray-400' : 'text-blue-500'}`}>
            {managementText.slice(0, Math.min(Math.max(0, animationStep - relationshipText.length), managementText.length))}
          </span>
          {showStrikethroughManagement && (
            <span className="absolute inset-0 flex items-center overflow-hidden">
              <svg className="absolute left-0 w-full h-6" viewBox="0 0 100 8" preserveAspectRatio="none">
                <path
                  d={`M0,4 Q25,8 50,4 T100,4`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  className="text-blue-500"
                  style={{
                    strokeDasharray: '100',
                    strokeDashoffset: 100 - strikethroughProgressManagement,
                    transition: 'stroke-dashoffset 0.1s ease-out'
                  }}
                />
              </svg>
            </span>
          )}
        </span>
      </h1>
    </div>
  );
};

const Landing = () => {
  const [animationStep, setAnimationStep] = useState(0);
  const artificialText = "Artificial";
  const customerText = "Customer";
  const totalSteps = artificialText.length + customerText.length + 25;
  const [showForm, setShowForm] = useState(false);
  const [userIp, setUserIp] = useState('');
  const [pageLoadTime, setPageLoadTime] = useState<number>(Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimationStep((prev) => (prev < totalSteps) ? prev + 1 : prev);
    }, 80);

    // Fetch IP and log "Opened website" action
    fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => {
        setUserIp(data.ip);
        logAction('opened_website', data.ip);
      })
      .catch(error => console.error('Error fetching IP:', error));

    // Add event listener for when the user is about to leave the page
    const handleBeforeUnload = () => {
      const timeSpent = Math.round((Date.now() - pageLoadTime) / 1000); // Time spent in seconds
      logAction('closed_website', userIp, timeSpent);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      clearInterval(timer);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [userIp, pageLoadTime]);

  const showStrikethrough = animationStep > artificialText.length + 10;
  const strikethroughProgress = Math.min(100, (animationStep - artificialText.length - 10) * 10);
  const showCustomer = animationStep > artificialText.length + 21;

  const handleEarlyAccessClick = async () => {
    setShowForm(true);
    await logAction('button_click', userIp);
  };

  const handleFormClose = async () => {
    setShowForm(false);
    await logAction('form_close', userIp);
  };

  const handleFormSubmit = async (name: string, company: string, email: string) => {
    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbyZ0X854BH7SqRjkcN7k_FaN5eGAje4E_y1yqpkDol7wYW_AfBy7mxm4JqougoVZsKMTA/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, company, email, ip: userIp, action: 'form_submit' }),
      });

      console.log('Form submitted:', { name, company, email, ip: userIp }); // Add this line for debugging

      setShowForm(false);
      alert('Thank you for your interest! We will contact you soon.');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting the form. Please try again.');
    }
  };

  const logAction = async (action: string, ip: string, timeSpent?: number) => {
    try {
      const body: any = { ip, action };
      if (timeSpent !== undefined) {
        body.timeSpent = timeSpent;
      }

      await fetch('https://script.google.com/macros/s/AKfycbyZ0X854BH7SqRjkcN7k_FaN5eGAje4E_y1yqpkDol7wYW_AfBy7mxm4JqougoVZsKMTA/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
    } catch (error) {
      console.error(`Error logging ${action}:`, error);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcf9f8] flex flex-col">
      <header className="p-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img src="/logos/new_wave_logo.svg" alt="Wave logo" className="w-14 h-14" />
          <span className="text-xl font-bold">Wave</span>
        </div>
        <button className="bg-gray-900 text-white px-4 py-2 rounded-full flex items-center" onClick={handleEarlyAccessClick}>
          Get early access
          <ArrowRight size={16} className="ml-2" />
        </button>
      </header>

      <div className="flex-grow flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-6xl md:text-7xl font-bold mb-4 relative mt-24 md:mt-48">
          {/* Desktop version */}
          <span className="hidden md:inline-block relative">
            <span className={`relative ${showStrikethrough ? 'text-gray-400' : 'text-blue-500'}`}>
              {artificialText.slice(0, Math.min(animationStep, artificialText.length))}
              {showStrikethrough && (
                <span className="absolute inset-0 flex items-center overflow-hidden">
                  <svg className="absolute left-0 w-full h-8" viewBox="0 0 100 8" preserveAspectRatio="none">
                    <path
                      d={`M0,4 Q25,8 50,4 T100,4`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinecap="round"
                      className="text-blue-500"
                      style={{
                        strokeDasharray: '100',
                        strokeDashoffset: 100 - strikethroughProgress,
                        transition: 'stroke-dashoffset 0.1s ease-out'
                      }}
                    />
                  </svg>
                </span>
              )}
            </span>
            {showCustomer && (
              <span className="text-blue-500 absolute text-6xl font-bold" style={{ bottom: '100%', left: '100%', whiteSpace: 'nowrap' }}>
                <span className="block mb-2">
                  {customerText.slice(0, animationStep - artificialText.length - 21)}
                </span>
                <svg
                  width="80"
                  height="80"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute text-blue-500"
                  style={{ bottom: '-1em', left: '0em', transform: 'rotate(90deg) scaleX(-1)' }}
                >
                  <path
                    d="M10 30C10 21.7157 16.7157 15 25 15H30"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <path
                    d="M25 10L30 15L25 20"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            )}
          </span>
          {/* Mobile version */}
          <span className="md:hidden flex flex-col items-center">
            <span className={`relative ${showStrikethrough ? 'text-gray-400' : 'text-blue-500'}`}>
              {artificialText.slice(0, Math.min(animationStep, artificialText.length))}
              {showStrikethrough && (
                <span className="absolute inset-0 flex items-center overflow-hidden">
                  <svg className="absolute left-0 w-full h-8" viewBox="0 0 100 8" preserveAspectRatio="none">
                    <path
                      d={`M0,4 Q25,8 50,4 T100,4`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinecap="round"
                      className="text-blue-500"
                      style={{
                        strokeDasharray: '100',
                        strokeDashoffset: 100 - strikethroughProgress,
                        transition: 'stroke-dashoffset 0.1s ease-out'
                      }}
                    />
                  </svg>
                </span>
              )}
            </span>
            {showCustomer && (
              <span className="text-blue-500 text-6xl font-bold mt-2">
                {customerText.slice(0, animationStep - artificialText.length - 21)}
              </span>
            )}
          </span>
          <span className="block mt-2">Intelligence</span>
        </h1>
        <p className="text-3xl text-gray-700 mb-10 font-bold">
          AI-native CRM that brings customers into every decision
        </p>
        <div className="mb-14">
          <p className="text-gray-500 mb-4 text-bold">Works seamlessly with:</p>
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 lg:gap-12">
            <img src="/logos/gmail.svg" alt="Gmail" className="h-6 md:h-8" />
            <img src="/logos/teams.svg" alt="Microsoft Teams" className="h-6 md:h-8" />
            <img src="/logos/meet.svg" alt="Google Meet" className="h-6 md:h-8" />
            <img src="/logos/zoom.svg" alt="Zoom" className="h-6 md:h-8" />
            <img src="/logos/notion.svg" alt="Notion" className="h-6 md:h-8" />
            <img src="/logos/phone.svg" alt="Phone" className="h-6 md:h-8" />
            <div className="relative">
              <img src="/logos/slack.svg" alt="Slack" className="h-6 md:h-8" />
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 md:text-xs bg-gray-100 text-[10px] text-gray-500 px-1 rounded-full whitespace-nowrap mt-0.5">
                coming soon
              </div>
            </div>
          </div>
        </div>
        <button
          className="bg-gray-900 text-white px-6 py-3 rounded-full text-lg flex items-center mb-4"
          onClick={handleEarlyAccessClick}
        >
          Get early access
          <ArrowRight size={20} className="ml-2" />
        </button>
        <p className="text-gray-500 text-md text-medium">
          Just have conversations. Let Wave do the rest.
        </p>

      </div>

      <div className="p-6 flex flex-col items-center">
        <div className="flex items-center mb-10 mt-10">
          <p className="text-gray-500 mr-2">Backed by</p>
          <img src="/logos/google.png" alt="google" className="h-8 align-middle" />
        </div>

        <PixelatedSection />

        <div className="max-w-4xl mx-auto text-center">
          <h2 className="md:text-6xl text-5xl font-bold mb-4">Reimagining CRM for the AI Age</h2>
          <p className="md:text-2xl text-xl mb-6">
            It's never been easier to capture, organize, analyze and share the conversations
            that grow your business.
          </p>
          <p className="md:text-2xl text-xl mb-12">
            <strong>Wave</strong> eliminates the complicated, manual interfaces of Legacy CRM, and
            keeps you connected to what your customers want.
          </p>

          {/* Mobile layout */}
          <div className="md:hidden flex flex-col items-center mb-20">
            <h3 className="text-4xl font-bold text-gray-500 mb-4">Legacy CRM</h3>
            <p className="mb-4 font-bold text-gray-500 text-lg">
              Slows you down by forcing you to think the same way a computer thinks.
            </p>
            <p className="font-bold text-gray-500 text-lg mb-4">
              Like a complex series of tables and fields.
            </p>
            <img src="/images/flow_legacy_1.png" alt="Legacy CRM Flow 1" className="w-full mb-4" />
            <div className="flex justify-center mb-4">
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" transform="rotate(-30 0 0)">
                <path d="M50 10C30 10 10 30 10 50" stroke="#3B82F6" strokeWidth="6" strokeLinecap="round"/>
                <path d="M10 50L20 40" stroke="#3B82F6" strokeWidth="6" strokeLinecap="round"/>
                <path d="M10 50L0 40" stroke="#3B82F6" strokeWidth="6" strokeLinecap="round"/>
              </svg>
            </div>
            <img src="/images/flow_legacy_2.png" alt="Legacy CRM Flow 2" className="w-full mb-8" />
            
            <h3 className="text-5xl font-semibold text-blue-500 mb-8">Vs.</h3>
            
            <h3 className="text-4xl font-bold mb-4 text-black">Wave</h3>
            <p className="mb-4 font-bold text-black text-lg">
              Adapts to you. Your contacts and conversations are automatically synced to a new type of CRM.
            </p>
            <p className="text-black-600 font-semibold text-lg mb-4">
              Have conversations, let Wave do the rest.
            </p>
            <img src="/images/flow_wave_1.png" alt="Wave Flow 1" className="w-full mb-4" />
            <div className="flex justify-center mb-4">
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" transform="rotate(30 0 0)">
                <path d="M10 10C30 10 50 30 50 50" stroke="#3B82F6" strokeWidth="6" strokeLinecap="round"/>
                <path d="M50 50L40 40" stroke="#3B82F6" strokeWidth="6" strokeLinecap="round"/>
                <path d="M50 50L60 40" stroke="#3B82F6" strokeWidth="6" strokeLinecap="round"/>
              </svg>
            </div>
            <img src="/images/flow_wave_2.png" alt="Wave Flow 2" className="w-full" />
          </div>

          {/* Desktop layout */}
          <div className="hidden md:flex justify-between items-start relative mb-40">
            <div className="w-[calc(50%-2rem)] pr-8">
              <h3 className="text-4xl font-bold text-gray-500 mb-4">Legacy CRM</h3>
              <p className="mb-4 font-bold text-gray-500 text-lg">
                Slows you down by forcing you to think the same way a computer thinks.
              </p>
              <p className="font-bold text-gray-500 text-lg mb-4">
                Like a complex series of tables and fields.
              </p>
              <img src="/images/flow_legacy_1.png" alt="Legacy CRM Flow 1" className="w-full mb-4" />
              <div className="flex justify-center mb-4">
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" transform="rotate(-30 0 0)">
                    <path d="M50 10C30 10 10 30 10 50" stroke="#3B82F6" strokeWidth="6" strokeLinecap="round"/>
                    <path d="M10 50L20 40" stroke="#3B82F6" strokeWidth="6" strokeLinecap="round"/>
                    <path d="M10 50L0 40" stroke="#3B82F6" strokeWidth="6" strokeLinecap="round"/>
                  </svg>
              </div>
              <img src="/images/flow_legacy_2.png" alt="Legacy CRM Flow 2" className="w-full" />
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-4xl font-semibold text-blue-500 mb-4">Vs.</h3>
              <div className="w-px bg-gray-300 h-full absolute top-16 left-1/2 transform -translate-x-1/2"></div>
            </div>
            <div className="w-[calc(50%-2rem)] pl-8">
              <h3 className="text-4xl font-bold mb-4 text-black">Wave</h3>
              <p className="mb-4 font-bold text-black text-lg">
                Adapts to you. Your contacts and conversations are automatically synced to a new type of CRM.
              </p>
              <p className="text-black-600 font-semibold text-lg mb-4">
                Have conversations, let Wave do the rest.
              </p>
              <img src="/images/flow_wave_1.png" alt="Wave Flow 1" className="w-full mb-4" />
              <div className="flex justify-center mb-4">
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" transform="rotate(30 0 0)">
                  <path d="M10 10C30 10 50 30 50 50" stroke="#3B82F6" strokeWidth="6" strokeLinecap="round"/>
                  <path d="M50 50L40 40" stroke="#3B82F6" strokeWidth="6" strokeLinecap="round"/>
                  <path d="M50 50L60 40" stroke="#3B82F6" strokeWidth="6" strokeLinecap="round"/>
                </svg>
              </div>
              <img src="/images/flow_wave_2.png" alt="Wave Flow 2" className="w-full" />
            </div>
          </div>
        </div>

        <div className="flex-grow flex flex-col items-center justify-center text-center px-4 mb-40">
        <div className="w-full max-w-4xl mx-auto mt-20 mb-20">
            <h2 className="text-2xl font-normal mb-6">
            Looking for a <span className="relative font-extrabold">
                faster, easier
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500"></span>
            </span> way to grow your business?
            </h2>
            <button className="bg-gray-900 text-white text-xl px-8 py-4 rounded-full flex items-center mx-auto mb-4" onClick={handleEarlyAccessClick}>
            Get early access
            <ArrowRight size={24} className="ml-2" />
            </button>
            <p className="text-gray-500 text-sm text-bold">
          Join the waitlist to receive early access to Wave
        </p>
        </div>
        </div>

      </div>

      <AnimatedCRM />
      
      <Features {...peopleData} />
      <Features {...pipelinesData} />
      <Features {...pagesData} />

      <div className="flex-grow flex flex-col items-center justify-center text-center px-4 mb-40">
        <div className="w-full max-w-4xl mx-auto mt-20 mb-20">
            <h2 className="text-2xl font-normal mb-6">
            Looking for a <span className="relative font-extrabold">
                faster, easier
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500"></span>
            </span> way to grow your business?
            </h2>
            <button className="bg-gray-900 text-white text-xl px-8 py-4 rounded-full flex items-center mx-auto mb-4" onClick={handleEarlyAccessClick}>
            Get early access
            <ArrowRight size={24} className="ml-2" />
            </button>
            <p className="text-gray-500 text-sm text-bold">
          Join the waitlist to receive early access to Wave
        </p>
        </div>
        </div>

      {showForm && (
        <EarlyAccessForm onSubmit={handleFormSubmit} onClose={handleFormClose} />
      )}

    </div>
  );
};

export default Landing;