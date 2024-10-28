import { MediaSyncContext } from '@/pages/context/MediaSyncProvider';
import React, { useContext, useEffect, useRef } from 'react';
import jsonToVttBlob from '@/pages/helpers/jsonToVttBlob';

export default function Video(props: { videoUrl: string | null }) {
  const { videoUrl } = props;
  const { videoRef, rows, setVideoDuration } = useContext(MediaSyncContext);
  const trackRef = useRef<HTMLTrackElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // Event listener for when metadata is loaded
      const handleLoadedMetadata = () => {
        const duration = video.duration;
        setVideoDuration(duration);
      };

      // Attach the event listener
      video.addEventListener('loadedmetadata', handleLoadedMetadata);

      // Clean up the event listener on unmount
      return () => {
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      };
    }
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (track && rows.length > 0) {
      const vttBlob = jsonToVttBlob(rows);
      const vttUrl = URL.createObjectURL(vttBlob);
      track.src = vttUrl;

      // Cleanup the URL when component is unmounted or subtitles change
      return () => URL.revokeObjectURL(vttUrl);
    }
  }, [rows]);

  return (
    <video
      style={{ height: videoUrl ? '100%' : 0 }}
      ref={videoRef}
      className="video-player"
      controls={true}
      // crossOrigin="anonymous"
      // preload="metadata"
    >
      {videoUrl && <source src={videoUrl} type="video/mp4" />}
      <track ref={trackRef} kind="subtitles" label="English" default={true} />
      Your browser does not support the video tag.
    </video>
  );
}
