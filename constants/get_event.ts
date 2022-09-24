import * as Calendar from 'expo-calendar';

function getLastWeeksDate() {
  const now = new Date();

  return new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
}

function getNextWeeksDate() {
  const now = new Date();

  return new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7);
}

const get_events = async () => {
  const {status} = await Calendar.requestCalendarPermissionsAsync();
  if (status === 'granted') {
    const calendars = await Calendar.getCalendarsAsync(
      Calendar.EntityTypes.EVENT,
    );

    let ids = [];

    for (let i = 0; i < calendars.length; i++) {
      ids.push(calendars[i].id as string);
    }

    const dates = await Calendar.getEventsAsync(
      ids,
      getLastWeeksDate(),
      getNextWeeksDate(),
    );

    return dates;
  }
  return null;
};

export default get_events;
