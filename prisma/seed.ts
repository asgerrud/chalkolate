import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
async function main() {
  /*const _grades = await prisma.grade.createMany({
    data: GRADES,
    skipDuplicates: true
  });
  console.log("Added grades", _grades.count);

  const _locations = await prisma.location.createMany({
    data: LOCATIONS,
    skipDuplicates: true
  });
  console.log("Added climbing locations", _locations.count);

  await prisma.zone.deleteMany();
  for (const zone of ZONES) {
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
  console.log("Added climbing zones", ZONES.length);*/
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
