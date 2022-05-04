import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import './App.css';
import BirthdayModule from './modules/birthday';
import { dataActions } from './slices/data';
import store from './store';

function App() {
  useEffect(() => {
    const dataString = localStorage.getItem('data');
    if (dataString) {
      const data = JSON.parse(dataString);
      store.dispatch(
        dataActions.updateState({
          data,
        })
      );
    }
  }, []);

  return (
    <Provider store={store}>
      <BirthdayModule />
    </Provider>
  );
}

export default App;
