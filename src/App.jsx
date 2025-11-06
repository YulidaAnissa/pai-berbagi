import './App.css'
import Home from './pages/home';
import ListModul from './pages/list-modul';
import Contribute from './pages/contribute';
import DetailPage from './pages/detail-modul';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/list-modul" element={<ListModul/>}/>
      <Route path="/contribute" element={<Contribute/>}/>
      <Route path="/modul/:idModul" element={<DetailPage />} />
    </Routes>
  );
}

export default App
