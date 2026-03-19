import { BrowserRouter, Routes, Route } from "react-router-dom";
import DevPage from "./pages/DevPage";
import ShelfPage from "./pages/ShelfPage";


//main component
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ShelfPage />} />
                <Route path="/dev" element={<DevPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
