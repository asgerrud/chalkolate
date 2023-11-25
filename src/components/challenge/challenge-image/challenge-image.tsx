import Image from "next/image";

interface ChallengeImageProps {
  imageUrl: string;
}
export function ChallengeImage({ imageUrl }: ChallengeImageProps) {
  return (
    <div className="w-full overflow-hidden relative">
      <Image
        src={imageUrl}
        className="absolute left-0 top-0 blur-md w-full h-full scale-x-150 scale-y-125 z-[0]"
        width={600}
        height={600}
        alt="Blurred-out picture of a climbing problem"
      />
      <Image
        src={imageUrl}
        className="relative object-contain w-auto h-full z-[1] mx-auto"
        width={600}
        height={600}
        alt="Picture of a climbing problem"
      />
    </div>
  );
}
