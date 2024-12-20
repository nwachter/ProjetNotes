import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomepageComponent from "./pages/Home";
import SignupComponent from "./pages/Signup";
import SigninComponent from "./pages/Signin";
import Layout from "./components/general/Layout";
import NewNoteComponent from "./pages/NewNote";


function App() {



  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomepageComponent />} />
        <Route path="/signup" element={<SignupComponent />} />
        <Route path="/signin" element={<SigninComponent />} />
        <Route path="/new" element={<NewNoteComponent />} />
      </Routes>
    </Layout>
  );
}

export default App;
