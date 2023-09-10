import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "~/components/ui/button";
import { EPageRoute } from "~/types/enums/EPageRoute";
import { useRouter } from "next/router";

function MenuItems() {
  const router = useRouter();

  const pages = [
    { href: EPageRoute.PROFILE, name: "Profile" },
    { href: EPageRoute.SETTINGS, name: "Settings" }
  ];

  return pages.map((item) => {
    const isSelected = item.href === router.pathname;
    return (
      <Button key={item.href} variant="ghost">
        <a href={item.href} className={`${isSelected && "underline"}`}>
          {item.name}
        </a>
      </Button>
    );
  });
}

export default function Navbar() {
  const session = useSession();
  const user = session.data?.user;

  return (
    <div className="bg-gray-100 px-8 py-4">
      <div className="flex justify-end">
        {user != null ? (
          <>
            <MenuItems />
            <Button variant="ghost" onClick={() => signOut()}>
              Sign out
            </Button>
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
