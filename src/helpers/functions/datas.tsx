export const createDate = (date: string, hour: string): Date => {
  let consDate = new Date();
  consDate.setHours(Number(hour?.slice(0, 2)), Number(hour?.slice(3, 5)), 0);
  consDate.setDate(Number(date.slice(8, 10)));
  consDate.setMonth(Number(date.slice(5, 7)) - 1);
  consDate.setFullYear(Number(date.slice(0, 4)));
  return consDate;
};

// export const createDate = (date: string, hour: string): Date => {
//   let consDate = new Date();
//   consDate.setHours(Number(hour?.slice(0, 2)), Number(hour?.slice(3, 5)), 0);
//   consDate.setDate(Number(date.slice(8, 10)));
//   consDate.setMonth(Number(date.slice(5, 7)) - 1);
//   consDate.setFullYear(Number(date.slice(0, 4)));
//   return consDate;
// };

export const dateTransform = (date: string, mode?: 'short'): string => {
  let dateArray = date.split('-');
  let dateChanged = `${dateArray[2]}/${dateArray[1]}/${
    mode && mode === 'short' ? dateArray[0].substring(2, 4) : dateArray[0]
  }`;

  return dateChanged;
};
type DateType = 'dd-mm-yyyy' | 'dd-mm-yy' | 'yyyy-mm-dd' | 'yy-mm-dd' | null;
type Separator = '-' | '/' | 'none';
export const dateString = (
  date: Date,
  mode: DateType = 'dd-mm-yyyy',
  separator: Separator = '/',
): string => {
  let year = `${String(date.getFullYear())}`;
  let yearInit = '';
  const index = mode === 'dd-mm-yyyy' || mode === 'yyyy-mm-dd' ? 4 : 2;

  if (year.length < index) {
    for (let i = 0; i < index - year.length; i++) {
      yearInit += '0';
    }
  }
  year = yearInit + year;
  let month = `${date.getMonth() + 1 <= 9 ? '0' : ''}${String(
    date.getMonth() + 1,
  )}`;
  let day = `${date.getDate() <= 9 ? '0' : ''}${String(date.getDate())}`;
  let sep = separator === 'none' ? '' : separator;
  let dateTransf = '';
  if (mode.slice(0, 2) === 'dd') {
    dateTransf = day + sep + month + sep + year;
  } else {
    dateTransf = year + sep + month + sep + day;
  }

  // yearInit +
  // `${String(date.getFullYear())}-${
  //   date.getMonth() + 1 <= 9 ? '0' : ''
  // }${String(date.getMonth() + 1)}-${date.getDate() <= 9 ? '0' : ''}${String(
  //   date.getDate(),
  // )}`;

  console.log('Date Transform: ', dateTransf);
  return dateTransf;
};
