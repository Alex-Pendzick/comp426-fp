import React, { useState, useEffect } from 'react'
import { database } from '../firebase'
import { useAuth } from  '../contexts/AuthContext'

export default function HighScore() {
    const [highScore, setHighScore] = useState('')
    const { currentUser } = useAuth()

    useEffect(() => {
        database.users.doc(currentUser.uid).get().then((doc) => {
            if(doc.exists) {
                setHighScore(doc.data().highscore)
            } 
        })
    }, [])


    return (
            highScore ? <h2>Highscore: {highScore}</h2> :
            <h3>Get Started by picking a buddy and instrument in game options,
                making a username in update profile, and then playing!</h3>
    )
}