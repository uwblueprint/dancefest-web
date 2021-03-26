const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // TODO: perform data seeding dependent on environment
  await dataSeed();
}

async function dataSeed() {
  // USER SEEDING
  const admins = [
    { name: 'Eric L', email: 'ericli+admin@uwblueprint.org' },
    { name: 'Julia', email: 'juliasim+admin@uwblueprint.org' },
    { name: 'Mayank', email: 'mayankkanoria+admin@uwblueprint.org' },
    { name: 'Oustan', email: 'oustanding+admin@uwblueprint.org' },
    { name: 'Eric F', email: 'ericfeng+admin@uwblueprint.org' },
    { name: 'Anish', email: 'anishagnihotri+admin@uwblueprint.org' },
    { name: 'Chidi', email: 'chidi+admin@uwblueprint.org' },
  ];
  const judges = [
    { name: 'Eric L', email: 'ericli+judge@uwblueprint.org' },
    { name: 'Julia', email: 'juliasim+judge@uwblueprint.org' },
    { name: 'Mayank', email: 'mayankkanoria+judge@uwblueprint.org' },
    { name: 'Oustan', email: 'oustanding+judge@uwblueprint.org' },
    { name: 'Eric F', email: 'ericfeng+judge@uwblueprint.org' },
    { name: 'Anish', email: 'anishagnihotri+judge@uwblueprint.org' },
    { name: 'Chidi', email: 'chidijudgen@uwblueprint.org' },
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

  const adminUpserts = [];
  for (const admin of admins) {
    const adminUpsert = await prisma.user.upsert({
      where: { email: admin.email },
      update: {
        role: 'ADMIN',
        name: admin.name,
      },
      create: {
        role: 'ADMIN',
        email: admin.email,
        name: admin.name,
      },
    });
    adminUpserts.push(adminUpsert);
    console.log({ adminUpsert });
  }

  const judgeUpserts = [];
  for (const judge of judges) {
    const judgeUpsert = await prisma.user.upsert({
      where: { email: judge.email },
      update: {
        role: 'JUDGE',
        name: judge.name,
      },
      create: {
        role: 'JUDGE',
        email: judge.email,
        name: judge.name,
      },
    });
    judgeUpserts.push(judgeUpsert);
    console.log({ judgeUpsert });
  }

  const userUpserts = [];
  for (const user of users) {
    const userUpsert = await prisma.user.upsert({
      where: { email: user.email },
      update: {
        role: 'USER',
        name: user.name,
      },
      create: {
        role: 'USER',
        email: user.email,
        name: user.name,
      },
    });
    userUpserts.push(userUpsert);
    console.log({ userUpsert });
  }

  // SETTING SEEDING
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
  for (const size of sizeSettings) {
    const setting = await prisma.setting.upsert({
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
    console.log(setting);
  }

  const styleSettingUpserts = [];
  for (const style of styleSettings) {
    const setting = await prisma.setting.upsert({
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
    console.log(setting);
    styleSettingUpserts.push(setting);
  }

  for (const level of levelSettings) {
    const setting = await prisma.setting.upsert({
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
    console.log(setting);
  }

  const event = { id: 1, name: 'W21 Test Event' };

  // EVENT SEEDING
  const eventUpsert = await prisma.event.upsert({
    where: {
      id: event.id,
    },
    update: {
      name: event.name,
    },
    create: {
      id: event.id,
      name: event.name,
    },
  });

  console.log(eventUpsert);

  // SCHOOL SEEDING
  const schools = [
    { id: 1, school_name: 'BCI', email: 'BCI@email.com' },
    { id: 2, school_name: 'CAS', email: 'CAS@email.com' },
    { id: 3, school_name: 'CCC', email: 'CCC@email.com' },
    { id: 4, school_name: 'CCCE', email: 'CCCE@email.com' },
    { id: 5, school_name: 'CCH', email: 'CCH@email.com' },
    { id: 6, school_name: 'CHC', email: 'CHC@email.com' },
  ];

  const schoolUpserts = [];
  for (const school of schools) {
    const schoolUpsert = await prisma.school.upsert({
      where: { id: school.id },
      update: {
        school_name: school.school_name,
      },
      create: {
        id: school.id,
        school_name: school.school_name,
        email: school.email,
      },
    });
    schoolUpserts.push(schoolUpsert);
    console.log(schoolUpsert);
  }

  // PERFORMANCE SEEDING
  const performances = [
    {
      id: 1,
      name: 'Performance 1',
      performers: ['Performer 1', 'Performer 2'],
      cheoreographers: ['Choreo 1'],
      event_id: eventUpsert.id,
      school_id: schoolUpserts[0].id,
    },
    {
      id: 2,
      name: 'Performance 2',
      performers: ['Performer 3'],
      cheoreographers: ['Choreo 2', 'Choreo 3'],
      event_id: eventUpsert.id,
      school_id: schoolUpserts[0].id,
    },
    {
      id: 3,
      name: 'Performance 3',
      performers: ['Performer 4', 'Performer 5', 'Performer 6'],
      cheoreographers: ['Choreo 4', 'Choreo 5'],
      event_id: eventUpsert.id,
      school_id: schoolUpserts[0].id,
    },
  ];

  const performanceUpserts = [];
  for (const performance of performances) {
    const performanceUpsert = await prisma.performance.upsert({
      where: {
        id: performance.id,
      },
      update: {
        name: performance.name,
        performers: performance.performers,
        choreographers: performance.cheoreographers,
        event_id: performance.event_id,
        school_id: performance.school_id,
      },
      create: {
        id: performance.id,
        name: performance.name,
        performers: performance.performers,
        choreographers: performance.cheoreographers,
        event_id: performance.event_id,
        school_id: performance.school_id,
      },
    });
    performanceUpserts.push(performanceUpsert);
    console.log(performanceUpsert);
  }

  // ADJUDICATION SEEDING
  const ajudications = [
    {
      id: 1,
      artistic_mark: 100,
      technical_mark: 100,
      cumulative_mark: 100,
      performance_id: performanceUpserts[0].id,
      user_id: userUpserts[0].id,
    },
    {
      id: 2,
      artistic_mark: 100,
      technical_mark: 80,
      cumulative_mark: 90,
      performance_id: performanceUpserts[0].id,
      user_id: userUpserts[1].id,
    },
    {
      id: 3,
      artistic_mark: 50,
      technical_mark: 50,
      cumulative_mark: 50,
      performance_id: performanceUpserts[0].id,
      user_id: userUpserts[2].id,
    },
  ];

  const adjudicationUpserts = [];
  for (const adjudication of ajudications) {
    const adjudicationUpsert = await prisma.adjudication.upsert({
      where: {
        id: adjudication.id,
      },
      update: {
        artistic_mark: adjudication.artistic_mark,
        technical_mark: adjudication.technical_mark,
        cumulative_mark: adjudication.cumulative_mark,
      },
      create: {
        id: adjudication.id,
        artistic_mark: adjudication.artistic_mark,
        technical_mark: adjudication.technical_mark,
        cumulative_mark: adjudication.cumulative_mark,
        performance_id: adjudication.performance_id,
        user_id: adjudication.user_id,
      },
    });
    adjudicationUpserts.push(adjudicationUpsert);
    console.log(adjudicationUpsert);
  }

  const awards = [
    {
      id: 1,
      title: 'Award 1',
      is_category: false,
    },
    {
      id: 2,
      title: 'Award 2',
      is_category: false,
    },
    {
      id: 3,
      title: 'Award 3',
      is_category: true,
    },
    {
      id: 4,
      title: 'Award 4',
      is_category: true,
    },
  ];

  const awardUpserts = [];
  for (const award of awards) {
    const awardUpsert = await prisma.award.upsert({
      where: {
        id: award.id,
      },
      update: {
        title: award.title,
        is_category: award.is_category,
      },
      create: {
        id: award.id,
        title: award.title,
        is_category: award.is_category,
      },
    });
    awardUpserts.push(awardUpsert);
    console.log(awardUpsert);

    if (award['is_category']) {
      const awardCategoryUpsert = await prisma.awardCategory.upsert({
        where: {
          awards_categories_unique: {
            award_id: award.id,
            category_id: styleSettingUpserts[0].id,
          },
        },
        update: {
          award_id: award.id,
          category_id: styleSettingUpserts[0].id,
        },
        create: {
          award_id: award.id,
          category_id: styleSettingUpserts[0].id,
        },
      });
      console.log(awardCategoryUpsert);
    }
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
