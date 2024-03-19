// Import React and necessary hooks
import React, { useState } from "react";
// Import necessary components, icons, and libraries
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IoPlayCircleSharp } from "react-icons/io5";
import { AiOutlinePlus } from "react-icons/ai";
import { RiThumbUpFill, RiThumbDownFill } from "react-icons/ri";
import { BiChevronDown } from "react-icons/bi";
import { BsCheck } from "react-icons/bs";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase.config.js";
import { useDispatch } from "react-redux";
import { removeMovieFromLiked } from "../store";
import video from "../assets/video.mp4";

// Define and export the Card component
export default React.memo(function Card({ index, movieData, isLiked = false }) {
    // Initialize navigate hook
    const navigate = useNavigate();
    // Initialize dispatch hook
    const dispatch = useDispatch();
    // Initialize state for hover state and email
    const [isHovered, setIsHovered] = useState(false);
    const [email, setEmail] = useState(undefined);

    // Listen for authentication state changes to get current user's email
    onAuthStateChanged(firebaseAuth, (currentUser) => {
        if (currentUser) {
            setEmail(currentUser.email);
        } else navigate("/login"); // Redirect to login if user not authenticated
    });

    // Function to add movie to user's list
    const addToList = async () => {
        try {
            // Send request to backend to add movie to user's list
            await axios.post("http://localhost:5000/api/user/add", {
                email,
                data: movieData,
            });
        } catch (error) {
            console.log(error); // Log any errors
        }
    };

    // JSX for rendering the Card component
    return (
        <Container
            onMouseEnter={() => setIsHovered(true)} // Set hover state on mouse enter
            onMouseLeave={() => setIsHovered(false)} // Clear hover state on mouse leave
        >
            {/* Render movie image */}
            <img
                src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
                alt="card"
                onClick={() => navigate("/player")} // Redirect to player on image click
            />

            {/* Show additional info on hover */}
            {isHovered && (
                <div className="hover">
                    {/* Container for image and video */}
                    <div className="image-video-container">
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
                            alt="card"
                            onClick={() => navigate("/player")}
                        />
                        <video
                            src={video}
                            autoPlay={true}
                            loop
                            muted
                            onClick={() => navigate("/player")}
                        />
                    </div>
                    {/* Container for movie information */}
                    <div className="info-container flex column">
                        {/* Movie title */}
                        <h3 className="name" onClick={() => navigate("/player")}>
                            {movieData.name}
                        </h3>
                        {/* Icons for actions */}
                        <div className="icons flex j-between">
                            {/* Controls */}
                            <div className="controls flex">
                                {/* Play button */}
                                <IoPlayCircleSharp
                                    title="Play"
                                    onClick={() => navigate("/player")}
                                />
                                {/* Like button */}
                                <RiThumbUpFill title="Like" />
                                {/* Dislike button */}
                                <RiThumbDownFill title="Dislike" />
                                {/* Conditional rendering of add/remove button based on like status */}
                                {isLiked ? (
                                    // Remove from list button
                                    <BsCheck
                                        title="Remove from List"
                                        onClick={() =>
                                            dispatch(
                                                removeMovieFromLiked({ movieId: movieData.id, email })
                                            )
                                        }
                                    />
                                ) : (
                                    // Add to list button
                                    <AiOutlinePlus title="Add to my list" onClick={addToList} />
                                )}
                            </div>
                            {/* More info button */}
                            <div className="info">
                                <BiChevronDown title="More Info" />
                            </div>
                        </div>
                        {/* List of genres */}
                        <div className="genres flex">
                            <ul className="flex">
                                {/* Map through genres and render each one with a key */}
                                {movieData.genres.map((genre, index) => (
                                    <li key={index}>{genre}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </Container>
    );
});


const Container = styled.div`
  max-width: 230px;
  width: 230px;
  height: 100%;
  cursor: pointer;
  position: relative;
  img {
    border-radius: 0.2rem;
    width: 100%;
    height: 100%;
    z-index: 10;
  }
  .hover {
    z-index: 99;
    height: max-content;
    width: 20rem;
    position: absolute;
    top: -18vh;
    left: 0;
    border-radius: 0.3rem;
    box-shadow: rgba(0, 0, 0, 0.75) 0px 3px 10px;
    background-color: #181818;
    transition: 0.3s ease-in-out;
    .image-video-container {
      position: relative;
      height: 140px;
      img {
        width: 100%;
        height: 140px;
        object-fit: cover;
        border-radius: 0.3rem;
        top: 0;
        z-index: 4;
        position: absolute;
      }
      video {
        width: 100%;
        height: 140px;
        object-fit: cover;
        border-radius: 0.3rem;
        top: 0;
        z-index: 5;
        position: absolute;
      }
    }
    .info-container {
      padding: 1rem;
      gap: 0.5rem;
    }
    .icons {
      .controls {
        display: flex;
        gap: 1rem;
      }
      svg {
        font-size: 2rem;
        cursor: pointer;
        transition: 0.3s ease-in-out;
        &:hover {
          color: #b8b8b8;
        }
      }
    }
    .genres {
      ul {
        gap: 1rem;
        li {
          padding-right: 0.7rem;
          &:first-of-type {
            list-style-type: none;
          }
        }
      }
    }
  }
`;