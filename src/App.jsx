import { BrowserRouter, Route , Routes } from 'react-router-dom'
import AddTask from './pages/AddTask'
import TaskList from './pages/TaskList'
import AppLayout from './loadout/AppLayout'
import GlobalProvider from './context/GlobalContext'

function App() {


  return (
    <>
    <GlobalProvider>
      <BrowserRouter>
      <Routes>
      <Route element={<AppLayout/>}>
      <Route path='/' element={<TaskList/>}/>
      <Route path='/addtask' element={<AddTask/>}/> 
      </Route>
     </Routes>
     </BrowserRouter>
    </GlobalProvider>
     
    </>
  )
}

export default App
