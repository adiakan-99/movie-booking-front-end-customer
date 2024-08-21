import React from 'react'

function Seats(props) {
    const selectSeatNumber = () => {
        props.setStartingSeat(props.seatNumber)
    }

    return (
        <button
            onClick={selectSeatNumber}
            type='button'
            className={props.isSelected ? "btn btn-success" : "btn btn-outline-success"}
            style={{ border: "1px solid black", width: "25px", height: "25px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", padding: "0", margin: "5px 0px 5px 0px" }}
        >
            {props.seatNumber}
        </button>
    )
}

export default Seats
