import moment from 'moment';
import { FriendData } from '../types';

export const getRandomId = () => {
  return Math.random().toString(36).substring(2, 15);
};

export const getMonthList = () => {
  return [
    {
      value: 0,
      label: 'January',
    },
    {
      value: 1,
      label: 'February',
    },
    {
      value: 2,
      label: 'March',
    },
    {
      value: 3,
      label: 'April',
    },
    {
      value: 4,
      label: 'May',
    },
    {
      value: 5,
      label: 'June',
    },
    {
      value: 6,
      label: 'July',
    },
    {
      value: 7,
      label: 'August',
    },
    {
      value: 8,
      label: 'September',
    },
    {
      value: 9,
      label: 'October',
    },
    {
      value: 10,
      label: 'November',
    },
    {
      value: 11,
      label: 'December',
    },
  ];
};

export const getDaysListByMonth = () => {
  const days = [];
  for (let i = 1; i <= 31; i++) {
    days.push({
      value: i,
      label: i,
    });
  }
  return days;
};

export const calculateDaysToBirthday = (birthday: string) => {
  const today = moment();
  const birthdayDate = moment(birthday).year(today.year());
  const daysToBirthday = birthdayDate.diff(today, 'days');
  return daysToBirthday < 0 ? daysToBirthday + 365 : daysToBirthday;
};

export const checkTodayBirthday = (data: FriendData[]) => {
  const today = moment();
  const dataList = data.filter((item) => {
    const birthday = moment(item.birthDate);
    return (
      birthday.month() === today.month() && birthday.date() === today.date()
    );
  });
  return {
    isTodayBirthday: !!dataList.length,
    names: dataList.map((item) => item.name),
  };
};

export const calculateAge = (birthday: string) => {
  const birthdayDate = moment(birthday);
  const today = moment();
  const age = today.diff(birthdayDate, 'years');
  return age;
};
