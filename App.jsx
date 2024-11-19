// App.jsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import  store  from './redux/store';
import Navigation from './Navigation'; // Import the Navigation component

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Navigation /> 
      </NavigationContainer>
    </Provider>
  );
};

export default App;
