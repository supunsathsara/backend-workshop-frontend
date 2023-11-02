import './App.css';

import { useState, useEffect } from 'react';
import './App.css';
import Form from './components/Form';
import Auth from './components/Auth';


function App() {
 
  return (
    <div className='min-h-screen bg-slate-900 font-bold'>
      <h1>Notes</h1>
      {/* <Form /> */}
      <Auth />
    </div>
  );
}

export default App;
