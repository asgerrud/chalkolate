import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "~/components/ui/button";
import { EPageRoute } from "~/types/enums/EPageRoute";
import { LogOut, PlusCircle, Settings, UserCircle2 } from "lucide-react";
import Link from "next/link";
import { cn } from "~/lib/utils";
import { useRouter } from "next/router";

const pages = [
  { href: EPageRoute.PROFILE, title: "Profile", icon: <UserCircle2 className="h-5" /> },
  { href: EPageRoute.ADD, title: "Add", icon: <PlusCircle className="h-5" /> },
  { href: EPageRoute.SETTINGS, title: "Settings", icon: <Settings className="h-5" /> }
];

export default function Navbar() {
  const session = useSession();
  const router = useRouter();
  const user = session.data?.user;

  return (
    <div className="px-8 py-3 bg-white fixed w-full bottom-0">
      <div className="flex justify-between items-center max-w-[640px] mx-auto">
        {user != null ? (
          <>
            {pages.map((item) => (
              <MenuLinkItem key={item.href} item={item} selected={item.href === router.pathname} />
            ))}
            <div className="flex flex-col items-center" onClick={() => signOut()}>
              <LogOut className="h-5" />
              <MenuItemLabel text="Sign out" />
            </div>
          </>
        ) : (
          <Button variant="ghost" onClick={() => signIn()}>
            Login
          </Button>
        )}
      </div>
    </div>
  );
}

function MenuLinkItem({ item, selected }: { item: (typeof pages)[0]; selected: boolean }) {
  const { href, title, icon } = item;
  return (
    <Link href={href} className={cn("flex flex-col items-center", selected && "underline")}>
      {icon}
      <MenuItemLabel text={title} />
    </Link>
  );
}

function MenuItemLabel({ text }: { text: string }) {
  return <span className="font-medium text-xs">{text}</span>;
}
