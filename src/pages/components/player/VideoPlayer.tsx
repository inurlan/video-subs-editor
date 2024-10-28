import { useContext, useState } from 'react';
import FileUploadField from '../FileUploadField';
import Video from './Video';
import { MediaSyncContext } from '@/pages/context/MediaSyncProvider';

export default function VideoPlayer() {
  const { setAudioBuffer } = useContext(MediaSyncContext);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  async function handleVideoUpload(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      const file = event.target.files[0];

      const audioContext: AudioContext = new AudioContext();
      const arrayBuffer: ArrayBuffer = await file.arrayBuffer();
      const audioBuffer: AudioBuffer =
        await audioContext.decodeAudioData(arrayBuffer);

      setAudioBuffer(audioBuffer);

      const newVideoUrl = URL.createObjectURL(file);
      setVideoUrl(newVideoUrl);

      // Cleanup the URL when it's no longer needed to free up memory
      if (videoUrl) {
        URL.revokeObjectURL(videoUrl);
      }
    }
  }

  return (
    <>
      {!videoUrl && (
        <FileUploadField
          label="Upload video"
          onFileUpload={handleVideoUpload}
          format="video/mp4"
        />
      )}
      <Video videoUrl={videoUrl} />
    </>
  );
}
