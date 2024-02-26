import React from 'react'
import styled from 'styled-components'
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
                
                </div>
            </nav>

        </Container>
    )
}

const Container = styled.div``;