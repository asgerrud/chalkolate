import { cn } from "~/lib/utils";
import Image from "next/image";

interface ChallengeCardImageProps {
  id: string;
  imageUrl: string;
  gradeColor: string;
  className?: string;
}

export function ChallengeCardImage({ imageUrl, gradeColor, className }: ChallengeCardImageProps) {
  return (
    <div
      className={cn("w-full h-[200px]", className)}
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
