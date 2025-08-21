import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home/Home'

function App() {

  return (
    <>
      <Routes>
        <Route index element={<Home />} />
      </Routes>
    </>
  )
}

export default App
