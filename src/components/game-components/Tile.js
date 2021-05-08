import React from 'react'
import { FaArrowCircleLeft, FaArrowCircleUp,  FaArrowCircleDown, FaArrowCircleRight, FaRegArrowAltCircleLeft, FaRegArrowAltCircleUp, FaRegArrowAltCircleDown, FaRegArrowAltCircleRight } from 'react-icons/fa';
import { IconContext } from 'react-icons'

export default function Tile({ value, index, row }) {

    return (
        <>
            {{
                //checks the rows for what arrow, then if 1 or zer ofor icon, then if last index for not outlined
                0: {
                        0: <p></p>,
                        1: {
                            0:  <IconContext.Provider value={{ size:"40px", color: "green"}}>
                                    <FaRegArrowAltCircleLeft/>
                                </IconContext.Provider>,
                            1:  <IconContext.Provider value={{ size:"40px", color: "green"}}>
                                    <FaRegArrowAltCircleLeft/>
                                </IconContext.Provider>,
                            2:  <IconContext.Provider value={{ size:"40px", color: "green"}}>
                                    <FaRegArrowAltCircleLeft/>
                                </IconContext.Provider>,
                            3:  <IconContext.Provider value={{ size:"40px", color: "green"}}>
                                    <FaRegArrowAltCircleLeft/>
                                </IconContext.Provider>,
                            4:  <IconContext.Provider value={{ size:"40px", color: "green"}}>
                                    <FaRegArrowAltCircleLeft/>
                                </IconContext.Provider>,
                            5: <IconContext.Provider value={{ size:"40px", color: "green"}}>
                                    <FaArrowCircleLeft/>
                                </IconContext.Provider>,
                            }[index]
                }[value],

                1: {
                    0: <p></p>,
                    1: {
                        0:  <IconContext.Provider value={{ size:"40px", color: "red"}}>
                                <FaRegArrowAltCircleUp/>
                            </IconContext.Provider>,
                        1:  <IconContext.Provider value={{ size:"40px", color: "red"}}>
                                <FaRegArrowAltCircleUp/>
                            </IconContext.Provider>,
                        2:  <IconContext.Provider value={{ size:"40px", color: "red"}}>
                                <FaRegArrowAltCircleUp/>
                            </IconContext.Provider>,
                        3:  <IconContext.Provider value={{ size:"40px", color: "red"}}>
                                <FaRegArrowAltCircleUp/>
                            </IconContext.Provider>,
                        4:  <IconContext.Provider value={{ size:"40px", color: "red"}}>
                                <FaRegArrowAltCircleUp/>
                            </IconContext.Provider>,
                        5:  <IconContext.Provider value={{ size:"40px", color: "red"}}>
                                <FaArrowCircleUp/>
                            </IconContext.Provider>,
                        }[index]
                    }[value],

                2: {
                    0: <p></p>,
                    1: {
                        0:  <IconContext.Provider value={{ size:"40px", color: "yellow"}}> 
                                <FaRegArrowAltCircleDown/>
                            </IconContext.Provider>,
                        1:  <IconContext.Provider value={{ size:"40px", color: "yellow"}}> 
                                <FaRegArrowAltCircleDown/>
                            </IconContext.Provider>,
                        2:  <IconContext.Provider value={{ size:"40px", color: "yellow"}}> 
                                <FaRegArrowAltCircleDown/>
                            </IconContext.Provider>,
                        3:  <IconContext.Provider value={{ size:"40px", color: "yellow"}}> 
                                <FaRegArrowAltCircleDown/>
                            </IconContext.Provider>,
                        4:  <IconContext.Provider value={{ size:"40px", color: "yellow"}}> 
                                <FaRegArrowAltCircleDown/>
                            </IconContext.Provider>,
                        5:   <IconContext.Provider value={{ size:"40px", color: "yellow"}}> 
                                <FaArrowCircleDown/>
                            </IconContext.Provider>,
                        }[index]
                    }[value],

                3: {
                    0: <p></p>,
                    1: {
                        0:  <IconContext.Provider value={{ size:"40px", color: "blue"}}>
                                <FaRegArrowAltCircleRight/>
                            </IconContext.Provider>,
                        1:  <IconContext.Provider value={{ size:"40px", color: "blue"}}>
                                <FaRegArrowAltCircleRight/>
                            </IconContext.Provider>,
                        2:  <IconContext.Provider value={{ size:"40px", color: "blue"}}>
                                <FaRegArrowAltCircleRight/>
                            </IconContext.Provider>,
                        3:   <IconContext.Provider value={{ size:"40px", color: "blue"}}>
                                <FaRegArrowAltCircleRight/>
                            </IconContext.Provider>,
                        4:  <IconContext.Provider value={{ size:"40px", color: "blue"}}>
                                <FaRegArrowAltCircleRight/>
                            </IconContext.Provider>,
                        5:  <IconContext.Provider value={{ size:"40px", color: "blue"}}>
                                <FaArrowCircleRight/>
                            </IconContext.Provider>,
                        }[index]
                    }[value],
                
                }[row]
            }
            
        </>
    )
}
