import { useState, useRef, useEffect, createContext } from 'react';
import { Data, PlaybackState } from '../types/genericTypes';

export const MediaSyncContext = createContext<any>({
  rows: [],
  videoRef: {},
  playbackState: {},
});

export default function MediaSyncProvider({ children }: any) {
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer>();
  const [playbackState, setPlaybackState] = useState<PlaybackState>({
    currentSubIndex: 0,
    subtitles: [],
    currentTime: 0,
    videoDuration: 0, // in seconds
    subtitlesDuration: 0, // in seconds
    rezolution: 70, // pixels per second
  });

  const playbackStateRef = useRef(playbackState);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioTrackRef = useRef<HTMLVideoElement>(null);

  // Update ref whenever playbackState changes
  // This is done in order to avoid consturction and
  // destruction of timeupdate listener below in the useEffect
  useEffect(() => {
    playbackStateRef.current = playbackState;
  }, [playbackState]);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      // Event listener for when metadata is loaded
      const handleTimeUpdate = () => {
        const { subtitles, currentSubIndex } = playbackStateRef.current;
        const currentTime = Math.trunc(videoElement.currentTime) * 1000;
        const currentSub: Data = subtitles[currentSubIndex];

        // when sub preceede video track or falls behind
        // update its index that is associated with current video time
        if (
          currentSub &&
          (currentSub.start > currentTime || currentSub.end < currentTime)
        ) {
          const newCurrentSub = subtitles.find(
            (sub: Data) => sub.start <= currentTime && sub.end > currentTime
          ) as Data | undefined;

          // update iff current time falls into one of the existing sub ranges
          if (newCurrentSub) {
            setPlaybackState({
              ...playbackStateRef.current,
              currentTime: newCurrentSub.start / 1000,
              currentSubIndex: newCurrentSub.id - 1,
            });
          }
        }
      };

      videoElement.addEventListener('timeupdate', handleTimeUpdate);

      // Clean up the event listener on unmount
      return () => {
        videoElement.removeEventListener('timeupdate', handleTimeUpdate);
      };
    }
  }, []);

  return (
    <MediaSyncContext.Provider
      value={{
        audioBuffer,
        setAudioBuffer,
        playbackState,
        videoRef,
        audioTrackRef,
        rows: playbackState.subtitles,
        setVideoDuration: (videoDuration: number) => {
          setPlaybackState({
            ...playbackStateRef.current,
            videoDuration,
          });
        },
        setRows: (newRows: Data[]) => {
          setPlaybackState({
            ...playbackState,
            subtitles: newRows,
            subtitlesDuration: (newRows[newRows.length - 1]?.end || 0) / 1000,
          });
        },
      }}
    >
      {children}
    </MediaSyncContext.Provider>
  );
}
