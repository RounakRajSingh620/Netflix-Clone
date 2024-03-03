import React, { useState } from 'react'
import NavBar from '../components/NavBar';
import backgroundImage from "../assets/home.jpg";
import MovieLogo from "../assets/homeTitle.webp";
import { FaPlay } from 'react-icons/fa';
import { AiOutlineInfoCircle } from "react-icons/ai";
import styled from "styled-components";

export default function Netflix() {

  const [isScrolled, setIsScrolled] = useState(false);
  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  }
  return (
    <Container>
      <NavBar isScrolled={isScrolled} />
      <div className="hero">
        <img src={backgroundImage} alt="background"
          className='background-image' />
        <div className="container">
          <div className="logo">
            <img src={MovieLogo} alt="Movie Logo" />
          </div>
          <div className="buttons flex">
            <button className="flex j-center a-center">
              <FaPlay /> Play
            </button>
            <button className="flex j-center a-center">
              <AiOutlineInfoCircle /> More Info
            </button>
          </div>
        </div>
      </div>
    </Container>
  )
}
const Container = styled.div`
background-color:black;
.hero{
  position:relative;
  .background-image{
    filter:brightness(60%);
  }
  img{
    height:100vh;
    width:100vw;
  }
  .container{
    position:absolute;l
    bottom:5rem;
    .logo{
      img{
        widhr:100%;
        heght:100%;
        margin-left:5rem;
      }
    }
    .buttons{
      font-size:1.4rem;
      gap:1rem;
      border-radius:0.2rem;
      padding:0.5rem;
      padding-left:2rem;
      pdding-right:2.4rem;
      border:none;
      cursor:pointer;
      transition:0.2s ease-in-out;
      &:hover{
        opacity:0.8;
      }
      &:nth-of-type(2){
        background-color:rgba(109,109,110,0.7);
        color:white;
        svg{
          font-sizes:1.8rem;
          
        }
      }
    }
  }
}
`;