import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Student from './pages/Student'
import Teacher from './pages/Teacher'
import SignUpForm from './pages/signUp/SignUpForm'
import { ROUTE_HOME, ROUTE_SIGNUP, ROUTE_STUDENT, ROUTE_TEACHER } from './routes/constants'
import { ToastContainer} from 'react-toastify';
function App() {
 

  return (
   <div className=''>
    <Router>
     <Navbar/>
     <Routes>
      <Route path={ROUTE_HOME} element={<Home/>}/>
      <Route path={ROUTE_STUDENT} element={<Student/>}/>
      <Route path={ROUTE_TEACHER} element={<Teacher/>}/>
      <Route path={ROUTE_SIGNUP} element={<SignUpForm/>}/>
     </Routes>
    </Router>
    <ToastContainer />
   </div>
  )
}

export default App
