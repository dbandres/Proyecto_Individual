import { Link } from "react-router-dom";
import { getDogs, getTemperament } from "../../actions";
import { useDispatch } from "react-redux";
import "../../style/Landing.css"
import img from "../../style/assets/dog.png"

export default function LandingPage(){
    const dispatch = useDispatch();

    function entrar(){
        dispatch(getDogs())
        dispatch(getTemperament())
    }
    
    return(
        <div className="container_landing">
            <h1 className="title_landing">DOGs PI!</h1>
            <img src={img} alt="img" className="img_landing"/>
            <div className="btn_landing">
            <Link to="/home">
                <button onClick={entrar}>
                    Entrar
                </button>
            </Link>
            </div>
        </div>
    )
}