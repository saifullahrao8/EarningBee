import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Camera, CheckCircle, XCircle } from 'lucide-react';

interface FaceScannerProps {
  onScanComplete: (faceData: string) => void;
  onCancel: () => void;
}

const FaceScanner: React.FC<FaceScannerProps> = ({ onScanComplete, onCancel }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanStatus, setScanStatus] = useState<'idle' | 'scanning' | 'success' | 'error'>('idle');
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: 640, 
          height: 480,
          facingMode: 'user'
        } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.log('Camera access denied, using simulation mode');
      // Continue with simulation - no camera required
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
  };

  const startScan = () => {
    setIsScanning(true);
    setScanStatus('scanning');
    setScanProgress(0);

    // Simulate face scanning progress
    intervalRef.current = setInterval(() => {
      setScanProgress(prev => {
        const newProgress = prev + Math.random() * 15 + 5;
        
        if (newProgress >= 100) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }
          
          // Simulate scan completion
          setTimeout(() => {
            const success = Math.random() > 0.1; // 90% success rate
            
            if (success) {
              setScanStatus('success');
              const faceData = generateFaceData();
              setTimeout(() => {
                stopCamera();
                onScanComplete(faceData);
              }, 1500);
            } else {
              setScanStatus('error');
              setTimeout(() => {
                setScanStatus('idle');
                setIsScanning(false);
                setScanProgress(0);
              }, 2000);
            }
          }, 500);
          
          return 100;
        }
        
        return newProgress;
      });
    }, 100);
  };

  const generateFaceData = (): string => {
    // Generate a unique face data string (simulated)
    const timestamp = Date.now().toString();
    const random = Math.random().toString(36).substring(2);
    return `face_${timestamp}_${random}`;
  };

  const getScanStatusColor = () => {
    switch (scanStatus) {
      case 'scanning': return 'border-blue-500';
      case 'success': return 'border-green-500';
      case 'error': return 'border-red-500';
      default: return 'border-gray-300 dark:border-gray-600';
    }
  };

  const getScanStatusIcon = () => {
    switch (scanStatus) {
      case 'success': return <CheckCircle className="text-green-500" size={24} />;
      case 'error': return <XCircle className="text-red-500" size={24} />;
      default: return <Camera className="text-gray-500" size={24} />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full shadow-2xl"
      >
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            Face Authentication
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Position your face in the frame and click scan
          </p>
        </div>

        <div className="relative mb-6">
          {/* Camera View or Placeholder */}
          <div className={`relative w-full h-64 bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden border-4 transition-colors ${getScanStatusColor()}`}>
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className="w-full h-full object-cover"
              style={{ transform: 'scaleX(-1)' }} // Mirror effect
            />
            
            {/* Face detection overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{
                  scale: isScanning ? [1, 1.05, 1] : 1,
                  opacity: isScanning ? [0.5, 1, 0.5] : 0.7,
                }}
                transition={{
                  duration: 1,
                  repeat: isScanning ? Infinity : 0,
                }}
                className="w-48 h-48 border-4 border-bee-400 rounded-full flex items-center justify-center"
              >
                <div className="w-40 h-40 border-2 border-bee-300 rounded-full flex items-center justify-center">
                  {getScanStatusIcon()}
                </div>
              </motion.div>
            </div>

            {/* Scanning Animation */}
            {isScanning && scanStatus === 'scanning' && (
              <motion.div
                initial={{ y: -100 }}
                animate={{ y: 300 }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-bee-400 to-transparent"
              />
            )}
          </div>

          {/* Progress Bar */}
          {isScanning && (
            <div className="mt-4">
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-2">
                <span>Scanning Progress</span>
                <span>{Math.round(scanProgress)}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <motion.div
                  className="h-2 bg-gradient-to-r from-bee-400 to-bee-600 rounded-full"
                  style={{ width: `${scanProgress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Status Messages */}
        <div className="text-center mb-6">
          {scanStatus === 'idle' && (
            <p className="text-gray-600 dark:text-gray-300">
              Ready to scan. Make sure your face is visible and well-lit.
            </p>
          )}
          {scanStatus === 'scanning' && (
            <p className="text-blue-600 dark:text-blue-400">
              Scanning your face... Please hold still.
            </p>
          )}
          {scanStatus === 'success' && (
            <p className="text-green-600 dark:text-green-400">
              Face scan successful! Generating your private key...
            </p>
          )}
          {scanStatus === 'error' && (
            <p className="text-red-600 dark:text-red-400">
              Scan failed. Please ensure good lighting and try again.
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <button
            onClick={onCancel}
            disabled={isScanning}
            className="flex-1 px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          
          <button
            onClick={startScan}
            disabled={isScanning || scanStatus === 'success'}
            className="flex-1 px-4 py-2 bg-gradient-to-r from-bee-400 to-bee-600 text-white rounded-lg hover:from-bee-500 hover:to-bee-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {scanStatus === 'scanning' ? 'Scanning...' : 'Start Scan'}
          </button>
        </div>

        <canvas ref={canvasRef} className="hidden" />
      </motion.div>
    </div>
  );
};

export default FaceScanner;