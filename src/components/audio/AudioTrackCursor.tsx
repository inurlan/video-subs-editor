import { MediaSyncContext } from '@/context/MediaSyncProvider';
import dragElement from '@/helpers/dragElement';
import { useRef, useContext, useEffect } from 'react';

export default function AudioTrackCursors() {
  const { videoRef, playbackState } = useContext(MediaSyncContext);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;

    const video = videoRef.current;

    if (cursor && video) {
      const audioContainerWidth =
        playbackState.videoDuration * playbackState.rezolution;

      cursorVideoSynchronization(cursor, video, audioContainerWidth);
    }
  }, [playbackState.videoDuration, playbackState.rezolution, videoRef]);

  return (
    <div ref={cursorRef} className="audio-cursor">
      <div className="trapezoid" />
    </div>
  );
}

function cursorVideoSynchronization(
  cursor: HTMLDivElement,
  video: HTMLVideoElement,
  audioContainerWidth: number
) {
  // this is padding around audio track
  const padding = 14;

  let seekTime: number = -1;
  const onElementDarg = (cursorPosition: number) => {
    seekTime =
      ((cursorPosition - padding) / audioContainerWidth) * video.duration;

    // seekTime is undefined when video is not loaded
    if (seekTime) video.currentTime = seekTime;
  };

  // map current progress ration to audio track
  // width to find current position of the cursor
  video.ontimeupdate = () => {
    // prevent update cycles in order to optimize and smoothen ui
    if (seekTime.toFixed(3) !== video.currentTime.toFixed(3)) {
      // calculate current progress ratio
      const videoProgress = video.currentTime / video.duration;

      // and multiply by the ration. Finally we add padding to align cursor within the audio track
      cursor.style.left = audioContainerWidth * videoProgress + padding + 'px';
    }
  };

  dragElement(cursor, padding, audioContainerWidth + padding, onElementDarg);
}
