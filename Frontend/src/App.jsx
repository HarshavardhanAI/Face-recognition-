import React from 'react'
import "./index.css"
import Layout from './Layout'
import {Toaster} from "react-hot-toast";
const App = () => {
  return (
    <div className='bg-[#0d1117] h-[100vh] w-[100vw] '>
      <Layout/>
      <Toaster/>
    </div>
  )
}

export default App
