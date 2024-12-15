import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Header, TitleBar, Navbar} from './components';
function App() {

  return (
    <div style={{
      background: 'linear-gradient(42deg, rgba(249,238,238,1) 1%, rgba(240,235,233,1) 100%, rgba(242,150,150,1) 100%, rgba(196,192,189,1) 100%, rgba(35,57,66,1) 100%)',
    }}>
      <Header heading="Optimize Your Meal" subHeading="Select Meal to Add in Week. You will be able to edit. modify and change the Meal Weeks."/>
      <TitleBar heading="Week Orders"/>
      <Navbar/>
    </div>
  )
}

export default App
