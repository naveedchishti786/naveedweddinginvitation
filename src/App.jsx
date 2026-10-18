import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Particles from './components/Particles';
import Home from './pages/Home';
import EventPage from './pages/EventPage';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Particles />
        <Navbar />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/"        element={<Home />} />
            <Route path="/mehndi"  element={<EventPage eventId="mehndi" />} />
            <Route path="/barat"   element={<EventPage eventId="barat" />} />
            <Route path="/walima"  element={<EventPage eventId="walima" />} />
          </Routes>
        </AnimatePresence>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
