import SelectInput from "@/components/common/SelectInput";
import { ClimbingLocation, ClimbingZone } from "@/types/database";
import { Card, CardHeader, CardBody, Divider, Heading, Text } from "@chakra-ui/react";
import { Dispatch, FC, ReactNode, SetStateAction, useState } from "react";

type locationId = ClimbingLocation["id"];
type climbingZoneId = ClimbingZone["id"];

interface LocationClimbingZoneSelect {
  defaultLocation: ClimbingLocation;
  locations: ClimbingLocation[];
  climbingZones: ClimbingZone[];
  setLocation: Dispatch<SetStateAction<locationId>>;
  setClimbingZone: Dispatch<SetStateAction<climbingZoneId>>;
  children?: ReactNode;
}

const LocationClimbingZoneSelect: FC<LocationClimbingZoneSelect> = ({
  defaultLocation,
  locations,
  climbingZones,
  setLocation: onLocationSelect,
  setClimbingZone: onClimbingZoneSelect,
  children
}) => {
  const defaultClimbingZones = getClimbingZonesByLocation(defaultLocation.id) ?? [];

  const [location, setLocation] = useState<string>(defaultLocation.id);
  const [locationClimbingZones, setLocationClimbingZones] = useState<ClimbingZone[]>(defaultClimbingZones);

  function getClimbingZonesByLocation(locationId: string) {
    return climbingZones.filter((climbingZone: ClimbingZone) => climbingZone.location === locationId);
  }

  function handleLocationChanged(locationId: string) {
    if (locationId !== location) {
      setLocation(locationId);
      setLocationClimbingZones(getClimbingZonesByLocation(locationId));
      onLocationSelect(locationId);
      onClimbingZoneSelect(null);
    }
  }

  return (
    <Card>
      <CardHeader>
        <Heading size="md">Location and zone</Heading>
      </CardHeader>
      <CardBody pt={0}>
        <SelectInput
          nameColumn="name"
          options={locations}
          isRequired={true}
          defaultValue={defaultLocation.id}
          onSelect={(locationId) => handleLocationChanged(locationId)}
        />
        <Divider my={4} />
        {locationClimbingZones.length ? (
          <SelectInput
            placeholder="Select climbing zone"
            nameColumn="name"
            options={locationClimbingZones}
            onSelect={(climbingZone) => onClimbingZoneSelect(climbingZone)}></SelectInput>
        ) : (
          <Text color="gray.700">No climbing zones were found for this location</Text>
        )}
        {children}
      </CardBody>
    </Card>
  );
};

export default LocationClimbingZoneSelect;
