import "../../style/Home.css"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderByName } from "../../actions";
import { Link } from "react-router-dom";
import { getDogs, getTemperament, oderByWeight } from "../../actions";
import Card from "../Card/Card";
import Paginado from "../Paginado/Paginado";
import NavBar from "../NavBar/Nav";
import axios from "axios";
import NotFound from "../notFound/notFound";


export default function Home (){

    const dispatch = useDispatch();

    const allDogs = useSelector((state) => state.dogs);
    const allTemp = useSelector((state)=> state.temperaments)

    useEffect(()=>{
        if(!allDogs.length && !allTemp.length){
            dispatch(getDogs())
            dispatch(getTemperament())
        }
    },[])// eslint-disable-line react-hooks/exhaustive-deps


    // let sinTemp = allDogs.filter(dog => dog.temperament)
    // console.log(sinTemp.length)
    // console.log(allDogs.length)

    const [orden, setOrden] = useState("")
    const [query, setQuery] = useState("")
    const [dataDogs, setDataDogs] = useState([])
    const [actualPage, setActualPage] = useState(1);
    const [dogsPorPage, setDogsPorPage] = useState(8);
    const lastDogsPage = actualPage * dogsPorPage;
    const firstDogsPage = lastDogsPage - dogsPorPage;
    const dogsActual = allDogs.slice(firstDogsPage, lastDogsPage);
    const dogsName = dataDogs.slice(firstDogsPage, lastDogsPage)

    const pagination = (nPagina) =>{
        setActualPage(nPagina)
    }
    function handleSort(e){
        e.preventDefault()
        dispatch(orderByName(e.target.value))
        setActualPage(1);
        setOrden(`Ordenado${e.target.value}`)
    }

    function handleSortWeight(e){
        e.preventDefault()
        setActualPage(1)
        dispatch(oderByWeight(e.target.value))
        setOrden(`Ordenado${e.target.value}`)
    }

    useEffect(()=>{
        const fetchDogs = async() =>{
            const res = await axios.get(`http://localhost:3001/dogs?name=${query}`)
            setDataDogs(res.data)
        }
        fetchDogs()
        //setDogsPorPage()
        setPageNumber()
        //console.log(dataDogs)
    }, [query])

    const setPageNumber = () =>{
        setActualPage(1)
    }

    return(
        <div>
            <NavBar setPageNumber={setPageNumber}/>
            <div className="crear_raza">
                    <button className="btn_home"><Link to="/create">Crear una nueva Raza</Link></button>
            </div>
            <div className="filter_container">
                <div className="search_home">
                    <h4>Buscador</h4>
                    <input type="text" placeholder="Buscar" onChange={(e) => setQuery(e.target.value)}/>
                </div>
            <div className="ordenABC_home">
                <h4>Orden Alfabetico</h4>
                    <select onChange={(e)=>handleSort(e)}>
                        <option value="all">Seleccione una opcion</option>
                        <option value="asc">Ascendente</option>
                        <option value="desc">Descendente</option>
                    </select>
            </div>
                <div className="orden_peso">
                    <h4>Peso..</h4> 
                    <select onChange={(e) => handleSortWeight(e)}>
                        <option value="all">Seleccione una opcion</option>
                        <option value="asc">Peso Ascendente</option>
                        <option value="desc">Peso descendente</option>
                    </select>
                </div>
            </div>
            <div className="container">
            {
                query ? dogsName.map((dog)=>{
                    return(
                        <Link to={"/dog-detail/"+dog.id}>
                            <Card name={dog.name} image={dog.image} temperament={dog.temperament} weight={dog.weight} key={dog.id}></Card>
                        </Link>
                    
                )
                }): 
                dogsActual.length === 0 || dogsName.length === 0? <NotFound></NotFound> 
                : dogsActual.map((dog)=>{
                    return(
                        <Link to={"/dog-detail/"+dog.id}>
                            <Card name={dog.name} image={dog.image} temperament={dog.temperament} weight={dog.weight} key={dog.id}></Card>
                        </Link>
                        
                    )                
                })
            }
            </div>
            <Paginado dogsPorPage = {dogsPorPage}
            allDogs = {query ? dataDogs.length : allDogs.length}
            pagination = {pagination}
            actualPage = {actualPage}
            >
            </Paginado>
        </div>
    )
}