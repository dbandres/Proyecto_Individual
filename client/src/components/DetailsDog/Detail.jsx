import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { dogDetail, deleteDogDb } from "../../actions";
import "../../style/Detail.css"
import NotFound from "../notFound/notFound";


export default function Detail(props){
    console.log(props)
    const dispatch = useDispatch()
    const {id} = useParams()
    const [removed, setRemoved] = useState(false)

    useEffect(()=>{
        dispatch(dogDetail(id))
    },[id, dispatch])

    function handleDelete(){
        dispatch(deleteDogDb(id))
        setRemoved(true)
    }

    const details = useSelector((state)=> state.details)

    return(
        <div className="detail_container">
            {
                details.length >0 ?
                <div key={details[0].id} className="div_detail">
                    <div className="detail_name">
                        <img src={details[0].image} alt="img" />
                        <h1> Raza : {details[0].name}</h1>
                    </div>
                    <div className="detail_temp">
                        <h3> Temperamentos :  {details[0].temperament}</h3>
                    </div>
                    <div className="detail_dog">
                        <p> Altura :  {details[0].height}</p>
                        <p> Peso :  {details[0].weight}</p>
                        <p> Vida : {details[0].life_span ? details[0].life_span : details[0].life}</p>
                    </div>
                </div> : 
                <NotFound></NotFound>
            }
            <div>
                {
                    id.length > 3 &&
                    <button onClick={handleDelete}>Eliminar Raza</button>
                }
                {
                    removed&&
                    <div>
                        <h1>La Raza fue eliminada de la Base de Datos</h1>
                    </div>
                }
            </div>
            <Link to="/home">VOLVER..</Link>
        </div>
    )
}