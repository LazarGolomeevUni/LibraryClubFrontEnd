import React, { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { ReactComponent as Hamburger } from '../../assets/hamburger-svgrepo-com.svg'
import './navbar.css'
import { Outlet, Link } from "react-router-dom";
import AuthContext from '../AuthContext/AuthContext';

const Navbar = (props: {
    brand: { name: string; to: string };
    links: Array<{ name: string; to: string }>; // Start by assigning the array
}) => {
    const { brand, links } = props;
    const [showNavbar, setShowNavbar] = useState(false)
    const { user } = useContext(AuthContext) ?? {};

    const handleShowNavbar = () => {
        setShowNavbar(!showNavbar);
    }

    const NavLinks: any = () =>
        links.map((link: { name: string; to: string }) => (
            <li key={link.name}>
                <Link to={link.to} onClick={handleShowNavbar}>{link.name}</Link>
            </li>
        ));

    const log = () => {
        console.log(user)
    }

    return (
        <header>
            <nav className="navbar">
                <div className="container">
                    <div className="logo">
                        <a href={brand.to}><img src="https://a.storyblok.com/f/118054/480x234/9a6635fd49/wpvh-logo-small.jpg"></img></a>
                    </div>
                    <div className="menu-icon" onClick={handleShowNavbar}>
                        <Hamburger className='hamburger'></Hamburger>
                    </div>
                    <div className={`nav-elements  ${showNavbar && 'active'}`}>
                        <ul>
                            {user && <NavLinks />}
                            {user && <Link to='/passport'>{user?.username}</Link>}
                            {!user && (
                                <Link to="/login">
                                    Login
                                </Link>
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
