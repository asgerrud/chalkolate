import { PrismaClient } from "@prisma/client";
import { grades, locations, zones } from "./data";

const prisma = new PrismaClient();
async function main() {
  const _grades = await prisma.grade.createMany({
    data: grades,
    skipDuplicates: true
  });
  console.log("Added grades", _grades.count);

  const _locations = await prisma.location.createMany({
    data: locations,
    skipDuplicates: true
  });
  console.log("Added climbing locations", _locations.count);

  await prisma.zone.deleteMany();
  for (const zone of zones) {
    await prisma.zone.create({
      data: {
        ...zone,
        location: {
          connect: {
            id: "boulders_sydhavn"
          }
        }
      }
    });
  }
  console.log("Added climbing zones", zones.length);
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
