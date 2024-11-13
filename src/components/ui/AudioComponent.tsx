import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";

interface RecorderComponentProps {
  isRecording: boolean;
  onStartRecording: () => void;
  onStopRecording: (audioUrl: string) => void;
  audioUrl: string | null;
}

const RecorderComponent: React.FC<RecorderComponentProps> = ({ 
  isRecording, 
  onStartRecording, 
  onStopRecording, 
  audioUrl 
}) => {
  const [timer, setTimer] = useState<number>(0);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioElement = useRef<HTMLAudioElement>(null);
  const timerInterval = useRef<NodeJS.Timeout | null>(null);

  const startTimer = useCallback(() => {
    stopTimer(); // Clear any existing interval
    timerInterval.current = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);
  }, []); // No dependencies needed for startTimer
  

  const startRecording = useCallback(async () => {
    setTimer(0); // Reset timer
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (!stream) {
        throw new Error('Failed to get audio stream');
      }
  
      mediaRecorder.current = new MediaRecorder(stream);
      startTimer(); // Include startTimer in the dependency array
  
      let chunks: Blob[] = [];
      mediaRecorder.current.ondataavailable = (event) => {
        chunks.push(event.data);
      };
  
      mediaRecorder.current.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        onStopRecording(url);
      };
  
      mediaRecorder.current.start();
    } catch (error: any) {
      console.error('Error starting recording:', error.message);
    }
  }, [onStopRecording, startTimer]);


  const stopRecording = useCallback(() => {
    stopTimer();
    if (mediaRecorder.current && mediaRecorder.current.state !== 'inactive') {
      mediaRecorder.current.stop();
    }
  }, []);

  useEffect(() => {
    return () => {
      stopTimer();
    };
  }, []);

  useEffect(() => {
    if (isRecording) {
      startRecording();
    } else {
      stopRecording();
    }
  }, [isRecording, startRecording, stopRecording]);

  const playAudio = () => {
    if (audioUrl && audioElement.current) {
      audioElement.current.src = audioUrl;
      audioElement.current.play();
    }
  };

  const stopAudio = () => {
    if (audioElement.current) {
      audioElement.current.pause();
      audioElement.current.currentTime = 0;
    }
  };

  const formatTime = (seconds: number): string => {
    const format = (val: number) => `0${Math.floor(val)}`.slice(-2);
    const mins = (seconds / 60) % 60;
    const secs = seconds % 60;
    return `${format(mins)}:${format(secs)}`;
  };



  const stopTimer = () => {
    if (timerInterval.current) {
      clearInterval(timerInterval.current);
      timerInterval.current = null;
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="grid gap-6">
        <div className="flex items-center justify-center gap-6">
          {!isRecording ? (
            <Button size="icon" variant="ghost" className="text-primary" onClick={onStartRecording}>
              <MicIcon className="w-6 h-6"/>
            </Button>
          ) : (
            <Button size="icon" variant="ghost" className="text-red-500" onClick={() => onStopRecording(audioUrl || '')}>
              <CircleStopIcon className="w-6 h-6"/>
            </Button>
          )}
          <div className='ml-5'>
          {audioUrl && (
            <>
              <Button size="icon" variant="ghost" className="text-green-500" onClick={playAudio}>
                <PlayIcon className = "w-6 h-6"/>
              </Button>
              <Button size="icon" variant="ghost" className="text-red-500" onClick={stopAudio}>
                <CirclePauseIcon className="w-6 h-6"/>
              </Button>
            </>
          )}
          </div>
        </div>
        <div className="flex items-center justify-center -ml-8">
          <div className="text-sm text-muted-foreground">
            {formatTime(timer)}
          </div>
        </div>
      </div>
      <audio ref={audioElement} controls style={{ display: 'none' }} />
    </div>
  );
};

function CircleStopIcon(props :any ) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <rect width="6" height="6" x="9" y="9" />
    </svg>
  )
}

function CirclePauseIcon(props :any ) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
    <path d="M10 4H6V20H10V4Z" fill="currentColor" />
    <path d="M18 4H14V20H18V4Z" fill="currentColor" />

    </svg>
  )
}

function MicIcon(props :any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" x2="12" y1="19" y2="22" />
    </svg>
  )
};

function PlayIcon(props :any ) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="6 3 20 12 6 21 6 3" />
    </svg>
  )
}

export default RecorderComponent;
