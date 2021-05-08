import React, { useState, useEffect } from 'react'
import BuddyList from './option-components/BuddyList'
import BuddyPagination from './option-components/BuddyPagination'
import axios from 'axios'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import SoundSelection from './option-components/SoundSelection'

export default function GameOptions() {

    // stuff below here is for buddylist / pagination
    const [pokemon, setPokemon] = useState([])
    const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon")
    const [nextPageUrl, setNextPageUrl] = useState()
    const [prevPageUrl, setPrevPageUrl] = useState()
    const [chooseBuddy, setChooseBuddy] = useState(false)
    const [loading, setLoading] = useState(true)

    //stuff here for picking song YOUTUBE API SUCKS AND HAS LIMITED USES AGHHHH, I WASTED 10 HOURS OF MY LIFE ON THAT STUPID THING
    const [chooseInstrument, setChooseInstrument] = useState(false)

    useEffect(() => {
        setLoading(true)
        let cancel
        axios.get(currentPageUrl, {
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(res => {
            setLoading(false)
            setNextPageUrl(res.data.next)
            setPrevPageUrl(res.data.previous)
            setPokemon(res.data.results)
        })

    
        return () => cancel()
        }, [currentPageUrl])
    
    function gotoNextPage() {
        setCurrentPageUrl(nextPageUrl)
        }
    
    function gotoPrevPage() {
        setCurrentPageUrl(prevPageUrl)
        }

    return (
        <div>
            {chooseBuddy ?
                loading ? <div>Loading Buddies</div> :
                <>
                    <>
                        <BuddyList pokemon={pokemon}/>
                        <BuddyPagination
                            gotoNextPage={nextPageUrl ? gotoNextPage : null}
                            gotoPrevPage={prevPageUrl ? gotoPrevPage : null}
                        />
                    </>
                    <Button className="w-100 mt-3" onClick={() => setChooseBuddy(!chooseBuddy)}>Cancel</Button>
                </>
                : <></>             
            }   
            {chooseInstrument ? 
                loading ? <div>Loading Instrument Samples</div> :
                <>
                    <SoundSelection/>
                    <Button className="w-100 mt-3" onClick={() => setChooseInstrument(!chooseInstrument)}>Cancel</Button>
                </> : <></>
            }
            {!chooseBuddy && !chooseInstrument && 
            <>
                <Button className="w-100 text-center mt-2" onClick={() => setChooseBuddy(!chooseBuddy)}>Choose your buddy!</Button>
                <Button className="w-100 text-center mt-2" onClick={() => setChooseInstrument(!chooseInstrument)}>Choose an instrument to play with!</Button>
            </>
            }
            
            <div className="w-100 text-center mt-2">
            <Link to="/">Back to Main Menu</Link>
            </div>
        </div>
    )
}
