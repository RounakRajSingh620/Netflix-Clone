import React from 'react'
import styled from 'styled-components'
import logo from "../assets/logo.png"
import { Link } from 'react-router-dom';
export default function NavBar({ isScrolled }) {
    const links = [
        { name: "Home", link: "/" },
        { name: "TV Shows", link: "/tv" },
        { name: "Movies", link: "/movies" },
        { name: "My List", link: "/mylist" },
    ];
    return (
        <Container>
            <nav className={`flex ${isScrolled ? "scrolled" : " "}`}>
                <div className="left flex a-center">
                    <div className="brand flex a-center j-center">
                        <img src={logo} alt="logo" />
                    </div>
                    <ul className="links flex">
                        {links.map((name, link) => {
                            return (
                                <li key={name}>
                                    <Link to={link}>{name}</Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div className="right flex a-center">
                    <div className={`search`}></div>
                </div>
            </nav>

        </Container>
    )
}

const Container = styled.div``;