export interface TimingsStatus {
  isOpen: boolean;
  statusMessage: string;
  countdownText: string;
  nextEventTime: string;
}

export function getStoreStatus(testDate?: Date): TimingsStatus {
  const now = testDate || new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const currentTimeInMinutes = hours * 60 + minutes;

  // Morya Sports Badlapur Hours: 9:00 AM – 9:00 PM daily
  const openTime = 9 * 60;   // 9:00 AM
  const closeTime = 21 * 60; // 9:00 PM

  let isOpen = false;
  let statusMessage = '';
  let countdownText = '';
  let nextEventTime = '';

  if (currentTimeInMinutes >= openTime && currentTimeInMinutes < closeTime) {
    isOpen = true;
    const formatTime = (minutesTotal: number) => {
      const h = Math.floor(minutesTotal / 60);
      const m = minutesTotal % 60;
      const period = h >= 12 ? 'PM' : 'AM';
      const formattedH = h % 12 === 0 ? 12 : h % 12;
      const formattedM = m === 0 ? '' : `:${m.toString().padStart(2, '0')}`;
      return `${formattedH}${formattedM} ${period}`;
    };

    statusMessage = `Open Now until ${formatTime(closeTime)}`;
    const remainingMinutes = closeTime - currentTimeInMinutes;
    const remHours = Math.floor(remainingMinutes / 60);
    const remMins = remainingMinutes % 60;

    if (remHours > 0) {
      countdownText = `Closes in ${remHours} hr${remHours > 1 ? 's' : ''} ${remMins > 0 ? `${remMins} min${remMins > 1 ? 's' : ''}` : ''}`;
    } else {
      countdownText = `Closes in ${remMins} min${remMins > 1 ? 's' : ''}`;
    }
    nextEventTime = formatTime(closeTime);
  } else {
    isOpen = false;
    statusMessage = 'Closed Now';

    let minutesUntilOpen = 0;
    if (currentTimeInMinutes < openTime) {
      minutesUntilOpen = openTime - currentTimeInMinutes;
    } else {
      minutesUntilOpen = (24 * 60 - currentTimeInMinutes) + openTime;
    }

    const remHours = Math.floor(minutesUntilOpen / 60);
    const remMins = minutesUntilOpen % 60;

    if (remHours > 24) {
      countdownText = 'Opens tomorrow at 9:00 AM';
    } else if (remHours > 0) {
      countdownText = `Opens in ${remHours} hr${remHours > 1 ? 's' : ''} ${remMins > 0 ? `${remMins} min${remMins > 1 ? 's' : ''}` : ''}`;
    } else {
      countdownText = `Opens in ${remMins} min${remMins > 1 ? 's' : ''}`;
    }
    nextEventTime = '9:00 AM';
  }

  return { isOpen, statusMessage, countdownText, nextEventTime };
}

export const BUSINESS_HOURS_LIST = [
  { day: 'Monday', hours: '9:00 AM – 9:00 PM' },
  { day: 'Tuesday', hours: '9:00 AM – 9:00 PM' },
  { day: 'Wednesday', hours: '9:00 AM – 9:00 PM' },
  { day: 'Thursday', hours: '9:00 AM – 9:00 PM' },
  { day: 'Friday', hours: '9:00 AM – 9:00 PM' },
  { day: 'Saturday', hours: '9:00 AM – 9:00 PM' },
  { day: 'Sunday', hours: '9:00 AM – 9:00 PM' },
];
