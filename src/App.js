import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import NewInsect from "./pages/NewInsect";
import EditInsect from "./pages/EditInsect";
import Tags from "./pages/Tags";
import NewTag from "./pages/NewTag";
import EditTag from "./pages/EditTag";

function Navbar() {
  return (
    <>
      <h2>Insect Database</h2>
      <Link to="/">
        <button>Insects</button>
      </Link>
      <Link to="tags">
        <button>TAGS</button>
      </Link>
    </>
  );
}

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="new" element={<NewInsect />} />
        <Route path="insect/edit/:id" element={<EditInsect />} />
        <Route path="tags" element={<Tags />} />
        <Route path="tag/new" element={<NewTag />} />
        <Route path="tag/edit/:id" element={<EditTag />} />
      </Routes>
    </div>
  );
}

export default App;
