import React, { useState } from 'react'
import { Button, Card, Alert, Container, Row, Col } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import Buddy from './Buddy'
import HighScore from './HighScore'

export default function Dashboard() {
    const [error, setError] = useState('')
    const { currentUser, logout } = useAuth()
    const history = useHistory()
    
    async function handleLogout() {
        setError('')

        try {
            await logout()
            history.push('/login')
        } catch {
            setError('Failed to log out')
        }
    }
    
    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Welcome {currentUser.displayName ? currentUser.displayName : currentUser.email} to</h2>
                    <h2 className="text-center mb-4">Buddy Dancing!</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Container>
                        <Row>
                            <Col className="text-center mb-4 large-text"><br></br><br></br>
                                <h3><strong>Email:</strong> {currentUser.email}</h3>
                                <HighScore></HighScore>
                            </Col>
                            <Col md={{ span: 4, offset: 3 }}><h2 className="text-left">Your Buddy:</h2><br></br><Buddy width="150" height="150"/></Col>
                        </Row>
                    </Container>
                    
                    <Link to="/game" className="btn btn-primary w-100 mt-3">Let's Play!</Link>
                    <Link to="/game-options" className="btn btn-primary w-100 mt-3">Game Options</Link>
                    <Link to="/update-profile" className="btn btn-primary w-100 mt-3">Update Profile</Link>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Button variant="link" onClick={handleLogout}>Log Out</Button>
            </div>
        </>
    )
}
