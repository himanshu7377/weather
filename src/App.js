// App.js
import React from 'react';
import Weather from './component/Weather';
import { ThemeProvider } from './ThemeContext';
import './App.css';
import city from './asset/city.jpg';

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

const AppContent = () => {
  return (
    <div className=" bg-slate-500 w-full h-full"  >
     

      <Weather /> 
      
    </div>
  );
};

export default App;
