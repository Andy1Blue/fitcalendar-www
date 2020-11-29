export const isToday = (parsedDate: string) => {
  const today = new Date();
  let day: string | number = today.getDate();
  day = day >= 10 ? day : `0${day}`;

  let month: string | number = today.getMonth() + 1;
  month = month >= 10 ? month : `0${month}`;

  let year: number = today.getFullYear();

  return parsedDate === `${year}-${month}-${day}`;
};
