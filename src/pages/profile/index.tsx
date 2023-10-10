import Layout from "~/components/Layout";
import { requireAuth } from "~/lib/requireAuth";
import { api } from "~/lib/api";
import { GymChallengeCard } from "~/components/profile/gym-challenges-card/GymChallengeCard";

export function ProfilePage() {
  const { data: locations } = api.challenge.findUserChallengesByLocation.useQuery();
  const { data: grades } = api.grade.findAll.useQuery();

  const getLocationsWithChallenges = locations?.filter((location) => location.challenges.length);

  return (
    <Layout>
      <div className="flex flex-1 flex-col space-y-8 items-center">
        {getLocationsWithChallenges?.map((location) => (
          <GymChallengeCard key={location.id} location={location} grades={grades} />
        ))}
      </div>
    </Layout>
  );
}

export const getServerSideProps = requireAuth(() => {
  return {
    props: {}
  };
});

export default ProfilePage;
