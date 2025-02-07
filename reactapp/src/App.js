import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";


import './App.css';
import Header from './compoents/Header';
import NoteListPage from './pages/NoteListPage';
import NotePage from "./pages/NotePage";


function App() {
  return (
    <Router>
      <div className="App">
        <Header/>
        <Routes>
          <Route path="/"  element={<NoteListPage />}/>
          <Route path="/note/:id" element={<NotePage />} />
        </Routes>
      </div>  
    </Router>
  );
}

export default App;
