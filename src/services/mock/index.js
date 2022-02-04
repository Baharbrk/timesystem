export const loginUser = () =>
  Promise.resolve({
    uaername: "Ali",
    userId: "23564182",
    isAdmin: true,
  });

export const bookTime = () =>
  Promise.resolve({
    username: null,
    userID: 1,
    istArbeitsZeit: 4,
    sollArbeitsZeit: 8,
    differenzArbeitsZeit: -4,
    totalDifferenzArbeitsZeit: 0,
    date: "1/18/2022",
  });

export const showTimeEntries = () =>
  Promise.resolve([
    {
      username: null,
      userID: 1,
      istArbeitsZeit: 4,
      sollArbeitsZeit: 8,
      differenzArbeitsZeit: -4,
      totalDifferenzArbeitsZeit: 0,
      date: "1/18/2022",
    },
    {
      username: null,
      userID: 1,
      istArbeitsZeit: 12.066667,
      sollArbeitsZeit: 8,
      differenzArbeitsZeit: 4.0666666,
      totalDifferenzArbeitsZeit: 0,
      date: "1/24/2022",
    },
    {
      username: null,
      userID: 1,
      istArbeitsZeit: 3,
      sollArbeitsZeit: 8,
      differenzArbeitsZeit: -5,
      totalDifferenzArbeitsZeit: 0,
      date: "1/25/2022",
    },
    {
      username: null,
      userID: 1,
      istArbeitsZeit: 2,
      sollArbeitsZeit: 8,
      differenzArbeitsZeit: -6,
      totalDifferenzArbeitsZeit: 0,
      date: "1/26/2022",
    },
  ]);

export const showTimeEntriesCurrent = () =>
  Promise.resolve([
    {
      id: 1,
      username: "bahar",
      firstname: "bahareh",
      lastname: "brk",
      password: "1234",
      targetHours: 8,
      admin: true,
      isActive: true,
    },
    {
      id: 2,
      username: "sina",
      firstname: "sina",
      lastname: "brkk",
      password: "1234",
      targetHours: 7,
      admin: false,
      isActive: false,
    },
  ]);

export const removeInput = () =>
  Promise.resolve({
    id: 14,
    bookIn: {
      ticks: 701400000000,
      days: 0,
      hours: 19,
      milliseconds: 0,
      minutes: 29,
      seconds: 0,
      totalDays: 0.8118055555555556,
      totalHours: 19.483333333333334,
      totalMilliseconds: 70140000,
      totalMinutes: 1169,
      totalSeconds: 70140,
    },
    bookOut: {
      hasValue: true,
      value: {
        ticks: 849000000000,
        days: 0,
        hours: 23,
        milliseconds: 0,
        minutes: 35,
        seconds: 0,
        totalDays: 0.9826388888888888,
        totalHours: 23.583333333333332,
        totalMilliseconds: 84900000,
        totalMinutes: 1415,
        totalSeconds: 84900,
      },
    },
    category: "Pause",
    userId: 1,
    date: "2022-01-29T00:00:00",
  });

export const correctTime = () =>
  Promise.resolve({
    username: null,
    userID: 1,
    istArbeitsZeit: 4,
    sollArbeitsZeit: 8,
    differenzArbeitsZeit: -4,
    totalDifferenzArbeitsZeit: 0,
    date: "1/18/2022",
  });

export const showAllTime = () =>
  Promise.resolve([
    {
      id: 14,
      bookIn: "19:29",
      bookOut: "23:35",
      category: "Arbeitszeit",
      userId: 1,
      date: "2022-01-29T00:00:00",
    },
  ]);

export const getTimeEvaluate = () =>
  Promise.resolve([
    {
      username: null,
      userID: 1,
      istArbeitsZeit: 4,
      sollArbeitsZeit: 8,
      differenzArbeitsZeit: -4,
      totalDifferenzArbeitsZeit: 0,
      date: "1/18/2022",
    },
    {
      username: null,
      userID: 1,
      istArbeitsZeit: 12.066667,
      sollArbeitsZeit: 8,
      differenzArbeitsZeit: 4.0666666,
      totalDifferenzArbeitsZeit: 0,
      date: "1/24/2022",
    },
    {
      username: null,
      userID: 1,
      istArbeitsZeit: 3,
      sollArbeitsZeit: 8,
      differenzArbeitsZeit: -5,
      totalDifferenzArbeitsZeit: 0,
      date: "1/25/2022",
    },
    {
      username: null,
      userID: 1,
      istArbeitsZeit: 2,
      sollArbeitsZeit: 8,
      differenzArbeitsZeit: -6,
      totalDifferenzArbeitsZeit: 0,
      date: "1/26/2022",
    },
  ]);

export const showTotalTime = () =>
  Promise.resolve({
    username: null,
    userID: 0,
    istArbeitsZeit: 21.066666,
    sollArbeitsZeit: 4,
    differenzArbeitsZeit: 17.066666,
    totalDifferenzArbeitsZeit: -10.933334,
    date: null,
  });

export const getOneDayEntry = () =>
  Promise.resolve([
    {
      id: 14,
      bookIn: "19:29",
      bookOut: "23:35",
      category: "Arbeitszeit",
      userId: 1,
      date: "2022-01-29T00:00:00",
    },
  ]);

export const showUsers = () =>
  Promise.resolve([
    {
      id: 1,
      username: "bahar",
      firstname: "bahareh",
      lastname: "brk",
      password: "1234",
      targetHours: 8,
      admin: true,
      isActive: true,
    },
    {
      id: 2,
      username: "sina",
      firstname: "sina",
      lastname: "brkk",
      password: "1234",
      targetHours: 7,
      admin: false,
      isActive: false,
    },
  ]);

export const addUsers = () =>
  Promise.resolve({
    id: 1,
    username: "bahar",
    firstname: "bahareh",
    lastname: "brk",
    password: "1234",
    targetHours: 8,
    admin: true,
    isActive: true,
  });

export const changeUsers = () =>
  Promise.resolve({
    id: 1,
    username: "bahar",
    firstname: "bahareh",
    lastname: "brk",
    password: "1234",
    targetHours: 8,
    admin: true,
    isActive: true,
  });

export const searchUsers = () =>
  Promise.resolve({
    id: 10,
    username: "bahar",
    firstname: "bahareh",
    lastname: "brk",
    password: "1234",
    targetHours: 8,
    admin: true,
    isActive: true,
  });
