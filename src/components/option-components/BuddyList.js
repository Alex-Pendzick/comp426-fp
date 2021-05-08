import React, { useState } from 'react'
import axios from 'axios'
import { Button, Alert } from 'react-bootstrap'
import { database } from '../../firebase'
import { useAuth } from  '../../contexts/AuthContext'

export default function BuddyList({ pokemon }) {

    const [message, setMessage] = useState('')
    const [currentImage, setCurrentImage] = useState()
    const [currentName, setCurrentName] = useState('')
    const { currentUser } = useAuth()

    function SeeImage(p) {
        let cancel
        axios.get(p.url, {
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(res => {
            // setLoading(false)
            setCurrentImage(res.data.sprites.front_default)
            setCurrentName(res.data.name)
        })
        return () => cancel()
    }

    function confirmBuddy() {
        database.users.doc(currentUser.uid).set({
            buddy: currentImage,
        }, { merge: true })
        setMessage(currentName.charAt(0).toUpperCase() + currentName.slice(1) + " is selected as your buddy!")
    }


    return (
        <div>
            {message && <Alert variant="success">{message}</Alert>}
            <img src={currentImage} alt="Click a buddy to see a preview!" width="200" height="200"></img>
            <br></br>
            {pokemon.map(p => (
                <>
                    <button key={p.name} onClick={() => SeeImage(p)}>
                        {p.name}
                    </button>
                </>
            ))}
            <br></br>
            <Button className="w-30 mt-2" onClick={() => confirmBuddy()}>Confirm Buddy</Button>
        </div>
    )
}
