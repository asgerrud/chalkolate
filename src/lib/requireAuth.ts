import { type GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";

export function requireAuth(callback) {
  return async (ctx: GetServerSidePropsContext) => {
    const session = await getSession(ctx);

    if (!session) {
      return {
        redirect: {
          destination: "/",
          permanent: false
        }
      };
    }

    return await callback();
  };
}
