import { Link } from "react-router-dom";
import { getDogs, getTemperament } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import "../../style/Landing.css"
import img from "../../style/assets/dog.png"
import { useEffect } from "react";

export default function LandingPage(){
    const dispatch = useDispatch();

    const allDogs = useSelector((state) => state.dogs);
    const allTemp = useSelector((state)=> state.temperaments)

    useEffect(()=>{
        if(!allDogs.length && !allTemp.length){
            dispatch(getDogs())
            dispatch(getTemperament())
        }
    }, [])// eslint-disable-line react-hooks/exhaustive-deps
    

    return(
        <div className="container_landing">
            <h1 className="title_landing">DOGs PI!</h1>
            <img src={img} alt="img" className="img_landing"/>
            <div className="btn_landing">
            <Link to="/home">
                <button>
                    Entrar
                </button>
            </Link>
            </div>
        </div>
    )
}