export interface VideoProps {
  url: string;
  autoPlay?: boolean;
  controls?: boolean;
}

export function Video({ url, autoPlay = false, controls = true }: VideoProps) {
  return (
    <div className="relative w-full aspect-video rounded-lg overflow-hidden">
      <video
        className="w-full h-full object-cover"
        src={url}
        autoPlay={autoPlay}
        controls={controls}
        loop={autoPlay}
        muted={autoPlay}
        playsInline
      />
    </div>
  );
}
