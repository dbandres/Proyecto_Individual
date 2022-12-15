
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs } from "../../actions";
import { Link } from "react-router-dom";
import Card from "../Card/Card";


export default function Home (){

    const dispatch = useDispatch()
    const allDogs = useSelector((state) => state.dogs)

    useEffect(()=>{
        dispatch(getDogs())
    }, [dispatch])

    function handleClick(e){
        e.prevent.default()
        dispatch(getDogs())
    }

    return(
        <div>
            <Link to="/create">Crear una nueva Raza</Link>
            <h1>Proyecto Individual DOGS</h1>
            <button onClick={e => {handleClick(e)}}>Volver a cargar...</button>
            {
                allDogs && allDogs.map((dog)=>{
                    return(
                        <Card name={dog.name} image={dog.image} temperament={dog.temperament} weight={dog.weight}></Card>
                    )
                })
            }
        </div>
    )
}