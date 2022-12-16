
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs } from "../../actions";
import { Link } from "react-router-dom";
import Card from "../Card/Card";


export default function Home (){

    const dispatch = useDispatch()
    const allDogs = useSelector((state) => state.dogs)

    return(
        <div>
            <button><Link to="/create">Crear una nueva Raza</Link></button>
            <h1>Proyecto Individual DOGS</h1>
            {
                allDogs && allDogs.map((dog)=>{
                    
                    if(typeof dog.temperament === "undefined"){
                        let id = dog.id
                        if(id.length > 4) console.log("si")
                    }
                    return(
                        <Card name={dog.name} image={dog.image} temperament={dog.temperament} weight={dog.weight} key={dog.id}></Card>
                    )
                })
            }
        </div>
    )
}