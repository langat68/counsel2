
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./components/Pages/Index";
import Clients from "./components/Pages/Clients";
import Notes from "./components/Pages/Notes";
import Documents from "./components/Pages/Documents";
import CalendarPage from "./components/Pages/CalendarPage";
//import Settings from "./components/Pages/Settings";
import NotFound from "./components/Pages/Notfound";


const App = () => (

  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/clients" element={<Clients />} />
      <Route path="/notes" element={<Notes />} />
      <Route path="/documents" element={<Documents />} />
      <Route path="/calendar" element={<CalendarPage />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>

);

export default App;
