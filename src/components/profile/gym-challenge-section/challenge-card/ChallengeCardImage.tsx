import { cn } from "~/lib/utils";
import Image from "next/image";
import { motion } from "framer-motion";

interface ChallengeCardImageProps {
  id: string;
  imageUrl: string;
  gradeColor: string;
  className?: string;
}

export function ChallengeCardImage({ id, imageUrl, gradeColor, className }: ChallengeCardImageProps) {
  return (
    <motion.div
      className={cn("h-[200px]", className)}
      style={{
        backgroundColor: gradeColor
      }}
      layoutId={`card-image-${id}`}>
      {imageUrl !== null && (
        <Image
          src={imageUrl}
          className="object-cover w-full h-full"
          width={600}
          height={600}
          alt="Picture of a climbing problem"
        />
      )}
    </motion.div>
  );
}
