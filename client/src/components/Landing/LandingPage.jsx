import { Link } from "react-router-dom";
import "../../style/Landing.css"
import img from "../../style/assets/dog.png"

export default function LandingPage(){
    return(
        <div className="container_landing">
            <h1 className="title_landing">DOGs PI!</h1>
            <img src={img} alt="img" className="img_landing"/>
            <div className="btn_landing">
            <Link to="/home">
                <button className="bttn">
                    Entrar
                </button>
            </Link>
            </div>
        </div>
    )
}