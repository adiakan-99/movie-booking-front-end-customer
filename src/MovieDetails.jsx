import React from 'react';
import './MovieDetails.css'; // Import the external CSS file
import { useNavigate } from 'react-router-dom';
import { addMovie } from './Redux';
import { useDispatch } from 'react-redux';

function MovieDetails(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [movieDetails, setMovieDetails] = React.useState({});

    // Function to save movie details to localStorage
    const saveMovieDetails = (details) => {
        localStorage.setItem('movieDetails', JSON.stringify(details));
    };

    // Load movie details from props or localStorage
    React.useEffect(() => {
        if (props.details) {
            setMovieDetails(props.details);
            saveMovieDetails(props.details); // Save to localStorage
        } else {
            const storedDetails = localStorage.getItem('movieDetails');
            if (storedDetails) {
                setMovieDetails(JSON.parse(storedDetails));
            }
        }
    }, [props.details]);

    const goToLocationDetails = () => {
        dispatch(addMovie({
            moviename: movieDetails.movie_name,
            censor: movieDetails.censor
        }));
        navigate("/locationandtheatre")
    }

    return (
        <div className="card mb-3">
            <div className="row g-0">
                <div style={{ position: "relative" }} className="col-md-4">
                    <img src={movieDetails.image_url} className="img-fluid rounded-start" alt="Movie Poster" />
                    <a style={{ position: "absolute", top: "200px", left: "150px", height: "30px", backgroundColor: "rgba(0,0,0,0.7)", color: "white", padding: "2px", borderRadius: "5px" }} href={movieDetails.trailer} target='_blank' rel='noopener noreferrer'>
                        <i className="fa-solid fa-play"></i>Watch Trailer
                    </a>
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">{movieDetails.movie_name}</h5>
                        <p className="card-text description">{movieDetails.description}</p>
                        <p className="card-text info"><strong>Genre:</strong> {movieDetails.genre}</p>
                        <p className="card-text info"><strong>Censor Rating:</strong> {movieDetails.censor}</p>
                        <p className="card-text info"><strong>Directed by:</strong> {movieDetails.director}</p>
                        <p className="card-text info"><strong>Featuring:</strong></p>
                        {
                            movieDetails.cast && Array.isArray(movieDetails.cast) && (
                                <ul className="list-group list-group-flush">
                                    {movieDetails.cast.map((i, index) => (
                                        <li key={index} className="list-group-item">{i}</li>
                                    ))}
                                </ul>
                            )
                        }
                        <button onClick={goToLocationDetails} className="btn btn-danger">Book Tickets</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieDetails;
