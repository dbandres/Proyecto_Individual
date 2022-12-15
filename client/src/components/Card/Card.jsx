
export default function Card({name, image, temperament, weight}){
    return(
        <div>
            <img src={image} alt="img" width="300px" height="250px"/>
            <h3>{name}</h3>
            <h5>{temperament}</h5>
            <p>{weight}</p>
        </div>
    )
}