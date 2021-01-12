export const todayDate = () => {
  const today = new Date();
  let day: string | number = today.getDate();
  day = day >= 10 ? day : `0${day}`;

  let month: string | number = today.getMonth() + 1;
  month = month >= 10 ? month : `0${month}`;

  let year: number = today.getFullYear();

  let hours: string | number = today.getHours();
  hours = hours >= 10 ? hours : `0${hours}`;

  let minutes: string | number = today.getMinutes();
  minutes = minutes >= 10 ? minutes : `0${minutes}`;

  let seconds: string | number = today.getSeconds();
  seconds = seconds >= 10 ? seconds : `0${seconds}`;

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export const isToday = (parsedDate: string) => {
  return parsedDate.slice(0, 10) === todayDate().slice(0, 10);
};

export const secondsToHms = (seconds: number) => {
  seconds = Number(seconds);
  const h: number | string = Math.floor(seconds / 3600);
  const m: number | string = Math.floor((seconds % 3600) / 60);
  const s: number | string = Math.floor((seconds % 3600) % 60);

  const hDisplay: number | string = h > 0 ? (h >= 10 ? h : `0${h}`) : '00';
  const mDisplay: number | string = m > 0 ? (m >= 10 ? m : `0${m}`) : '00';
  const sDisplay: number | string = s > 0 ? (s >= 10 ? s : `0${s}`) : '00';
  return `${hDisplay}:${mDisplay}:${sDisplay}`;
};

export const hmsToSeconds = (hms: string): number => {
  let splittedHms = hms.split(':');
  let seconds = +splittedHms[0] * 60 * 60 + +splittedHms[1] * 60 + +splittedHms[2];

  return seconds;
};

export const delayAction = (callback: any) => {
  setTimeout(callback, 1000);
};

export const actualYear = () => new Date().getFullYear();

export const actualMonth = () => {
  let month: string | number = new Date().getMonth() + 1;
  month = month >= 10 ? month : `0${month}`;

  return month;
};
