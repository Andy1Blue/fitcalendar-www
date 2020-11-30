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
