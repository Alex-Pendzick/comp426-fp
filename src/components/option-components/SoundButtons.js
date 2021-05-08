import React, { useState } from 'react'
import { Button, Alert } from 'react-bootstrap'
import { database } from '../../firebase'
import { useAuth } from  '../../contexts/AuthContext'

export default function SoundButtons({ instrument, sounds }) {

    const [message, setMessage] = useState('')
    const { currentUser } = useAuth()
    
    function handleClick(sound) {
        let player = new Audio(sound)
        player.play()
    }

    function confirmInstrument() {
        database.users.doc(currentUser.uid).set({
            instrument: sounds,
        }, { merge: true })
        setMessage(instrument + "s are selected as your intstrument!")
        setTimeout(()=> setMessage(''), 2000)
    }

    return (
        <div>
            {message && <Alert variant="success">{message}</Alert>}
            {sounds.map((sound, index) => (
                <>
                    <Button className="w-30 mt-2" key={index} onClick={()=>handleClick(sound)}>{instrument} {index}</Button>
                </>
            ))}
            <Button className="w-40 mt-2" onClick={confirmInstrument}>Use {instrument}s</Button>
        </div>
    )
}
