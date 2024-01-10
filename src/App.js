// App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Jobs from './components/Jobs';
import JobItemDetails from './components/JobItemDetails';
import NotFound from './components/NotFound';


const App = () => (
  <Router>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/jobs/:id" element={<JobItemDetails/>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>
);

export default App;
