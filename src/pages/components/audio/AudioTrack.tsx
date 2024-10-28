import { MediaSyncContext } from '@/pages/context/MediaSyncProvider';
import { useContext, useState } from 'react';
import AudioTrackCursors from './AudioTrackCursor';
import AudioTrackBackground from './AudioTrackBackground';
import AudioWaveform from './AudioWaveform';
import AudioTrackSubtitles from './AudioTrackSubtitles';

export default function AudioTrack() {
  const [audioWaveformImage, setAudioWaveformImage] = useState<string>('');
  const { audioTrackRef } = useContext(MediaSyncContext);

  return (
    <div ref={audioTrackRef} className="audio-track">
      <AudioTrackCursors />
      <AudioTrackBackground audioWaveformImage={audioWaveformImage}>
        <AudioWaveform setAudioWaveformImage={setAudioWaveformImage} />
        <AudioTrackSubtitles />
      </AudioTrackBackground>
    </div>
  );
}
