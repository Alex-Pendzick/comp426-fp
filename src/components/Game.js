import React, { useState, useEffect } from 'react'
import { Button, Card, Container, Row, Col, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Board from './game-components/Board'
import DancingBuddy from './game-components/DancingBuddy'
import Song from '../Sounds/Song.mp3'
import Bongo1 from '../Sounds/bongo1.wav'
import Bongo2 from '../Sounds/bongo2.wav'
import Bongo3 from '../Sounds/bongo3.wav'
import Bongo4 from '../Sounds/bongo4.wav'
import Fail from '../Sounds/fail.wav'
import HighScore from './HighScore'
import { database } from '../firebase'
import { useAuth } from  '../contexts/AuthContext'
import Buddy from './Buddy'

export default function Game() {

    //game stae variables
    const [gameBoard, setGameBoard] = useState([[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0]])
    const [gameState, setGameState] = useState('entry')
    const [score, setScore] = useState(0)
    const [popularity, setPopularity] = useState(10)

    //time variables
    const [time, setTime] = useState(0)
    let interval

    // highscore handling variables
    const { currentUser } = useAuth()
    const [newHigh, setNewHigh] = useState(false)
    const [highScore, setHighScore] = useState(
        database.users.doc(currentUser.uid).get().then((doc) => {
            if(doc.exists) {
                setHighScore(doc.data().highscore)
            } 
        })
    )

    // sounds variables
    const [sound1, setSound1] = useState(new Audio(Bongo1))
    const [sound2, setSound2] = useState(new Audio(Bongo2))
    const [sound3, setSound3] = useState(new Audio(Bongo3))
    const [sound4, setSound4] = useState(new Audio(Bongo4))
    let fail = new Audio(Fail)

    useEffect(() => {
        database.users.doc(currentUser.uid).get().then((doc) => {
            if(doc.exists) {
                if (doc.data().instrument !== undefined) {
                    setSound1(new Audio(doc.data().instrument[0]))
                    setSound2(new Audio(doc.data().instrument[1]))
                    setSound3(new Audio(doc.data().instrument[2]))
                    setSound4(new Audio(doc.data().instrument[3]))
                }                
            } 
        })
    }, [])
    

    //when timer changes call this function
    useEffect(() => {
        if(gameState==="game") {
            if (popularity < 1) {
                lose()
                return
            }
            moveTiles()
            spawnTiles()
        }
    }, [time])

    function start() {  
        //reset board/score/time/pop
        if (time !== 0) {
            setGameBoard([[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0]])
            setScore(0)
            setTime(0)
            setPopularity(10)
        } else {
            //sets up interval only on first time to avoid the bug with exponential time when replaying
            interval = setInterval(()=> {
                setTime(time=>time+1)
            }, 432)
        }
        setNewHigh(false) 
        setGameState('game')  
    }

    //needs to handle sending score to firebase if time, rn shoukd just set game state
    function lose() {
        clearInterval(interval)
        if (score>highScore) {
            database.users.doc(currentUser.uid).set({
                highscore: score,
            }, { merge: true })
            setNewHigh(true)
        }
        setGameState('lost')
    }

    function spawnTiles() {
        const tempBoard = [...gameBoard];
        //for every 500 points (50 tiles), another chance to spawn tile added
        for (let i=0; i<=score/700; i++) {
            //pick ranodm column to add tile to
            // 66% to spawn in a random column
            let columnToAddTile = Math.floor(Math.random() * 6)
            //only 5% to spawn if have high points
            if (i>1) {
                columnToAddTile = Math.floor(Math.random() * 200)
            }
            //only 1% to spawn if have very high points
            if (i>2) {
                columnToAddTile = Math.floor(Math.random() * 400)
            }
            if (columnToAddTile < tempBoard.length) {
                tempBoard[columnToAddTile][0] = 1
            }
        }
        setGameBoard(tempBoard)        
    }

    function moveTiles() {
        const tempBoard = [...gameBoard];
        //move all tiles down one
        for (let i=0; i<tempBoard.length; i++) {
            if(tempBoard[i].pop() === 1) {
                setPopularity(popularity=>popularity-1)
            }
            tempBoard[i].unshift(0)
        }
        setGameBoard(tempBoard) 
    }   

    document.onkeydown = checkKey;
    
    function checkKey(e) {
        //does nothing if not in game
        if (gameState!=="game") { return }
        //check if a correct key is pressed
    	if(e.key === "ArrowLeft"){
            if (keyPressed(0)) {
                sound1.play()
            } else {
                fail.play()
            }
        } else if(e.key === "ArrowUp"){
            if (keyPressed(1)) {
                sound2.play()
            } else {
                fail.play()
            }
        } else if(e.key === "ArrowDown"){
            if (keyPressed(2)) {
                sound3.play()
            } else {
                fail.play()
            }
        }else if(e.key === "ArrowRight"){
            if (keyPressed(3)) {
                sound4.play()
            } else {
                fail.play()
            }	
        }
    }

    function keyPressed(row) {
        const length = gameBoard[row].length
            if(gameBoard[row][length-1] !== 1) {
                setPopularity(popularity=>popularity-1)
                return false
            } else {
                //replace last value with 0
                const tempBoard = [...gameBoard]
                tempBoard[row].pop()
                tempBoard[row].push(0)
                setGameBoard(tempBoard)
                setScore(score=>score+10)
                return true
            }
    }


    return (
        <div>
            {{
                'entry':(<>
                            <Card>
                                <Card.Body>
                                    <p>Listen to a Bossa nova classic with your buddy and play along! Click the arrow keys when the
                                        circle is in the last column on the right to score points and hear some latin percussion! The longer the 
                                        son goes on, the harder the circle combos you will get. If one goes by, 
                                        or you press a key when a circle is not in the last column, you lose some popularity and
                                        will hear a sound indicating so. Lose all of your popularity and it is game over! Good luck :)!
                                    </p>
                                    <Button className="w-100 text-center mt-2" onClick={start}>Start Game!</Button>
                                    <br></br><br></br>
                                    <Table striped bordered variant="dark">
                                        <tbody>
                                            {gameBoard.map((row, index) => 
                                                    <tr key={index}> 
                                                        {row.map((value, indix) => <td key={indix}></td>) }                                           
                                                    </tr>
                                            )}
                                        </tbody>
                                    </Table>
                                </Card.Body>
                            </Card>
                        </>),
                'lost':(<>
                    <Card>
                        <Card.Body>
                            <HighScore></HighScore>
                            <Container>
                                <Row>
                                    <Col xs={6}>{newHigh ? 
                                    <h2>Congrats on a new highscore!</h2>
                                    :
                                    <h2>Your Score was {score}, nice job!</h2>
                                    }</Col>
                                    <Col md={{ span: 4, offset: 1 }}><Buddy width="150" height="150"/></Col>
                                </Row>
                                
                            </Container>

                            
                            <Button className="w-100 text-center mt-2" onClick={start}>Try Again!</Button>
                        </Card.Body>
                    </Card>
                </>),
                'game':(<>
                    <Card>
                        <Card.Body>
                            <Container>
                                <Row>
                                    <Col className="text-center mb-4 large-text">
                                        <h2>Score {score}</h2>
                                        <h2>Popularity {popularity}</h2>
                                    </Col>
                                    <Col md={{ span: 4, offset: 3 }}><DancingBuddy width="150" height="150"/></Col>
                                </Row>
                            </Container>
                        </Card.Body>
                        <Board gameBoard={gameBoard}></Board>
                        <audio src={Song} loop autoPlay></audio>
                    </Card>
                </>),

                'loading':(
                        <div>Loading</div>
                    )
            }[gameState]}
            
            <div className="w-100 text-center mt-2">
                        <Link to="/">Main Menu</Link>
            </div>
        </div>
    )
}
