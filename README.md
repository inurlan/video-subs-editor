# Video Subtitles Editor

**Video Subtitles Editor** is a web-based application for editing and synchronizing subtitles on video files. This tool accepts `.srt` subtitle files and `.mp4` videos, providing a streamlined workflow for precise subtitle editing. Perfect for content creators, translators, and video editors, the editor allows you to align subtitles accurately with video and audio.

[![Live Demo](https://img.shields.io/badge/Live-Demo-green)](https://video-subs-editor.netlify.app/)

## Features

- **Upload Support**: Accepts `.mp4` files for videos and `.srt` files for subtitles.
- **Real-Time Editing**: Adjust subtitle text and timings while playing the video.
- **Synchronization**: Dynamically synchronizes subtitles with video playback.
- **User-Friendly UI**: An intuitive interface for quick and efficient editing.
- **Built with React and TypeScript**: Offers a fast and responsive experience with modern front-end technologies.

## Demo

Try the **Video Subtitles Editor** in action: [Live Demo](https://video-subs-editor.netlify.app/)

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/inurlan/video-subs-editor.git
   cd video-subs-editor
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Run the application on develeopment**:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to use the app locally.

## Usage

1. **Upload a Video and Subtitle File**:

   - Click on the "Upload Video" button to select an `.mp4` video file.
   - Click on the "Upload Subtitle" button to select an `.srt` subtitle file.

2. **Edit Subtitles**:

   - Play the video and observe the subtitle timing.
   - Adjust text and timing directly in the subtitle table for precise synchronization.
   - Changes are reflected in real-time on the video.

3. **Save Edits**:
   - Export your edited subtitles in `.srt` format or adjust as needed.

## Tech Stack

- **Frontend**: React, TypeScript
- **Styling**: CSS, MUI (Material-UI)
- **State Management**: Context API
- **Deployment**: Netlify

## Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**.
2. **Create a new branch** for your feature/bug fix.
3. **Commit your changes** and push them to your branch.
4. Submit a **pull request** for review.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
