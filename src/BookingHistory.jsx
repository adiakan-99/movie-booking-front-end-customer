import React from 'react'
import Axios from "axios"
import { useSelector } from 'react-redux'

function BookingHistory() {
    const { user } = useSelector((result) => result)

    const [bookingHistory, setBookingHistory] = React.useState([])

    React.useEffect(() => {
        Axios.get("https://movie-booking-application-server.onrender.com/get/booking/" + user.username)
            .then((output) => {
                setBookingHistory(output.data.bookingHistoryData)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    const deleteTheOrder = (receivedOrderID) => {
        Axios.delete(`https://movie-booking-application-server.onrender.com/booking/delete/${receivedOrderID}`)
        .then((response) => {
            if (response.data.message === "Order deleted succesfully!") {
                setBookingHistory(prevHistory => prevHistory.filter(order => order.orderID !== receivedOrderID))
            } else {
                console.log("Order not found or could not be deleted!")
            }
        })
        .catch((error) => {
            console.log(error)
        })
    }

    return (
        <div className="container mt-5" style={{ maxWidth: "600px" }}>
            <h2 style={{ color: "#333", textAlign: "center", fontSize: "30px", marginBottom: "20px", fontWeight: 700 }}>Your Booking History!</h2>
            {
                bookingHistory.map((i) => (
                    <div className="card mb-4" style={{ borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
                        <div className="card-body">
                            <h5 className="card-title" style={{ color: "#007bff", fontWeight: "bold" }}>{i.movie}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">{i.censor}</h6>
                            <h5 className="card-title" style={{ marginTop: "15px", color: "#555" }}>{i.theatreName}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">{i.location}</h6>
                            <hr style={{ marginBottom: "10px" }} />
                            <h6 className="card-subtitle mb-2 text-muted">Seats: {i.seats}</h6>
                            <h6 className="card-subtitle mb-2 text-muted">Amount Paid: &#x20B9;{i.amount}</h6>
                            <h6 className="card-subtitle mb-2 text-muted">Date: {i.date}</h6>
                            <h6 className="card-subtitle mb-2 text-muted">Time: {i.time}</h6>
                            <hr style={{ marginBottom: "10px" }} />
                            <h6 className="card-subtitle mb-2 text-muted">Order ID: {i.orderID}</h6>
                            <h6 className="card-subtitle mb-2 text-muted">Payment ID: {i.paymentID}</h6>
                            <button onClick={() => deleteTheOrder(i.orderID)} className='btn btn-danger'>Delete</button>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default BookingHistory
