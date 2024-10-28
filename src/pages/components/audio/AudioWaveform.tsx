import { MediaSyncContext } from '@/pages/context/MediaSyncProvider';
import { findMin } from '@/pages/helpers/findMin';
import { findMax } from '@/pages/helpers/findMax';
import { Dispatch, useContext, useEffect, useRef, useState } from 'react';

export default function AudioWaveform(props: {
  setAudioWaveformImage: Dispatch<string>;
}) {
  const { setAudioWaveformImage } = props;
  const { audioBuffer, playbackState } = useContext(MediaSyncContext);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas && audioBuffer) {
      drawWaveform(canvas, audioBuffer);
    }
  }, [audioBuffer, playbackState.videoDuration]);

  const drawWaveform = (
    canvas: HTMLCanvasElement,
    audioBuffer: AudioBuffer
  ) => {
    const context = canvas.getContext('2d');

    const audioContainerWidth =
      playbackState.videoDuration * playbackState.rezolution;

    const width = audioContainerWidth;
    const height = innerHeight;

    // Set canvas size and clear it
    canvas.width = width;
    canvas.height = height;
    context?.clearRect(0, 0, width, height);

    // Draw waveform
    const data = audioBuffer.getChannelData(0); // Get data for the first channel
    const step = Math.ceil(data.length / width); // Step through audio data
    const amp = 80;

    if (context) {
      context.beginPath();
      context.moveTo(0, amp);

      for (let i = 0; i < width; i++) {
        const min = findMin(data, i * step, (i + 1) * step); // Math.min(...data.slice(i * step, (i + 1) * step));
        const max = findMax(data, i * step, (i + 1) * step); // Math.max(...data.slice(i * step, (i + 1) * step));

        context.lineTo(i, (1 + min) * amp);
        context.lineTo(i, (1 + max) * amp);
      }

      context.strokeStyle = '#008080';
      context.lineWidth = 1;
      context.stroke();

      // Convert canvas to data URL and set it as the background image
      const dataUrl = canvas.toDataURL();
      setAudioWaveformImage(dataUrl);
    }
  };

  return <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>;
}
