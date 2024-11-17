import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Contacts from './components/Contacts'
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/contacts" element={<Contacts/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
