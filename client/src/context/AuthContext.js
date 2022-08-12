import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';
import axios from 'axios'
import { MD5 } from 'crypto-js';

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [userData, setUserData] = useState()
    const [inventory, setInventory] = useState({
        name: "Trimmer",
        metadata: {
            brand: "Phillips",
        },
        price: 10,
        estValue: 100,
    })
    const [userNotifications, setNotifications] = useState([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    async function signup(userInput) {
        try {
            const { data } = await axios.post("/api/register", {
                regName: userInput.name,
                regPassword: userInput.password,
                regEmail: userInput.email,
            })

            console.log(data);
            if (data.statusCode == 500) {
                //success
                console.log(data);
                return;
            } else if (data.statusCode == 501) {
                //email already exists
                throw new Error(data.message);
            }
        } catch (error) {
            throw error
        }
    }

    async function login(userInput) {
        try {
            const { data } = await axios.post("/api/login", {
                loginEmail: userInput.email,
                loginPassword: userInput.password,
            })
            console.log(data);
            if (data.statusCode == 550) {
                //success
                console.log(data);
                navigate("/dashboard")
                Cookies.set("user", MD5(userInput.email))
                setCurrentUser(Cookies.get("user"))
                return;
            } else if (data.statusCode == 502) {
                //wrong password
                console.log(data);
                throw new Error(data.message);
            }
        } catch (error) {
            throw error
        }
    }

    async function getUserData() {
        setTimeout(() => {
            setUserData({
                username: "akarsh1278.be20",
                email: "akarsh1278.be20@chitkarauniversity.edu.in",
                name: "Akarsh Tripathi",
                rollNum: 2011981278,
                campus: "HP",
                batch: 2020,
                branch: "CSE",
                hostel: "Bose",
                roomNum: 224,
                verified: false,
                complete: false
            })
        }, 5000);
    }

    useEffect(() => {
        setCurrentUser(Cookies.get("user"))
    }, [])


    const value = {
        currentUser,
        userData,
        userNotifications,
        login,
        signup,
        getUserData
    }
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}