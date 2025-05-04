import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Layout from "./components/layout/Layout";
import StopWatch from "./pages/stopwatch/StopWatch";
import Timer from "./pages/timer/Timer";
import WorldTime from "./pages/worldTime/WorldTime";
import Alarm from "./pages/alarm/Alarm";
import FocusSession from "./pages/focusSession/FocusSession";

// AnimatedRoutes component to handle page transitions
const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        <Routes location={location}>
          <Route path="/" element={<Layout />}>
            <Route path="focus-session" element={<FocusSession />} />
            <Route path="timer" element={<Timer />} />
            <Route path="alarm" element={<Alarm />} />
            <Route index element={<StopWatch />} />
            <Route path="world-time" element={<WorldTime />} />
          </Route>
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

export default App;
