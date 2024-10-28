export type Data = {
  merge: string;
  id: number;
  start: number;
  end: number;
  duration: number;
  text: string;
};

export type ColumnData = {
  dataKey: keyof Data;
  label: string;
  numeric?: boolean;
  width?: number;
};

export type DataError = {
  index: number;
  dataKey: string;
};

export type PlaybackState = {
  currentSubIndex: number;
  subtitles: Data[];
  currentTime: number;
  videoDuration: number;
  subtitlesDuration: number;
  rezolution: number;
};
