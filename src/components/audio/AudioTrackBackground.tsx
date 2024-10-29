import { MediaSyncContext } from '@/context/MediaSyncProvider';
import { useContext } from 'react';

export default function AudioTrackBackground(props: {
  audioWaveformImage: string;
  children: React.ReactNode;
}) {
  const { children, audioWaveformImage } = props;
  const { playbackState } = useContext(MediaSyncContext);

  const audioContainerWidth =
    playbackState.videoDuration * playbackState.rezolution;

  const subtitlesContainerWidth =
    playbackState.subtitlesDuration * playbackState.rezolution;

  return (
    <div
      className="blank-audio-track"
      style={{
        width: Math.max(audioContainerWidth, subtitlesContainerWidth), // max-content
        backgroundImage: `url(${audioWaveformImage})`,
        opacity: 0.8,
        backgroundPositionY: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: `${audioContainerWidth}px ${innerHeight / 2}px`,
      }}
    >
      {children}
    </div>
  );
}
