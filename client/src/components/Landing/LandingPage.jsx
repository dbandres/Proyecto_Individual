import { Link } from "react-router-dom";
import { getDogs } from "../../actions";
import { useDispatch } from "react-redux";

export default function LandingPage(){
    const dispatch = useDispatch();

    function entrar(){
         dispatch(getDogs())
    }

    return(
        <div>
            <h1>Landing!</h1>
            <Link to="/home">
                <button onClick={entrar}>
                    Entrar
                </button>
            </Link>
        </div>
    )
}