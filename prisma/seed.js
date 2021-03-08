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
  const admins = [
    { name: 'Eric L', email: 'ericli+admin@uwblueprint.org' },
    { name: 'Julia', email: 'juliasim+admin@uwblueprint.org' },
    { name: 'Mayank', email: 'mayankkanoria+admin@uwblueprint.org' },
    { name: 'Oustan', email: 'oustanding+admin@uwblueprint.org' },
    { name: 'Eric F', email: 'ericfeng+admin@uwblueprint.org' },
    { name: 'Anish', email: 'anishagnihotri+admin@uwblueprint.org' },
    { name: 'Chidi', email: 'chidi+admin@uwblueprint.org' },
  ];
  const users = [
    { name: 'Eric L', email: 'ericli@uwblueprint.org' },
    { name: 'Julia', email: 'juliasim@uwblueprint.org' },
    { name: 'Mayank', email: 'mayankkanoria@uwblueprint.org' },
    { name: 'Oustan', email: 'oustanding@uwblueprint.org' },
    { name: 'Eric F', email: 'ericfeng@uwblueprint.org' },
    { name: 'Anish', email: 'anishagnihotri@uwblueprint.org' },
    { name: 'Chidi', email: 'chidi@uwblueprint.org' },
  ];

  for (let admin of admins) {
    const adminUpsert = await prisma.user.upsert({
      where: { email: admin['email'] },
      update: {
        role: 'ADMIN',
        name: admin['name'],
      },
      create: {
        role: 'ADMIN',
        email: admin['email'],
        name: admin['name'],
      },
    });
    console.log({ adminUpsert });
  }

  for (let user of users) {
    const userUpsert = await prisma.user.upsert({
      where: { email: user['email'] },
      update: {
        role: 'ADMIN',
        name: user['name'],
      },
      create: {
        role: 'ADMIN',
        email: user['email'],
        name: user['name'],
      },
    });
    console.log({ userUpsert });
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
