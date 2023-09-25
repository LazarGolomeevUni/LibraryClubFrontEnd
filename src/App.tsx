import './App.css';
import Navbar from './components/navbar/navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RoomControl from './pages/room-control-page/room-control-page';
import Management from './pages/management-page/management-page';
import Home from './pages/home-page/home-page';
import Login from './pages/log-in-page/log-in-page';
import { useState } from 'react';
import Help from './pages/help-page/help-page';
import About from './pages/about-page/about-page';
import { AuthContextProvider } from './components/AuthContext/AuthContext';
import Layout from './components/Layout/layout';
import VitalityPassport from './pages/vitality-passport-page/vitality-passport-page';


// const navigation = {
//   brand: { name: "Home", to: "/" },
//   links: [
//     { name: "Home", to: "/" },
//     { name: "Room Control", to: "/roomcontrol" },
//     { name: "Manage Users and Permissions", to: "/management" },
//     { name: "About", to: "/about" },
//     { name: "Help", to: "/help" },
//     { name: "Vitality Passport", to: "/passport" }
//   ]
// }

// const [isAuthenticated, setIsAuthenticated] = useState(false);

function App() {
  // const { brand, links } = navigation;
  return (

    <BrowserRouter>
      <AuthContextProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="help" element={<Help />} />
            <Route path="/login" element={<Login />}></Route>
            <Route path="roomcontrol" element={<RoomControl />} />
            
            <Route path="/passport" element={<VitalityPassport />}></Route>
            <Route path="management" element={<Management />} />
            {/* <Route index element={<Login />} /> */}
            {/* <PrivateRoute path="/" element={<Navbar brand={brand} links={links} />} />
        <PrivateRoute path="/" isAuthenticated={isAuthenticated} component={Home} /> */}
            {/* <Route path="/" element={<Navbar brand={brand} links={links} />}>

            <Route path="/" element={<Home />} />
            <Route path="roomcontrol" element={<RoomControl />} />
            <Route path="management" element={<Management />} />

            <Route path="help" element={<Help />} />
            
          </Route>
          <Route path="/login" element={<Login />}></Route> */}
          </Routes>
        </Layout>
      </AuthContextProvider>

    </BrowserRouter>
  );
}

export default App;
