import { Outlet } from 'react-router-dom';
import './App.css'
import Header from './components/Header';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const App = () => {

  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default App
