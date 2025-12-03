import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Calendar from './pages/Calendar';
import About from './pages/About';
import Events from "./pages/Events";
import GameExpo from "./pages/GameExpo";
import GameJam from "./pages/GameJam";
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import GameJamRegister from "./pages/GameJamRegister";
import EBoardApplication from "./pages/EBoardApplication"
import GameExpoForm from "./pages/GameExpoForm";
import PortfolioReviewForm from "./pages/PortfolioReviewForm";

function App() {
    return (
        <Router>
            <div className="d-flex flex-column min-vh-100">
                <Navbar />

                <div className="flex-grow-1">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/calendar" element={<Calendar />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/events/talks" element={<Events />} />
                        <Route path="/events/expo" element={<GameExpo />} />
                        <Route path="/events/game-jams" element={<GameJam />} />

                        <Route path="/events/game-jams/register" element={<GameJamRegister />} />
                        <Route path="/eboard/application" element={<EBoardApplication />} />
                        <Route path="/events/expo/application" element={<GameExpoForm />} />
                        <Route path="/events/expo/portfolio-review" element={<PortfolioReviewForm />} />
                    </Routes>
                </div>

                <Footer />
            </div>
        </Router>
    );
}

export default App;
