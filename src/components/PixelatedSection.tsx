import React, { useState, useEffect, useMemo } from 'react';

const PixelatedSection: React.FC = () => {
  const textQuestionPairs = [
    {
      text: "Automatically qualify leads",
      question: "Does this company match our ICP?"
    },
    {
      text: "Find expansion opportunities",
      question: "Did any customers raise funding last quarter?"
    },
    {
      text: "Mitigate potential churn risks",
      question: "Did any customers appoint new VPs this month?"
    }
  ];

  const [pixels, setPixels] = useState<string[][]>([]);
  const [text, setText] = useState('');
  const [questionText, setQuestionText] = useState('');
  const [currentPairIndex, setCurrentPairIndex] = useState(0);
  const [showQuestion, setShowQuestion] = useState(false);
  const [isErasing, setIsErasing] = useState(false);

  const rows = 80;
  const cols = 80;
  const bgColor = '#fcf9f8';

  const generateColor = (x: number, y: number): string => {
    const r = Math.sin(0.01 * x) * 127 + 128;
    const g = Math.sin(0.01 * y) * 127 + 128;
    const b = Math.sin(0.01 * (x + y)) * 127 + 128;
    
    const pastelFactor = 0.5;
    const pr = Math.floor(r * pastelFactor + 255 * (1 - pastelFactor));
    const pg = Math.floor(g * pastelFactor + 255 * (1 - pastelFactor));
    const pb = Math.floor(b * pastelFactor + 255 * (1 - pastelFactor));
    
    return `rgb(${pr},${pg},${pb})`;
  };

  const initialPixels = useMemo(() => {
    return Array(rows).fill(0).map((_, y) =>
      Array(cols).fill(0).map((_, x) => {
        if (Math.random() < 0.4) {
          return bgColor;
        }
        return generateColor(x, y);
      })
    );
  }, []);

  useEffect(() => {
    setPixels(initialPixels);

    const intervalId = setInterval(() => {
      setPixels(prevPixels => 
        prevPixels.map((row, y) => 
          row.map((pixel, x) => {
            if (Math.random() < 0.005) {
              if (Math.random() < 0.4) {
                return bgColor;
              }
              return generateColor(x, y);
            }
            return pixel;
          })
        )
      );
    }, 100);

    return () => clearInterval(intervalId);
  }, [initialPixels]);

  useEffect(() => {
    const currentPair = textQuestionPairs[currentPairIndex];
    const fullText = currentPair.text;
    const fullQuestion = currentPair.question;

    if (isErasing) {
      if (questionText.length > 0) {
        const timeoutId = setTimeout(() => {
          setQuestionText(questionText.slice(0, -1));
        }, 5);
        return () => clearTimeout(timeoutId);
      } else if (text.length > 0) {
        const timeoutId = setTimeout(() => {
          setText(text.slice(0, -1));
        }, 5);
        return () => clearTimeout(timeoutId);
      } else {
        setIsErasing(false);
        setCurrentPairIndex((prevIndex) => (prevIndex + 1) % textQuestionPairs.length);
      }
    } else {
      if (text.length < fullText.length) {
        const timeoutId = setTimeout(() => {
          setText(fullText.slice(0, text.length + 1));
        }, 5); // Reduced from 50 to 30 for faster typing
        return () => clearTimeout(timeoutId);
      } else if (!showQuestion) {
        const timeoutId = setTimeout(() => setShowQuestion(true), 10); // Reduced from 500 to 300
        return () => clearTimeout(timeoutId);
      } else if (questionText.length < fullQuestion.length) {
        const timeoutId = setTimeout(() => {
          setQuestionText(fullQuestion.slice(0, questionText.length + 1));
        }, 5); // Reduced from 50 to 30 for faster typing
        return () => clearTimeout(timeoutId);
      } else {
        const timeoutId = setTimeout(() => {
          setIsErasing(true);
        }, 2000); // Reduced from 3000 to 2000 for faster cycling
        return () => clearTimeout(timeoutId);
      }
    }
  }, [text, showQuestion, questionText, currentPairIndex, isErasing]);

  return (
    <div className="relative w-full md:w-1/2 aspect-square mb-10 md:mb-20 rounded-[20px] overflow-hidden" style={{backgroundColor: bgColor}}>
      <div className="absolute inset-0 grid grid-rows-[repeat(80,1fr)] grid-cols-[repeat(80,1fr)] gap-[1px]">
        {pixels.map((row, i) => 
          row.map((color, j) => (
            <div key={`${i}-${j}`} style={{backgroundColor: color}} className="w-full h-full rounded-sm" />
          ))
        )}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#fcf9f8]/100 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#fcf9f8]/100 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#fcf9f8]/100 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-l from-[#fcf9f8]/100 via-transparent to-transparent" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-black">
        <div className="bg-[#fcf9f8] bg-opacity-90 rounded-8xl p-4 shadow-lg max-w-md w-full relative">
          <div className="absolute top-2 right-2 bg-gray-200 text-gray-700 px-2 py-0.5 rounded text-xs">
            AI
          </div>
          <div className="flex items-center mb-3">
            <img
              src="/logos/logo_ugly.png"
              alt="Wave Logo"
              width={24}
              height={24}
              className="mr-2"
            />
            <h3 className="text-lg font-bold">{text}</h3>
          </div>
          {showQuestion && (
            <p className="text-gray-600 mb-3 text-sm">{questionText}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PixelatedSection;
