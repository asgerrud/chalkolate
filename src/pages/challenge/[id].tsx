import Layout from "~/components/Layout";
import { api } from "~/lib/api";
import { type GetStaticPaths, type GetStaticPropsContext } from "next";
import { ssgHelper } from "~/server/api/ssgHelper";
import { ChallengeImage } from "~/components/challenge/challenge-image/challenge-image";
import { EPageRoute } from "~/types/enums/EPageRoute";
import CloseButton from "~/components/challenge/close-button/CloseButton";
import ChallengeBody from "~/components/challenge/challenge-body/ChallengeBody";
import { useRouter } from "next/router";

interface ChallengePageProps {
  id: string;
}

export function ChallengePage({ id }: ChallengePageProps) {
  const router = useRouter();
  const challenge = api.challenge.findById.useQuery({ id });

  const { mutate: complete } = api.challenge.complete.useMutation();

  const completeChallenge = () => {
    complete(
      { id },
      {
        onSuccess: () => {
          router.push(EPageRoute.PROFILE);
        },
        onError: () => {
          // TODO: add error handling
          alert("Error completing challenge");
        }
      }
    );
  };

  if (challenge.data == null) {
    return null;
  }

  const { imageUrl, zone, endDate, completedAt } = challenge.data;

  return (
    <Layout className="p-0">
      <div className="flex flex-col w-full overflow-auto h-[calc(100vh_-_60px)] md:h-full md:max-w-[640px] md:rounded-2xl">
        <div className="flex flex-[4] relative">
          <CloseButton />
          {imageUrl != null && <ChallengeImage imageUrl={imageUrl} />}
        </div>
        <div className="flex flex-[3]">
          <ChallengeBody
            zoneName={zone.name}
            endDate={endDate}
            completedAt={completedAt}
            onFinish={() => completeChallenge()}
          />
        </div>
      </div>
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
