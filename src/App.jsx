import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Layout from "./components/layout/Layout";
import StopWatch from "./pages/stopwatch/StopWatch";
import Timer from "./pages/timer/Timer";
import WorldTime from "./pages/worldTime/WorldTime";
import Alarm from "./pages/alarm/Alarm";
import FocusSession from "./pages/focusSession/FocusSession";
import Signin from "./pages/Signin";
import GlobalStyles from "./components/UI/GlobalStyles";

// AnimatedRoutes component to handle page transitions
const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <Routes location={location}>
      <Route path="/" element={<Layout />}>
        <Route index element={<StopWatch />} />
        <Route path="focus-session" element={<FocusSession />} />
        <Route path="timer" element={<Timer />} />
        <Route path="alarm" element={<Alarm />} />
        <Route path="world-time" element={<WorldTime />} />
        <Route path="signin" element={<Signin />} />
      </Route>
    </Routes>
  );
};

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

export default App;
