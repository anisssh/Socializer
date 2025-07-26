
import { Route, Routes } from 'react-router'
import Home from './pages/Home'
import { Navbar } from './components/Navbar'
import { CreatePostPage } from './pages/CreatePostPage'

function App() {
  

  return (
   <div>
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element= {<Home/>} />
        <Route path='/create' element= {<CreatePostPage/>} />
      </Routes>
    </div>
   </div>
  )
}

export default App
