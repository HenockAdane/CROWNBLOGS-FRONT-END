import React from 'react'
import {useParams} from "react-router-dom"

function Example() {

    const {a,b} = useParams()

    console.log(a)

    return (
        <div>



        <h1>EXAMPLE</h1>
        <h1>PARAMS A: {a}</h1>
        <h1>PARAMS B: {b}</h1>
            
        </div>
    )
}

export default Example
