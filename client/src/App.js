import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomepageComponent from "./pages/Home";
import SignupComponent from "./pages/Signup";
import SigninComponent from "./pages/Signin";
import Layout from "./components/general/Layout";

function App() {
  return (
    //  <Layout><HomepageComponent /></Layout>
    <Layout>
      <Routes>
        <Route path="/" element={<HomepageComponent />} />
        <Route path="/signup" element={<SignupComponent />} />
        <Route path="/signin" element={<SigninComponent />} />
      </Routes>
    </Layout>
  );
}

export default App;
