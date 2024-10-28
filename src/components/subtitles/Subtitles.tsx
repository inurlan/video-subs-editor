import { MediaSyncContext } from '@/context/MediaSyncProvider';
import { useContext } from 'react';
import FileUploadField from '../FileUploadField';
import srtToSubtitles from '@/helpers/srtToSubtitles';
import Table from '../table/Table';
import { Data } from '@/types/genericTypes';

export default function Subtitle() {
  const { playbackState, setRows } = useContext(MediaSyncContext);

  function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      srtToSubtitles(event.target.files[0]).then((subtitles: Data[]) =>
        setRows(subtitles)
      );
    }
  }

  if (playbackState.subtitles.length > 0) {
    return <Table />;
  }

  return (
    <FileUploadField label="Upload subtitles" onFileUpload={handleFileUpload} />
  );
}
