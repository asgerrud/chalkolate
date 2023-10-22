import { cn } from "~/lib/utils";
import Image from "next/image";

interface ChallengeCardImageProps {
  imageUrl: string;
  gradeColor: string;
  expired: boolean;
}

export function ChallengeCardImage({ imageUrl, gradeColor, expired }: ChallengeCardImageProps) {
  return (
    <div
      className={cn("h-[200px]", expired && "opacity-75")}
      style={{
        backgroundColor: gradeColor
      }}>
      {imageUrl !== null && (
        <Image
          src={imageUrl}
          className="object-cover w-full h-full"
          width={600}
          height={600}
          alt="Picture of a climbing problem"
        />
      )}
    </div>
  );
}
