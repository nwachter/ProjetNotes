import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomepageComponent from "./pages/Home";
import SignupComponent from "./pages/Signup";
import Layout from "./components/general/Layout";

function App() {
  return (
    //  <Layout><HomepageComponent /></Layout>
    <Layout>
      <Routes>
        <Route path="/" element={<HomepageComponent />} />
        <Route path="/signup" element={<SignupComponent />} />
      </Routes>
    </Layout>
  );
}

export default App;
