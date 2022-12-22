import "../../style/Card.css"


export default function Card({name, image, temperament, weight}){
    return(
            <div className="card_dog">
                <div className="card_img">
                    <img src={image} alt="img"/>
                </div>
                <div className="card_contain">
                    <h3>{name}</h3>
                    <h5>{temperament}</h5>
                    <p>{weight}</p>
                </div>
            </div>
    )
}