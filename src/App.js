// App.js
import React from 'react';
import Weather from './component/Weather';
import { ThemeProvider } from './ThemeContext';
import './App.css';


function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

const AppContent = () => {
  return (
    <div className="App"  >
     

      <Weather /> 
      
    </div>
  );
};

export default App;
