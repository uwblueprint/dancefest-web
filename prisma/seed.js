const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // TODO: perform data seeding dependent on environment
  await userSeed();
  await dataSeed();
}

async function dataSeed() {
  // TODO: seed some sample data
  const sizeSettings = ['Small Group', 'Medium Group', 'Large Group', 'Creative Collaboration'];
  const styleSettings = [
    'Jazz',
    'Lyrical',
    'Ballet',
    'Open/Fusion',
    'Modern/Contemporary',
    'Hip Hop',
    'Tap',
    'Cultural',
    'Musical Theatre',
    'Live Vocals',
  ];
  const levelSettings = ['Easy', 'Intermediate', 'Advanced'];
  // TODO: add some logging for batch upserts
  for (let size of sizeSettings) {
    await prisma.setting.upsert({
      where: {
        settings_unique: {
          type: 'DANCE_SIZE',
          value: size,
        },
      },
      update: {},
      create: {
        type: 'DANCE_SIZE',
        value: size,
      },
    });
  }

  for (let style of styleSettings) {
    await prisma.setting.upsert({
      where: {
        settings_unique: {
          type: 'STYLE',
          value: style,
        },
      },
      update: {},
      create: {
        type: 'STYLE',
        value: style,
      },
    });
  }

  for (let level of levelSettings) {
    await prisma.setting.upsert({
      where: {
        settings_unique: {
          type: 'COMPETITION_LEVEL',
          value: level,
        },
      },
      update: {},
      create: {
        type: 'COMPETITION_LEVEL',
        value: level,
      },
    });
  }
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
