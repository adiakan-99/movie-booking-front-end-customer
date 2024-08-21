import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styles from './Home.module.css'; // Import CSS module

function Home() {
  const { user } = useSelector((result) => result)
  const navigate = useNavigate()

  return (
    <div className={styles.homeContainer}>
      <h1 className={styles.welcomeMessage}>Welcome {user.username}, Let's Start Booking Movies!</h1>

      <div className={styles.buttonContainer}>
        <button onClick={() => navigate("/movies")} className={`${styles.btn} ${styles.btnSuccess}`}>
          View Our Selection of Movies <i className="fa-solid fa-arrow-right"></i>
        </button>
        <button onClick={() => navigate("/bookings")} className={`${styles.btn} ${styles.btnInfo}`}>
          View Your Booking History <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </div>
  )
}

export default Home
