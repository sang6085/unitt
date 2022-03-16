import { FAKE_SCHEDULE_DATA } from "./fake-data";

export const getSchedule = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(FAKE_SCHEDULE_DATA);
    }, 250);
  });
};

export const getScheduleById = (id: number) => {
  return new Promise((resolve) => {
    setTimeout(async () => {
      const filterData = await FAKE_SCHEDULE_DATA.filter((item) => item.id === id);
      resolve(filterData[0]);
    }, 250);
  });
};

export const updateScheduleById = (requestBody: { id: number; name: string; description?: string; cycle: string }) => {
  // console.log(requestBody);

  return new Promise((resolve) => {
    setTimeout(async () => {
      resolve({ success: true });
    }, 250);
  });
};
