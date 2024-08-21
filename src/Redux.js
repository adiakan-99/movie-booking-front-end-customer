import { configureStore, createSlice } from "@reduxjs/toolkit"

// Load user data from localStorage if available
const savedUserData = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : {
        username: "",
        email: "",
        isLoggedIn: false
    };

const userSlice = createSlice({
    name: "user",
    initialState: savedUserData,
    reducers: {
        addUser: (state, action) => {
            const newUserState = {
                username: action.payload.username,
                email: action.payload.email,
                isLoggedIn: true
            };
            localStorage.setItem("user", JSON.stringify(newUserState)); // Save to localStorage
            return newUserState;
        },
        removeUser: (state) => {
            const resetUserState = {
                username: "",
                email: "",
                isLoggedIn: false
            };
            localStorage.removeItem("user"); // Remove from localStorage
            return resetUserState;
        }
    }
});

export const { addUser, removeUser } = userSlice.actions;

const movieSlice = createSlice({
    name: "movie",
    initialState: {
        moviename: "",
        censor: ""
    },
    reducers: {
        addMovie: (state, action) => {
            return {
                moviename: action.payload.moviename,
                censor: action.payload.censor
            }
        }
    }
})

export const { addMovie } = movieSlice.actions

const theatreSlice = createSlice({
    name: "theatre",
    initialState: {
        theatrename: "",
        location: "",
        date: "",
        time: "",
        seatCount: 0,
        seats: []
    },
    reducers: {
        addLocationAndTheatre: (state, action) => {
            return {
                ...state,
                theatrename: action.payload.theatrename,
                location: action.payload.location,
                date: action.payload.date,
                time: action.payload.time,
                seatCount: action.payload.seatCount
            }
        },
        addSeats: (state, action) => {
            return {
                ...state,
                seats: action.payload.seats
            }
        }
    }
})

export const { addLocationAndTheatre, addSeats } = theatreSlice.actions;

export const movieStore = configureStore({
    reducer: {
        user: userSlice.reducer,
        movie: movieSlice.reducer,
        theatre: theatreSlice.reducer
    }
})

