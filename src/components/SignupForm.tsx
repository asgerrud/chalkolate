import { type InferGetServerSidePropsType } from "next";
import { signIn } from "next-auth/react";
import { type getServerSideProps } from "~/pages";

export default function SignInForm({ providers }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button onClick={() => signIn(provider.id)}>Sign in with {provider.name}</button>
        </div>
      ))}
    </>
  );
}
