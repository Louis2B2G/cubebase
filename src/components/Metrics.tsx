// src/components/Metrics.tsx
import { useEffect, useState, useRef } from 'react';

interface Metrics {
  accuracy: number;
  processingTime: number;
  dailyExtractions: number;
  uptime: number;
  fileTypes: {
    type: string;
    percentage: number;
    color: string;
  }[];
  speedMetrics: {
    label: string;
    value: number;
    color: string;
  }[];
}

interface TimeSeriesData {
  date: string;
  value: number;
}

const ANIMATION_DURATION_MS = 5000;
const ANIMATION_INTERVAL_MS = 50;

const FINAL_METRICS: Metrics = {
  accuracy: 97,
  processingTime: 1.2,
  dailyExtractions: 2400,
  uptime: 99.9,
  fileTypes: [
    { type: 'PDF', percentage: 45, color: '#3B82F6' },
    { type: 'Images', percentage: 25, color: '#EC4899' },
    { type: 'Word', percentage: 20, color: '#F97316' },
    { type: 'Other', percentage: 10, color: '#10B981' }
  ],
  speedMetrics: [
    { label: 'Preprocessing', value: 0.3, color: '#3B82F6' },
    { label: 'TTFirst token', value: 0.5, color: '#EC4899' },
    { label: 'Inference', value: 0.4, color: '#F97316' }
  ]
};

const TIME_SERIES_DATA: TimeSeriesData[] = [
  { date: '5-Nov', value: 14 },
  { date: '7-Nov', value: 11 },
  { date: '9-Nov', value: 2 },
  { date: '11-Nov', value: 15 },
  { date: '13-Nov', value: 16 },
  { date: '15-Nov', value: 3 },
  { date: '17-Nov', value: 24 },
  { date: '19-Nov', value: 20 },
  { date: '21-Nov', value: 15 },
  { date: '23-Nov', value: 2 },
  { date: '25-Nov', value: 15 },
  { date: '27-Nov', value: 12 },
  { date: '29-Nov', value: 19 },
  { date: '1-Dec', value: 1 },
  { date: '3-Dec', value: 23 },
  { date: '5-Dec', value: 20 },
];

const getPathFromPoints = (points: { x: number, y: number }[], width: number, height: number): string => {
  const maxValue = Math.max(...TIME_SERIES_DATA.map(d => d.value));
  const minValue = Math.min(...TIME_SERIES_DATA.map(d => d.value));
  const padding = (maxValue - minValue) * 0.1; // Add 10% padding

  const normalizedPoints = points.map(point => ({
    x: (point.x / (TIME_SERIES_DATA.length - 1)) * width,
    y: height - ((point.y - minValue) / (maxValue - minValue + padding * 2)) * height
  }));

  // Create a smooth curve using cubic bezier
  return normalizedPoints.reduce((path, point, i, points) => {
    if (i === 0) {
      return `M ${point.x},${point.y}`;
    }

    // Calculate control points for smooth curve
    const prev = points[i - 1];
    const tension = 0.3;
    const cp1x = prev.x + (point.x - prev.x) * tension;
    const cp1y = prev.y;
    const cp2x = point.x - (point.x - prev.x) * tension;
    const cp2y = point.y;

    return `${path} C ${cp1x},${cp1y} ${cp2x},${cp2y} ${point.x},${point.y}`;
  }, '');
};

const MetricsDisplay = () => {
  const metricsRef = useRef<HTMLDivElement>(null);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [metrics, setMetrics] = useState<Metrics>({
    ...FINAL_METRICS,
    accuracy: 0,
    processingTime: 0,
    dailyExtractions: 0,
    uptime: 0
  });

  // Add Intersection Observer to trigger animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !shouldAnimate) {
          setShouldAnimate(true);
        }
      },
      { threshold: 0.2 } // Trigger when 20% of the element is visible
    );

    if (metricsRef.current) {
      observer.observe(metricsRef.current);
    }

    return () => observer.disconnect();
  }, [shouldAnimate]);

  // Only start the animation when shouldAnimate is true
  useEffect(() => {
    if (!shouldAnimate) return;

    const startTime = Date.now();
    const timer = setInterval(() => {
      const progress = Math.min((Date.now() - startTime) / ANIMATION_DURATION_MS, 1);
      
      setMetrics(prev => ({
        ...prev,
        accuracy: Math.floor(progress * FINAL_METRICS.accuracy),
        processingTime: Number((progress * FINAL_METRICS.processingTime).toFixed(1)),
        dailyExtractions: Math.floor(progress * FINAL_METRICS.dailyExtractions),
        uptime: Number((progress * FINAL_METRICS.uptime).toFixed(1))
      }));

      if (progress === 1) {
        clearInterval(timer);
      }
    }, ANIMATION_INTERVAL_MS);

    return () => clearInterval(timer);
  }, [shouldAnimate]);

  return (
    <div ref={metricsRef} className="w-full bg-black/10 rounded-xl p-4 flex flex-col gap-4">
      {/* Time Series Chart */}
      <div className="bg-black/20 p-3 rounded-lg">
        <h3 className="text-sm font-medium mb-2">Extractions Over Time</h3>
        <div className="w-full h-[120px] relative">
          <svg 
            width="100%" 
            height="100%" 
            viewBox="0 0 100 100" 
            preserveAspectRatio="none"
            className="overflow-visible"
          >
            {/* Optional: Add subtle grid lines */}
            {[20, 40, 60, 80].map((y) => (
              <line
                key={y}
                x1="0"
                y1={y}
                x2="100"
                y2={y}
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="0.5"
              />
            ))}
            
            <path
              d={getPathFromPoints(
                TIME_SERIES_DATA.map((d, i) => ({ x: i, y: d.value })),
                100,
                100
              )}
              fill="none"
              stroke="#3B82F6"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="drop-shadow-[0_0_6px_rgba(59,130,246,0.4)]"
              style={{
                strokeDasharray: 1000,
                strokeDashoffset: shouldAnimate ? 0 : 1000,
                transition: 'stroke-dashoffset 10s ease-out'
              }}
            />
          </svg>
        </div>
      </div>

      {/* Top Stats Grid - Reduced bottom margin */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-black/20 p-3 rounded-lg">
          <div className="text-xl font-bold">{metrics.accuracy}%</div>
          <div className="text-xs text-gray-400">Overall Accuracy</div>
        </div>
        <div className="bg-black/20 p-3 rounded-lg">
          <div className="text-xl font-bold">{metrics.processingTime}s</div>
          <div className="text-xs text-gray-400">Avg. Processing</div>
        </div>
        <div className="bg-black/20 p-3 rounded-lg">
          <div className="text-xl font-bold">{metrics.dailyExtractions.toLocaleString()}</div>
          <div className="text-xs text-gray-400">Daily Extractions</div>
        </div>
        <div className="bg-black/20 p-3 rounded-lg">
          <div className="text-xl font-bold">{metrics.uptime}%</div>
          <div className="text-xs text-gray-400">System Uptime</div>
        </div>
      </div>

      {/* Middle section - Using gap instead of margins */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* File Types Distribution */}
        <div className="bg-black/20 p-3 rounded-lg">
          <h3 className="text-sm font-medium mb-2">File-type Distribution</h3>
          <div className="space-y-1.5">
            {metrics.fileTypes.map(type => (
              <div key={type.type} className="flex items-center gap-2">
                <div className="flex-grow h-1.5 bg-black/20 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full"
                    style={{ 
                      width: shouldAnimate ? `${type.percentage}%` : '0%',
                      backgroundColor: type.color,
                      transition: 'width 1s ease-out'
                    }}
                  />
                </div>
                <span className="text-xs whitespace-nowrap w-20">
                  {type.type} {shouldAnimate ? type.percentage : 0}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Processing Speed */}
        <div className="bg-black/20 p-3 rounded-lg">
          <h3 className="text-sm font-medium mb-2">Processing Speed</h3>
          <div className="space-y-1.5">
            {metrics.speedMetrics.map(metric => (
              <div key={metric.label} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>{metric.label}</span>
                  <span>{metric.value}s</span>
                </div>
                <div className="h-1.5 bg-black/20 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ 
                      width: shouldAnimate ? `${(metric.value / 1.2) * 100}%` : '0%',
                      backgroundColor: metric.color,
                      transition: 'width 1s ease-out'
                    } as React.CSSProperties}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Field-level Accuracy - Removed bottom margin */}
      <div className="bg-black/20 p-3 rounded-lg">
        <h3 className="text-sm font-medium mb-2">Field-level Accuracy</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1.5">
          {[
            { field: 'Company Name', accuracy: 98.5 },
            { field: 'Invoice Number', accuracy: 99.2 },
            { field: 'VAT Number', accuracy: 97.8 },
            { field: 'Total Amount', accuracy: 96.9 },
            { field: 'Date', accuracy: 99.5 },
            { field: 'Address', accuracy: 95.8 }
          ].map((field, index) => (
            <div key={index} className="space-y-1">
              <div className="flex justify-between text-xs">
                <span>{field.field}</span>
                <span>{field.accuracy}%</span>
              </div>
              <div className="h-1.5 bg-black/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-emerald-400 rounded-full"
                  style={{ 
                    width: shouldAnimate ? `${field.accuracy}%` : '0%',
                    transition: 'width 1s ease-out'
                  } as React.CSSProperties}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MetricsDisplay;