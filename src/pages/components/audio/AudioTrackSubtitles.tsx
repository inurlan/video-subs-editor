import { MediaSyncContext } from '@/pages/context/MediaSyncProvider';
import msConversion from '@/pages/helpers/msConversion';
import { Data } from '@/pages/types/genericTypes';
import { useContext } from 'react';

export default function AudioTrackSubtitles() {
  const { playbackState } = useContext(MediaSyncContext);

  function subtitleSectionWidth(id: number) {
    const sectionTime =
      id === 1
        ? playbackState.subtitles[id - 1].end
        : playbackState.subtitles[id - 1].end -
          playbackState.subtitles[id - 2].end;
    return (sectionTime / 1000) * playbackState.rezolution + 'px';
  }

  if (playbackState.subtitles.length > 0) {
    return playbackState.subtitles.map(({ id, end, text }: Data) => {
      return (
        <p
          key={id}
          id={`subtitle-section-${id}`}
          className="audio-track-section"
          style={{
            width: subtitleSectionWidth(id),
            backgroundColor:
              Number(id) - 1 === playbackState.currentSubIndex
                ? 'rgb(250, 235, 252, 0.6)'
                : 'transparent',
          }}
        >
          {text}
          <span className="audio-track-elapsed-time">{msConversion(end)}</span>
        </p>
      );
    });
  }

  return null;
}
