import Layout from "~/components/Layout";
import { api } from "~/lib/api";
import { type GetStaticPaths, type GetStaticPropsContext } from "next";
import { ssgHelper } from "~/server/api/ssgHelper";
import { ChallengeImage } from "~/components/challenge/challenge-image/challenge-image";
import { EPageRoute } from "~/types/enums/EPageRoute";
import CloseButton from "~/components/challenge/close-button/CloseButton";
import ChallengeBody from "~/components/challenge/challenge-body/ChallengeBody";

interface ChallengePageProps {
  id: string;
}

export function ChallengePage({ id }: ChallengePageProps) {
  const challenge = api.challenge.findById.useQuery({ id });

  if (challenge.data == null) {
    return null;
  }

  const { imageUrl, zone, endDate } = challenge.data;

  return (
    <Layout className="p-0">
      <div className="flex flex-col w-full overflow-auto h-[calc(100vh_-_60px)]">
        <div className="flex flex-[4]">
          <ChallengeImage imageUrl={imageUrl} />
        </div>
        <div className="flex flex-[3]">
          <ChallengeBody zoneName={zone.name} endDate={endDate} />
        </div>
      </div>
      <CloseButton />
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [], // Don't generate any pages by default
    fallback: "blocking" // Don't send the HTMl to client until it's done generating
  };
};
export async function getStaticProps(context: GetStaticPropsContext<{ id: string }>) {
  const id = context.params?.id;

  // Return to profile page if challenge id not found

  if (id == null) {
    return {
      redirect: {
        destination: EPageRoute.PROFILE
      }
    };
  }

  const ssg = ssgHelper();
  await ssg.challenge.findById.prefetch({ id });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id
    }
  };
}
export default ChallengePage;
