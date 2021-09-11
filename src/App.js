import './App.css';
import CaisoRequests from "./Components/CaisoRequests";
import Navbar from './Components/Navbar';

/** App: app for CAISO scraper */
function App() {
  return (
    <div className="App">
      <Navbar />
      <CaisoRequests />
    </div>
  );
}

export default App;
