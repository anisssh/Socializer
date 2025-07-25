
import { Route, Routes } from 'react-router'
import Home from './pages/Home'
import { Navbar } from './components/Navbar'

function App() {
  

  return (
   <div>
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element= {<Home/>} />
      </Routes>
    </div>
   </div>
  )
}

export default App
