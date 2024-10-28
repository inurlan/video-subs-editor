import MediaSyncProvider from '@/context/MediaSyncProvider';
import { CssBaseline, Container, Grid2, Paper } from '@mui/material';
import React from 'react';
import AudioTrack from '@/components/audio/AudioTrack';
import VideoPlayer from '@/components/player/VideoPlayer';
import Subtitles from '@/components/subtitles/Subtitles';

export default function Home() {
  return (
    <MediaSyncProvider>
      <CssBaseline />
      <Container maxWidth="xl">
        <Grid2 container spacing={2}>
          <Grid2 size={{ xs: 12, md: 6 }} style={{ height: '70vh' }}>
            <Subtitles />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Paper style={{ height: '70vh', width: '100%' }}>
              <VideoPlayer />
            </Paper>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 12 }}>
            <Paper style={{ height: '26vh', width: '100%' }}>
              <AudioTrack />
            </Paper>
          </Grid2>
        </Grid2>
      </Container>
    </MediaSyncProvider>
  );
}
