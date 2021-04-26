const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  if (process.env.SEED === 'production') {
    await prodSeed();
  } else {
    await devSeed();
  }
}

async function prodSeed() {
  const admins = [{ name: 'Eric L', email: 'ericli+admin@uwblueprint.org' }];

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
  const levelSettings = ['Novice', 'Intermediate', 'Advanced'];
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
}

async function devSeed() {
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
    { name: 'Chidi', email: 'chidi+judge@uwblueprint.org' },
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

  // SETTINGS SEEDING
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
  const levelSettings = ['Novice', 'Intermediate', 'Advanced'];
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
        school_name: school.school_name,
        email: school.email,
      },
    });
    schoolUpserts.push(schoolUpsert);
    console.log(schoolUpsert);
  }

  // PERFORMANCE SEEDING
  // const performances = [
  //   {
  //     id: 1,
  //     dance_title: 'Performance 1',
  //     performers: ['Performer 1', 'Performer 2'],
  //     cheoreographers: ['Choreo 1'],
  //     event_id: eventUpsert.id,
  //     school_id: schoolUpserts[0].id,
  //   },
  //   {
  //     id: 2,
  //     dance_title: 'Performance 2',
  //     performers: ['Performer 3'],
  //     cheoreographers: ['Choreo 2', 'Choreo 3'],
  //     event_id: eventUpsert.id,
  //     school_id: schoolUpserts[0].id,
  //   },
  //   {
  //     id: 3,
  //     dance_title: 'Performance 3',
  //     performers: ['Performer 4', 'Performer 5', 'Performer 6'],
  //     cheoreographers: ['Choreo 4', 'Choreo 5'],
  //     event_id: eventUpsert.id,
  //     school_id: schoolUpserts[0].id,
  //   },
  // ];

  // const performanceUpserts = [];
  // for (const performance of performances) {
  //   const performanceUpsert = await prisma.performance.upsert({
  //     where: {
  //       id: performance.id,
  //     },
  //     update: {
  //       dance_title: performance.dance_title,
  //       performers: performance.performers,
  //       choreographers: performance.cheoreographers,
  //       event_id: performance.event_id,
  //       school_id: performance.school_id,
  //     },
  //     create: {
  //       dance_title: performance.dance_title,
  //       performers: performance.performers,
  //       choreographers: performance.cheoreographers,
  //       event_id: performance.event_id,
  //       school_id: performance.school_id,
  //     },
  //   });
  //   performanceUpserts.push(performanceUpsert);
  //   console.log(performanceUpsert);
  // }

  // ADJUDICATION SEEDING
  // const ajudications = [
  //   {
  //     id: 1,
  //     artistic_mark: 100,
  //     technical_mark: 100,
  //     cumulative_mark: 100,
  //     performance_id: performanceUpserts[0].id,
  //     user_id: judgeUpserts[0].id,
  //   },
  //   {
  //     id: 2,
  //     artistic_mark: 100,
  //     technical_mark: 80,
  //     cumulative_mark: 90,
  //     performance_id: performanceUpserts[0].id,
  //     user_id: judgeUpserts[1].id,
  //   },
  //   {
  //     id: 3,
  //     artistic_mark: 50,
  //     technical_mark: 50,
  //     cumulative_mark: 50,
  //     performance_id: performanceUpserts[0].id,
  //     user_id: judgeUpserts[2].id,
  //   },
  //   {
  //     id: 4,
  //     artistic_mark: 100,
  //     technical_mark: 95,
  //     cumulative_mark: 100,
  //     performance_id: performanceUpserts[1].id,
  //     user_id: judgeUpserts[0].id,
  //   },
  //   {
  //     id: 5,
  //     artistic_mark: 98,
  //     technical_mark: 88,
  //     cumulative_mark: 90,
  //     performance_id: performanceUpserts[1].id,
  //     user_id: judgeUpserts[1].id,
  //   },
  //   {
  //     id: 6,
  //     artistic_mark: 50,
  //     technical_mark: 60,
  //     cumulative_mark: 55,
  //     performance_id: performanceUpserts[1].id,
  //     user_id: judgeUpserts[2].id,
  //   },
  // ];

  // const adjudicationUpserts = [];
  // for (const adjudication of ajudications) {
  //   const adjudicationUpsert = await prisma.adjudication.upsert({
  //     where: {
  //       id: adjudication.id,
  //     },
  //     update: {
  //       artistic_mark: adjudication.artistic_mark,
  //       technical_mark: adjudication.technical_mark,
  //       cumulative_mark: adjudication.cumulative_mark,
  //     },
  //     create: {
  //       artistic_mark: adjudication.artistic_mark,
  //       technical_mark: adjudication.technical_mark,
  //       cumulative_mark: adjudication.cumulative_mark,
  //       performance_id: adjudication.performance_id,
  //       user_id: adjudication.user_id,
  //     },
  //   });
  //   adjudicationUpserts.push(adjudicationUpsert);
  //   console.log(adjudicationUpsert);
  // }

  // AWARDS SEEDING
  // const awards = [
  //   {
  //     id: 1,
  //     title: 'Award 1',
  //     type: 'SPECIAL',
  //   },
  //   {
  //     id: 2,
  //     title: 'Award 2',
  //     type: 'SPECIAL',
  //   },
  //   {
  //     id: 3,
  //     title: 'Award 3',
  //     type: 'SCORE_BASED',
  //   },
  //   {
  //     id: 4,
  //     title: 'Award 4',
  //     type: 'DANCE_ARTISTRY',
  //   },
  // ];

  // const awardUpserts = [];
  // for (const award of awards) {
  //   const awardUpsert = await prisma.award.upsert({
  //     where: {
  //       id: award.id,
  //     },
  //     update: {
  //       title: award.title,
  //       event_id: eventUpsert.id,
  //       type: award.type,
  //     },
  //     create: {
  //       title: award.title,
  //       event_id: eventUpsert.id,
  //       type: award.type,
  //     },
  //   });
  //   awardUpserts.push(awardUpsert);
  //   console.log(awardUpsert);

  //   if (award.type === 'DANCE_ARTISTRY' || award.type === 'SCORE_BASED') {
  //     const awardCategoryUpsert = await prisma.awardCategory.upsert({
  //       where: {
  //         awards_categories_unique: {
  //           award_id: award.id,
  //           category_id: styleSettingUpserts[0].id,
  //         },
  //       },
  //       update: {
  //         award_id: award.id,
  //         category_id: styleSettingUpserts[0].id,
  //       },
  //       create: {
  //         award_id: award.id,
  //         category_id: styleSettingUpserts[0].id,
  //       },
  //     });
  //     console.log(awardCategoryUpsert);
  //   }
  // }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
