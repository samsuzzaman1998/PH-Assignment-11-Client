import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Header.css";
import { useAuthState } from "react-firebase-hooks/auth";
import firebaseAuth from "../../firebase.init";
import { signOut } from "firebase/auth";

const Header = () => {
    const [open, setOpen] = useState(false);
    const menuWrapperRef = useRef(null);
    const menuRef = useRef(null);

    const [user] = useAuthState(firebaseAuth);

    const handleMenu = () => {
        setOpen(!open);
    };
    useEffect(() => {
        const menuHeight = menuRef.current.getBoundingClientRect().height;

        if (open) {
            menuWrapperRef.current.style.height = `${menuHeight}px`;
        } else {
            menuWrapperRef.current.style.height = "0px";
        }
    }, [open]);
    return (
        <header className=" header-container">
            <nav className="navbar">
                <div className="brand">
                    <Link to="/">electro vally</Link>
                    <div className="toggle" onClick={handleMenu}>
                        {open ? (
                            <i className="fa-solid fa-x"></i>
                        ) : (
                            <i className="fa-solid fa-bars"></i>
                        )}
                    </div>
                </div>
                <div className="menu-wrapper" ref={menuWrapperRef}>
                    <div className="menu-container" ref={menuRef}>
                        <li>
                            <NavLink to="/">home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/blog">blog</NavLink>
                        </li>
                        {!user?.uid && (
                            <>
                                <li>
                                    <NavLink to="/login">login</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/register">register</NavLink>
                                </li>
                            </>
                        )}
                        {user?.uid && (
                            <>
                                <li>
                                    <NavLink to="/allinventories">
                                        manage items
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/additem">add items</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/myitems">my items</NavLink>
                                </li>
                            </>
                        )}
                        {user?.uid && (
                            <div className="user-info">
                                <img src={user?.photoURL} alt="profile" />
                                <span className="name">{user?.email}</span>
                                <button onClick={() => signOut(firebaseAuth)}>
                                    sign out
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
