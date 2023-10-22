import Layout from "~/components/Layout";
import { requireAuth } from "~/lib/requireAuth";
import { api } from "~/lib/api";
import { GymChallengeSection } from "~/components/profile/gym-challenge-section/GymChallengeSection";

export function ProfilePage() {
  const { data: userChallengesByLocation } = api.challenge.findLocationsWithUserChallenges.useQuery();
  const { data: grades } = api.grade.findAll.useQuery();

  const getLocationsWithChallenges = userChallengesByLocation?.filter((location) => location.challenges.length);

  return (
    <Layout>
      <div className="flex flex-col items-center flex-1 space-y-8">
        {/* Add blank state if no challenges created */}
        {getLocationsWithChallenges?.map((location) => (
          <GymChallengeSection key={location.id} challengesByLocation={location} grades={grades} />
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
