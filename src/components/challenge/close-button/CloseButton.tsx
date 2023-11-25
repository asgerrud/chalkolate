import Link from "next/link";
import { EPageRoute } from "~/types/enums/EPageRoute";
import { Button } from "~/components/ui/button";
import { X } from "lucide-react";

export default function CloseButton() {
  return (
    <div className="fixed md:absolute top-[8px] right-[8px] z-50">
      <Link href={EPageRoute.PROFILE}>
        <Button className="rounded-full w-[28px] h-[28px] p-0 bg-white" variant="secondary">
          <X size={20} />
        </Button>
      </Link>
    </div>
  );
}
