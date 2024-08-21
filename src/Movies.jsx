import React from 'react'
import Axios from "axios"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

function Movies(props) {
    const navigate = useNavigate();

    const username = useSelector((result) => result.user.username)

    const [movieData, setMovieData] = React.useState([])

    React.useEffect(() => {
        Axios.get("https://movie-booking-application-server.onrender.com/fetch/all/movies")
            .then((result) => {
                setMovieData(result.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    const goToParticularMovie = (i) => {
        props.setDetails(i)
        navigate("/moviedetails")
    }


    return (
        <>
            <h2 style={{ fontSize: "30px", fontWeight: 700, color: "gray" }}>Welcome {username}, Checkout our movies!</h2>
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
                {
                    movieData.map((i) => {
                        return <div class="card" style={{ width: "20rem", marginTop: "10px" }}>
                            <img onClick={() => goToParticularMovie(i)} style={{ height: "300px" }} src={i.image_url} class="card-img-top" alt={i.movie_name} />
                            <div class="card-body">
                                <h2 style={{fontWeight: 700, fontSize: "20px"}} class="card-title">{i.movie_name}</h2>
                                <p class="card-text">{i.genre}</p>
                            </div>
                        </div>
                    })
                }
            </div>
        </>
    )
}

export default Movies