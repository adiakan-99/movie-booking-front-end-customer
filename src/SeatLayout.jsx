import React from 'react'
import Axios from "axios"
import Seats from './Seats'
import { useSelector, useDispatch } from 'react-redux'
import { addSeats } from './Redux'
import { useNavigate } from 'react-router-dom'

function SeatLayout() {
    const { user, movie, theatre } = useSelector((result) => result)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [rowCount, setRowCount] = React.useState(0)
    const [colCount, setColCount] = React.useState(0)
    const [amount, setAmount] = React.useState(0)

    const [totalSeats, setTotalSeats] = React.useState(0)
    const [seats, setSeats] = React.useState([])
    const [startingSeatNumber, setStartingSeatNumber] = React.useState(0)
    const [selectedSeats, setSelectedSeats] = React.useState([])

    React.useEffect(() => {
        Axios.get(`https://movie-booking-application-server.onrender.com/get/theatreseating/${encodeURIComponent(theatre.theatrename)}`)
            .then((output) => {
                const receivedData = output.data.theatreDetails
                console.log(receivedData)

                setRowCount(receivedData.rowCount)
                setColCount(receivedData.columnCount)
                setAmount(receivedData.price)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    React.useEffect(() => {
        setTotalSeats(rowCount * colCount)
    }, [rowCount, colCount])

    React.useEffect(() => {
        let temp = []
        for (let i = 1; i <= totalSeats; i++) {
            temp.push(<Seats seatNumber={i} setStartingSeat={setStartingSeatNumber} isSelected={selectedSeats.some((j) => i == j)} />)
        }
        setSeats(temp)
    }, [totalSeats, selectedSeats])

    React.useEffect(() => {
        if (startingSeatNumber > 0) {
            let temp = []
            for (let i = 0; i < theatre.seatCount; i++) {
                temp.push(startingSeatNumber + i);
            }
            setSelectedSeats(temp)
        }
    }, [startingSeatNumber])

    const makePayment = () => {
        dispatch(addSeats({ seats: selectedSeats }))

        // Use selectedSeats directly in the booking description
        // const bookingDescription = `Movie: ${movie.moviename}, Censor: ${movie.censor}, Location: ${theatre.location}, Theatre: ${theatre.theatrename}, date: ${theatre.date.date} ${theatre.date.monthName}, time: ${theatre.time}, seats: ${selectedSeats.join(', ')}`

        Axios.post("https://movie-booking-application-server.onrender.com/create/order", {
            amount: selectedSeats.length * amount  // Changed to selectedSeats.length * amount
        })
            .then((result) => {
                handlePayment(result.data.output)
            })
    }

    const handlePayment = (receivedData) => {
        // console.log(bookingDescription)

        const options = {
            key: "rzp_test_tQU9lVNtUvQtjs",
            amount: receivedData.amount,
            currency: receivedData.currency,
            name: user.username,
            description: "Movie Booking",
            order_id: receivedData.id,
            notes: {
                movieName: movie.moviename,
                censor: movie.censor,
                location: theatre.location,
                theatreName: theatre.theatrename,
                date: `${theatre.date.date} ${theatre.date.monthName}`,
                time: theatre.time,
                seats: selectedSeats.join(', ')
            },
            handler: async function (output) {
                Axios.post("https://movie-booking-application-server.onrender.com/insert/booking", {
                    movie: options.notes.movieName,
                    censor: options.notes.censor,
                    location: options.notes.location,
                    theatre: options.notes.theatreName,
                    date: options.notes.date,
                    time: options.notes.time,
                    seats: options.notes.seats,
                    amount: options.amount,
                    order_id: output.razorpay_order_id,
                    payment_id: output.razorpay_payment_id,
                    username: options.name
                })
                .then((result) => {
                    if (result.data.message === "Booking succesful!") {
                        navigate("/bookings");
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
            }
        }

        new window.Razorpay(options).open()
    }

    return (
        <>
            <h2 style={{ fontSize: "25px", fontWeight: 700, color: "#5c5d5e" }}>{movie.moviename.toUpperCase()} {movie.censor}</h2>
            <h2 style={{ fontSize: "20px", fontWeight: 600, color: "#797a7a" }}>{theatre.theatrename}, {theatre.location} | {theatre.date.dayName}, {theatre.date.date} {theatre.date.monthName}, {theatre.time}</h2>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ display: "grid", gridTemplateColumns: `repeat(${colCount}, 1fr)`, width: "800px" }}>
                    {seats}
                </div>
                <div style={{ border: "1px solid gray", width: "50%", height: "2px", backgroundColor: "gray", margin: "5px 10px" }}></div>
                <h2 style={{ color: "gray" }}>Your Screen is here</h2>
                <button onClick={makePayment} className='btn btn-success'>Make Payment</button>
            </div>
        </>
    )
}

export default SeatLayout