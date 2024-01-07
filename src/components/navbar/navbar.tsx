import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as Hamburger } from "../../assets/hamburger-svgrepo-com.svg";
import "./navbar.css";
import { Outlet, Link } from "react-router-dom";
import AuthContext, { UserProfile } from "../AuthContext/AuthContext";
import Logo from "../../assets/Logo.png"
import jwtDecode from "jwt-decode";

const Navbar = (props: {
    brand: { name: string; to: string };
    links: Array<{ name: string; to: string }>; // Start by assigning the array
}) => {
    const { brand, links } = props;
    const [showNavbar, setShowNavbar] = useState(false);
    const { user, setUser ,setAccessToken} = useContext(AuthContext) ?? {};
    console.log("This is user", user)

    const handleShowNavbar = () => {
        setShowNavbar(!showNavbar);
    };

    useEffect(() => {
        const localStorageAccessToken = localStorage.getItem("accessToken")
        if (localStorageAccessToken) {
            const saved = JSON.parse(localStorageAccessToken);

            if (saved) {
                const currentTime = new Date().getTime();

                if (currentTime > saved.expiryTime) {
                    // Item expired, remove it
                    localStorage.removeItem("accessToken");
                } else {
                    // Item not expired, use it

                    const decodedToken = jwtDecode(saved.accessToken)
                    if (decodedToken && setUser) {
                        setUser(decodedToken as UserProfile);
                    }
                    if(setAccessToken){
                        setAccessToken(saved.accessToken)
                    }
                }
            }
        }

    }, []);

    const NavLinks: any = () =>
        links.map((link: { name: string; to: string }) => (
            <li key={link.name}>
                <Link to={link.to} onClick={handleShowNavbar}>
                    {link.name}
                </Link>
            </li>
        ));
    return (
        <header>
            <nav className="navbar">
                <div className="container">
                    <div className="logo">
                        <a href={brand.to}>
                            <img src={Logo}></img>
                        </a>
                    </div>
                    <div className="menu-icon" onClick={handleShowNavbar}>
                        <Hamburger className="hamburger"></Hamburger>
                    </div>
                    <div className={`nav-elements  ${showNavbar && "active"}`}>
                        <ul>
                            {user && <NavLinks />}
                            {user?.role == "moderator" && <li><Link to="/moderator">Moderate</Link></li>}
                            {user && <Link to="/passport">{user?.username}</Link>}
                            {!user && (
                                <ul>
                                    <li><Link to="/login">Login</Link></li>
                                    <li><Link to="/register">This is a change</Link></li>
                                </ul>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
            <Outlet />
        </header>
    );
};

export default Navbar;
