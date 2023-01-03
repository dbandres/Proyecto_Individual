import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { dogDetail } from "../../actions";


export default function Detail(props){
    console.log(props)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(dogDetail(props.match.params.id))
    },[dispatch])

    const details = useSelector((state)=> state.details)

    return(
        <div>
            {
                details.length >0 ?
                <div>
                    <img src={details[0].image} alt="img" />
                    <h1>{details[0].name}</h1>
                    <h3>{details[0].temperament}</h3>
                    <p>{details[0].height}</p>
                    <p>{details[0].weight}</p>
                    <p>{details[0].life_span ? details[0].life_span : details[0].life}</p>
                </div> : 
                <p>Loading .... </p>
            }
            <Link to="/home">VOLVER..</Link>
        </div>
    )
}