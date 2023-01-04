import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { dogDetail } from "../../actions";
import "../../style/Detail.css"


export default function Detail(props){
    console.log(props)
    const dispatch = useDispatch() 

    useEffect(()=>{
        dispatch(dogDetail(props.match.params.id))
    },[dispatch])

    const details = useSelector((state)=> state.details)

    return(
        <div className="detail_container">
            {
                details.length >0 ?
                <div key={details[0].id} className="div_detail">
                    <img src={details[0].image} alt="img" />
                    <h1> Raza : {details[0].name}</h1>
                    <h3> Temperamentos :  {details[0].temperament}</h3>
                    <p> Altura :  {details[0].height}</p>
                    <p> Peso :  {details[0].weight}</p>
                    <p> Vida : {details[0].life_span ? details[0].life_span : details[0].life}</p>
                </div> : 
                <p>Loading .... </p>
            }
            <Link to="/home">VOLVER..</Link>
        </div>
    )
}