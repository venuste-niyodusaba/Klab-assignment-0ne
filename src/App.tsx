import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import "./index.css";
import LayoutHandling from "./layout";
import Home from "./components/home";

import LoginModal from "./components/login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutHandling />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="login"element={<LoginModal onClose={() => window.history.back()} />}/>

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
