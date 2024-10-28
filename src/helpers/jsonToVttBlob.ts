import { Data } from '../types/genericTypes';
import msConversion from './msConversion';

// Convert subtitles to WebVTT format
export default function jsonToVttBlob(subtitles: Data[]) {
  let vttString = 'WEBVTT\n\n';
  subtitles.forEach((sub) => {
    vttString += `${sub.id}\n`;
    vttString += `${msConversion(sub.start) + '.000'} --> ${msConversion(sub.end) + '.000'}\n`;
    vttString += `${sub.text}\n\n`;
  });

  return new Blob([vttString], { type: 'text/vtt' });
}
