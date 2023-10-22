/* eslint-disable no-console */
import { PrismaClient } from "@prisma/client";
import { GRADES, LOCATION_ZONES, LOCATIONS } from "./data";

const prisma = new PrismaClient();
async function main() {
  await addGrades();
  await addLocations();
  await addLocationZones();
}

async function addGrades() {
  const _grades = await prisma.grade.createMany({
    data: GRADES,
    skipDuplicates: true
  });
  console.log("Added grades", _grades.count);
}

async function addLocations() {
  const _locations = await prisma.location.createMany({
    data: LOCATIONS,
    skipDuplicates: true
  });
  console.log("Added climbing locations", _locations.count);
}

async function addLocationZones() {
  let zonesTotal = 0;
  for (const [locationId, zones] of Object.entries(LOCATION_ZONES)) {
    for (const zone of zones) {
      await prisma.zone.upsert({
        where: {
          name_locationId: {
            name: zone.name,
            locationId: locationId
          }
        },
        update: {},
        create: {
          ...zone,
          location: {
            connect: {
              id: locationId
            }
          }
        }
      });
      zonesTotal++;
    }
  }

  const locationsWithZonesCount = Object.keys(LOCATION_ZONES).length;
  console.log("Added a total of", zonesTotal, "zones to", locationsWithZonesCount, "climbing locations");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
