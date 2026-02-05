import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Game from "./pages/Game";
import Result from "./pages/Result";
import ApiDocs from "./pages/docs/ApiDocs";
import DeprecatedDocs from "./pages/docs/DeprecatedDocs";
import SessionLogs from "./pages/logs/SessionLogs";
import Experimental from "./pages/playground/Experimental";
import Settings from "./pages/profile/Settings";
import NotFoundUseful from "./pages/NotFoundUseful";
import Timer from "./components/Timer";
import { useGame } from "./context/GameContext";

export default function App() {
  const { started } = useGame();

  return (
    <>
      {started && <Timer />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
        <Route path="/result" element={<Result />} />

        {/* Maze Pages */}
        <Route path="/docs/api" element={<ApiDocs />} />
        <Route path="/docs/deprecated" element={<DeprecatedDocs />} />
        <Route path="/logs/session" element={<SessionLogs />} />
        <Route path="/playground/experimental" element={<Experimental />} />
        <Route path="/profile/settings" element={<Settings />} />

        {/* Sneaky */}
        <Route path="/404-not-found-but-useful" element={<NotFoundUseful />} />
      </Routes>
    </>
  );
}


/*> inspect-to-win@0.0.0 predeploy
> npm run build


> inspect-to-win@0.0.0 build
> vite build

(!) "base" option should start with a slash.
vite v7.3.1 building client environment for production...
✓ 57 modules transformed.
dist/index.html                   0.55 kB │ gzip:  0.32 kB
dist/assets/index-CGZOF9Zt.css    3.67 kB │ gzip:  1.29 kB
dist/assets/index-ByNJg3yq.js   236.89 kB │ gzip: 75.94 kB
✓ built in 507ms

> inspect-to-win@0.0.0 deploy
> gh-pages -d dist
*/