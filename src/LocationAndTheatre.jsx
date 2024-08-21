import React from 'react'
import Axios from 'axios'
import "./App.css"
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { addLocationAndTheatre } from './Redux'

function LocationAndTheatre() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const movieDetails = useSelector((result) => result.movie)

    // console.log(movieDetails)
    
    const [locationAndTheatreDetails, setLocationAndTheatreDetails] = React.useState([])
    const [location, setLocation] = React.useState("")
    const [dates, setDates] = React.useState([])
    const [selectedDate, setselectedDate] = React.useState(null)
    const [selectedTime, setSelectedTime] = React.useState("")
    const [selectedSeatCount, setSelectedSeatCount] = React.useState(0)

    const seatsCount = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]

    React.useEffect(() => {
        Axios.get("https://movie-booking-application-server.onrender.com/fetch/locationandtheatre")
            .then((output) => {
                setLocationAndTheatreDetails(output.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    function displayLocation(event) {
        setLocation(event.target.value)
    }

    React.useEffect(() => {
        const tempDates = []

        for (let i = 0; i < 7; i++) {
            const today = new Date()
            today.setDate(today.getDate() + i)

            const date = today.getDate()
            const dayName = today.toLocaleString("default", { weekday: "short" })
            const monthName = today.toLocaleString("default", { month: "short" })

            tempDates.push({
                date: date,
                dayName: dayName,
                monthName: monthName
            })
        }

        setDates(tempDates)
    }, [])

    const selectDate = (receivedDate) => {
        setselectedDate(receivedDate)
    }

    const selectSeats = (receivedSeatCount) => {
        setSelectedSeatCount(receivedSeatCount)
    }

    const collectTheTime = (recevedTime) => {
        setSelectedTime(recevedTime)
    }

    const goToSeatLayout = (receivedTheatreName) => {
        if (selectedSeatCount > 0) {
            dispatch(addLocationAndTheatre({
                theatrename: receivedTheatreName,
                location: location,
                date: selectedDate,
                time: selectedTime,
                seatCount: selectedSeatCount
            }))
            navigate("/seatlayout")
        }
    }
    return (
        <>
            <h1 style={{ fontSize: "40px", fontWeight: 700, marginLeft: "10px" }}>{movieDetails.moviename}</h1>
            <p style={{ marginLeft: "10px" }}>{movieDetails.censor}</p>
            <div style={{ display: "flex", justifyContent: "space-between", border: "1px solid black", margin: "5px", borderRadius: "10px", width: "30rem" }}>
                {
                    dates.map((i) => {
                        return <div onClick={() => selectDate(i)} style={{ cursor: "pointer", textAlign: "center", padding: "10px" }} className={selectedDate === i ? "apply-background-date" : null}>
                            <h2>{i.dayName.toUpperCase()}</h2>
                            <h2>{i.date}</h2>
                            <h2>{i.monthName.toUpperCase()}</h2>
                        </div>
                    })
                }
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px" }}>
                <select
                    onChange={displayLocation}
                    className="form-select"
                    style={{ width: "250px", padding: "10px", fontSize: "16px", borderRadius: "5px", border: "2px solid #28a745", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
                    <option value="">Select Location</option>
                    {
                        locationAndTheatreDetails.map((i) => {
                            return <option value={i.location}>{i.location}</option>
                        })
                    }
                </select>
            </div>

            {
                selectedDate && location ? locationAndTheatreDetails.map(function (i) {
                    if (i.location === location) {
                        return i.theatres.map((j) => {
                            return <div class="card" style={{ width: "60rem", marginTop: "20px" }}>
                                <div class="card-body" style={{ display: "flex", justifyContent: "space-between" }}>
                                    <h5 style={{ fontSize: "25px" }} class="card-title">{j.theatreName}</h5>
                                    <div style={{ display: "flex", marginTop: "5px", justifyContent: "space-evenly" }}>
                                        {
                                            j.showTimes.map((k) => {
                                                return <>
                                                    <button onClick={() => collectTheTime(k)} type="button" class="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{ marginRight: "5px" }}>
                                                        {k}
                                                    </button>


                                                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                        <div class="modal-dialog modal-dialog-centered">
                                                            <div class="modal-content">
                                                                <div class="modal-header">
                                                                    <h1 class="modal-title fs-5" id="exampleModalLabel">Select Seats</h1>
                                                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                </div>
                                                                <div class="modal-body" style={{ display: "flex", justifyContent: "space-between" }}>
                                                                    {
                                                                        seatsCount.map((l) => {
                                                                            // className={ userSeatCount == l ? "apply-background-seatcount" : null }
                                                                            return <h4 onClick={() => selectSeats(l)} className={ selectedSeatCount === l ? "apply-background-seatcount" : null }  style={{ cursor: "pointer", padding: "2px" }}>{l}</h4>
                                                                        })
                                                                    }
                                                                </div>
                                                                <div class="modal-footer">
                                                                    <button onClick={() => goToSeatLayout(j.theatreName)} type="button" class="btn btn-danger" data-bs-dismiss="modal">Go To Seat Booking</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        })
                    }
                }) : null
            }
        </>
    )
}

export default LocationAndTheatre