import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { dataActions, DataState } from '../slices/data';
import { FriendData } from '../types';
import { calculateDaysToBirthday } from '../utils';

export const useData = () => {
  const state: DataState = useSelector((state: any) => state.data);
  const dispatch = useDispatch();
  const data = state.data;

  const addData = (newData: FriendData) => {
    const newDataList = [...data, newData];
    dispatch(dataActions.updateState({ data: newDataList }));
  };

  const removeData = (id: string) => {
    const newData = data.filter((item) => item.id !== id);
    dispatch(dataActions.updateState({ data: newData }));
  };

  const updateData = (id: string, newData: FriendData) => {
    const newDataList = data.map((item) =>
      item.id === id ? { ...item, ...newData } : item
    );
    dispatch(dataActions.updateState({ data: newDataList }));
  };

  const todayBirthdayData = useMemo(() => {
    const today = moment().format('MMM DD');
    return data.filter((item) => {
      return moment(item.birthDate).format('MMM DD') === today;
    });
  }, [data]);

  const upcomingBirthdayData = useMemo(() => {
    const today = moment().format('MMM DD');
    return data
      .filter((item) => {
        return moment(item.birthDate).format('MMM DD') !== today;
      })
      .sort((a, b) => {
        return (
          calculateDaysToBirthday(a.birthDate) -
          calculateDaysToBirthday(b.birthDate)
        );
      });
  }, [data]);

  return {
    data,
    todayBirthdayData,
    upcomingBirthdayData,
    addData,
    removeData,
    updateData,
  };
};
