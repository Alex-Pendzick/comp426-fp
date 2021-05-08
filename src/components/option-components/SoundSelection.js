import React, { useState, useEffect } from 'react'
import axios from "axios"
import SoundButtons from './SoundButtons'

export default function SoundSelection() {
    const[bongos, setBongos] = useState([])
    const[claves, setClaves] = useState([])
    const[maracas, setMaracas] = useState([])

    function getBongos() {
        const promises = []
        //get bongo1
        promises.push(axios.get("https://freesound.org/apiv2/sounds/29803/?fields=previews&token=jM0NdjQb0h7m64VyXWlONt8EKgg1H9sb4WuZ8MoO"))
        //get bongo2
        promises.push(axios.get("https://freesound.org/apiv2/sounds/99752/?fields=previews&token=jM0NdjQb0h7m64VyXWlONt8EKgg1H9sb4WuZ8MoO"))
        //get bongo3
        promises.push(axios.get("https://freesound.org/apiv2/sounds/99753/?fields=previews&token=jM0NdjQb0h7m64VyXWlONt8EKgg1H9sb4WuZ8MoO"))
        //get bongo4
        promises.push(axios.get("https://freesound.org/apiv2/sounds/99754/?fields=previews&token=jM0NdjQb0h7m64VyXWlONt8EKgg1H9sb4WuZ8MoO"))

        Promise.all(promises).then((res) => {
            let tempBongos = []
            for (let i=0;i<res.length;i++){
                tempBongos.push(res[i].data.previews["preview-hq-mp3"])
            }
            setBongos(tempBongos)
        })
    }

    function getClaves() {
        const promises = []
        //get bongo1
        promises.push(axios.get("https://freesound.org/apiv2/sounds/90016/?fields=previews&token=jM0NdjQb0h7m64VyXWlONt8EKgg1H9sb4WuZ8MoO"))
        //get bongo2
        promises.push(axios.get("https://freesound.org/apiv2/sounds/533093/?fields=previews&token=jM0NdjQb0h7m64VyXWlONt8EKgg1H9sb4WuZ8MoO"))
        //get bongo3
        promises.push(axios.get("https://freesound.org/apiv2/sounds/132417/?fields=previews&token=jM0NdjQb0h7m64VyXWlONt8EKgg1H9sb4WuZ8MoO"))
        //get bongo4
        promises.push(axios.get("https://freesound.org/apiv2/sounds/90017/?fields=previews&token=jM0NdjQb0h7m64VyXWlONt8EKgg1H9sb4WuZ8MoO"))

        Promise.all(promises).then((res) => {
            let tempClaves = []
            for (let i=0;i<res.length;i++){
                tempClaves.push(res[i].data.previews["preview-hq-mp3"])
            }
            setClaves(tempClaves)
        })
    }

    function getMaracas() {
        const promises = []
        //get bongo1
        promises.push(axios.get("https://freesound.org/apiv2/sounds/199822/?fields=previews&token=jM0NdjQb0h7m64VyXWlONt8EKgg1H9sb4WuZ8MoO"))
        //get bongo2
        promises.push(axios.get("https://freesound.org/apiv2/sounds/432205/?fields=previews&token=jM0NdjQb0h7m64VyXWlONt8EKgg1H9sb4WuZ8MoO"))
        //get bongo3
        promises.push(axios.get("https://freesound.org/apiv2/sounds/385839/?fields=previews&token=jM0NdjQb0h7m64VyXWlONt8EKgg1H9sb4WuZ8MoO"))
        //get bongo4
        promises.push(axios.get("https://freesound.org/apiv2/sounds/99841/?fields=previews&token=jM0NdjQb0h7m64VyXWlONt8EKgg1H9sb4WuZ8MoO"))

        Promise.all(promises).then((res) => {
            let tempMaracas = []
            for (let i=0;i<res.length;i++){
                tempMaracas.push(res[i].data.previews["preview-hq-mp3"])
            }
            setMaracas(tempMaracas)
        })
    }

    useEffect(()=> {
        getBongos()
        getClaves()
        getMaracas()
    }, [])

    return (
        <div>
            <h2 className="w-100 text-center mt-2">Select a Sound!</h2>
            {(bongos!==undefined) ?
                <>
                     <SoundButtons instrument="Bongo" sounds={bongos}></SoundButtons>
                </> :
                <p>Loading Bongos</p>
            }
            {(claves!==undefined) ?
                <>
                     <SoundButtons instrument="Clave" sounds={claves}></SoundButtons>
                </> :
                <p>Loading Claves</p>
            }
            {(maracas!==undefined) ?
                <>
                     <SoundButtons instrument="Maraca" sounds={maracas}></SoundButtons>
                </> :
                <p>Loading Maracas</p>
            }
        </div>
    )
}
