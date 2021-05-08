import React, { useState, useEffect } from 'react'
import { database } from '../firebase'
import { useAuth } from  '../contexts/AuthContext'

export default function DancingBuddy({ width, height }) {
    const [buddy, setBuddy] = useState('')
    const { currentUser } = useAuth()

    useEffect(() => {
        database.users.doc(currentUser.uid).get().then((doc) => {
            if(doc.exists) {
                setBuddy(doc.data().buddy)
            } 
        })
    }, [])


    return (
            <img src={buddy} alt="Go pick a buddy in game options!" width={width} height={height}/>
    )
}