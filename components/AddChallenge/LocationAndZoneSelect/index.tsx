import SelectInput from "@/components/common/SelectInput";
import { ClimbingLocation, ClimbingZone } from "@/types/database";
import { Card, CardHeader, CardBody, Divider, Heading, Text } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";

type Props = {
  defaultLocation: ClimbingLocation;
  locations: ClimbingLocation[];
  climbingZones: ClimbingZone[];
  onLocationSelect: (locationId: string) => void;
  onClimbingZoneSelect: (climbingZoneId: string) => void;
};

const LocationAndZoneSelect: FC<Props> = ({
  defaultLocation,
  locations,
  climbingZones,
  onLocationSelect,
  onClimbingZoneSelect
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
      </CardBody>
    </Card>
  );
};

export default LocationAndZoneSelect;
