const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // TODO: perform data seeding dependent on environment
  await userSeed();
  await dataSeed();
}

async function dataSeed() {
  // TODO: seed some sample data
}

async function userSeed() {
  const eric = await prisma.user.upsert({
    where: { email: 'ericli@uwblueprint.org' },
    update: {
      role: 'ADMIN',
      name: 'Eric',
    },
    create: {
      role: 'ADMIN',
      email: `ericli@uwblueprint.org`,
      name: 'Eric',
    },
  });
  const julia = await prisma.user.upsert({
    where: { email: 'juliasim@uwblueprint.org' },
    update: {
      role: 'ADMIN',
      name: 'Julia',
    },
    create: {
      role: 'ADMIN',
      email: `juliasim@uwblueprint.org`,
      name: 'Julia',
    },
  });
  const dancefest = await prisma.user.upsert({
    where: { email: 'dancefest@uwblueprint.org' },
    update: {
      role: 'ADMIN',
      name: 'Dancefest',
    },
    create: {
      role: 'ADMIN',
      email: `dancefest@uwblueprint.org`,
      name: 'Dancefest',
    },
  });
  console.log({ eric, julia, dancefest });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
