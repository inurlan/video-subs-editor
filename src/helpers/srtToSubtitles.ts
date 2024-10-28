import srtParser2 from 'srt-parser-2';
import { Data } from '../types/genericTypes';

const parser = new srtParser2();

export default async function srtToSubtitles(file: File) {
  const srt = await file.text();

  // unprocessed json
  const subtitles = parser.fromSrt(srt);

  // processing
  if (subtitles.length > 0) {
    // map subtitles to the Data object
    const processedSubs: Data[] = subtitles.map(
      ({ id, startSeconds, endSeconds, text }) => {
        const start = Math.trunc(startSeconds) * 1000;
        const end = Math.trunc(endSeconds) * 1000;

        return {
          id: Number(id),
          start,
          end,
          duration: end - start,
          merge: '',
          text,
        } as Data;
      }
    );

    return processedSubs;
  }

  return [];
}
