import React from 'react'
import { Table } from 'react-bootstrap'
import Tile from './Tile'
import "./Board.css"

export default function Board( {gameBoard}) {

    return (
        <div>
            <Table striped bordered variant="dark">
                <tbody>
                    {gameBoard.map((row, index) => 
                            <tr key={index}> 
                                {row.map((value, indix) => <td key={indix}><Tile value={value} index={indix} row={index} key={indix}></Tile></td>) }                                           
                            </tr>
                    )}
                </tbody>
            </Table>   
        </div>
    )
}
