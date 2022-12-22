import "../../style/Home.css"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs } from "../../actions";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import Paginado from "../Paginado/Paginado";
import NavBar from "../NavBar/Nav";

export default function Home (){

    const allDogs = useSelector((state) => state.dogs);
    const [actualPage, setActualPage] = useState(1);
    const [dogsPorPage, setDogsPorPage] = useState(8);
    const lastDogsPage = actualPage * dogsPorPage;
    const firstDogsPage = lastDogsPage - dogsPorPage;
    const dogsActual = allDogs.slice(firstDogsPage, lastDogsPage);

    const pagination = (nPagina) =>{
        setActualPage(nPagina)
    }

    return(
        <div>
            <NavBar></NavBar>
            <button><Link to="/create">Crear una nueva Raza</Link></button>
            <Paginado dogsPorPage = {dogsPorPage}
            allDogs = {allDogs.length}
            pagination = {pagination}
            >

            </Paginado>
            <h1>Proyecto Individual DOGS</h1>
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