import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Calendar from './pages/Calendar';
import About from './pages/About';
import Events from "./pages/Events";
import GameExpo from "./pages/GameExpo";
import GameJam from "./pages/GameJam";
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AddContentPage from "./pages/AddContentPage";
import ModifyContentPage from "./pages/ModifyContentPage";
import JamRegister from "./pages/JamRegister";
import EBoardApplication from "./pages/EBoardApplication"
import GameExpoForm from "./pages/GameExpoForm";
import PortfolioReviewForm from "./pages/PortfolioReviewForm";

<script src="https://kit.fontawesome.com/6e0977d2a0.js" crossorigin="anonymous"></script>

function App() {
    return (
        <HashRouter basename={process.env.PUBLIC_URL+'/'}>
            <div className="d-flex flex-column min-vh-100">
                <Navbar />

                <div className="flex-grow-1">
                    <Routes>
                        <Route path="/" element={<Home />} />

                        <Route path="/admin" element={<AdminLogin />} />
                        <Route path="/admindashboard" element={<AdminDashboard />} />
                        <Route path="/admin/add-content" element={<AddContentPage />} />
                        <Route path="/admin/modify-content" element={<ModifyContentPage />} />

                        <Route path="/calendar" element={<Calendar />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/events/talks" element={<Events />} />
                        <Route path="/events/expo" element={<GameExpo />} />
                        <Route path="/events/game-jams" element={<GameJam />} />

                        <Route path="/events/game-jams/register" element={<JamRegister />} />
                        <Route path="/eboard/application" element={<EBoardApplication />} />
                        <Route path="/events/expo/application" element={<GameExpoForm />} />
                        <Route path="/events/expo/portfolio-review" element={<PortfolioReviewForm />} />
                    </Routes>
                </div>

                <Footer />
            </div>
        </HashRouter>
    );
}

export default App;
