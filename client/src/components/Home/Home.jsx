import "../../style/Home.css"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderByName } from "../../actions";
import { Link } from "react-router-dom";
import { getDogs, getTemperament } from "../../actions";
import Card from "../Card/Card";
import Paginado from "../Paginado/Paginado";
import NavBar from "../NavBar/Nav";


export default function Home (){

    const dispatch = useDispatch();

    const allDogs = useSelector((state) => state.dogs);
    const allTemp = useSelector((state)=> state.temperaments)

    useEffect(()=>{
        if(!allDogs.length && !allTemp.length){
            dispatch(getDogs())
            dispatch(getTemperament())
        }
    }, [])// eslint-disable-line react-hooks/exhaustive-deps


    const [orden, setOrden] = useState("")
    const [actualPage, setActualPage] = useState(1);
    const [dogsPorPage, setDogsPorPage] = useState(8);
    const lastDogsPage = actualPage * dogsPorPage;
    const firstDogsPage = lastDogsPage - dogsPorPage;
    const dogsActual = allDogs.slice(firstDogsPage, lastDogsPage);

    const pagination = (nPagina) =>{
        setActualPage(nPagina)
    }
    function handleSort(e){
        e.preventDefault()
        dispatch(orderByName(e.target.value))
        //setActualPage(1);
        setPageNumber()
        setOrden(`Ordenado${e.target.value}`)
    }

    const setPageNumber = () =>{
        setActualPage(1)
    }

    return(
        <div>
            <NavBar setPageNumber={setPageNumber}/>
            <button><Link to="/create">Crear una nueva Raza</Link></button>
            <Paginado dogsPorPage = {dogsPorPage}
            allDogs = {allDogs.length}
            pagination = {pagination}
            >

            </Paginado>
            <h1>Proyecto Individual DOGS</h1>
            <select onChange={(e)=>handleSort(e)}>
                <option value="asc">Ascendente</option>
                <option value="desc">Descendente</option>
            </select>
            <div className="container">
            {
                dogsActual && dogsActual.map((dog)=>{
                    return(
                            <Card name={dog.name} image={dog.image} temperament={dog.temperament} weight={dog.weight} key={dog.id}></Card>
                        
                    )
                })
            }
            </div>
        </div>
    )
}