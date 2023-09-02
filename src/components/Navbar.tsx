import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "~/components/ui/button";

export default function Navbar() {
  const session = useSession();
  const user = session.data?.user;

  return (
    <div className="bg-gray-100 px-8 py-4">
      <div className="flex justify-end">
        {user != null ? (
          <Button variant="ghost" onClick={() => signOut()}>
            Sign out
          </Button>
        ) : (
          <Button variant="ghost" onClick={() => signIn()}>
            Login
          </Button>
        )}
      </div>
    </div>
  );
}
