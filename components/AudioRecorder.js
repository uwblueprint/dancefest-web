import dynamic from 'next/dynamic'; // NextJS dynamic imports

// Dynamically import ReactMic component, as it depends on window which is not defined when using NextJS SSR
const ReactMic = dynamic(
  () => import('@cleandersonlobo/react-mic').then(component => component.ReactMic),
  {
    ssr: false,
  }
);

export default function AudioRecorder({ className, onStopRecording, recording = false }) {
  return (
    <ReactMic
      className={className}
      record={recording}
      onStop={onStopRecording}
      mimeType="audio/mp3"
      strokeColor="#a72a1d" // brand-other-red
    />
  );
}
