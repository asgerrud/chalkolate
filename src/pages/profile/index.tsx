import Layout from "~/components/Layout";
import { requireAuth } from "~/lib/requireAuth";
import { api } from "~/lib/api";
import { GymChallengesSection } from "~/components/profile/gym-challenge-section/GymChallengesSection";
import { useState } from "react";
import { type Location } from ".prisma/client";

export function ProfilePage() {
  const [locations, setLocations] = useState<Location[]>([]);

  const { data: locationsData, isLoading } = api.location.findAllWithUserActivity.useQuery(undefined, {
    onSuccess: (locations: Location[]) => {
      setLocations(locations);
    }
  });

  // TODO: move to location
  const { data: grades } = api.grade.findAll.useQuery();

  if (!locationsData || isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Layout>
      <div className="flex flex-col items-center flex-1 space-y-8">
        {/* TODO: add blank state if no challenges created */}
        {locations.length > 0 &&
          locations?.map((location) => (
            <GymChallengesSection
              key={location.id}
              locationId={location.id}
              locationName={location.name}
              grades={grades}
            />
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
