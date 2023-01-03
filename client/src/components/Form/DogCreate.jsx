import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useHistory } from "react-router-dom"
import { createDog, getDogs, getTemperament } from "../../actions"


export default function DogCreate(){
    
    const dispatch = useDispatch()
    const history = useHistory()
    const temperaments = useSelector((state) => state.temperaments)

    const [peso, setPeso] = useState({
        pesoMin: "",
        pesoMax: ""
    })

    function handleChangePeso(e){
        setPeso({
            ...peso,
            [e.target.name] : e.target.value
        })
    }

    const [input, setInput] = useState({
        name : "",
        height : "",
        weight : peso,
        life : "",
        temperament : [],
        image : ""
    })

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
    }

    function handleSelect(e){
        setInput({
            ...input,
            temperament: [...input.temperament, e.target.value]
        })
    }

    function handleDelete(t){
        setInput({
            ...input,
            temperament: input.temperament.filter(temp => temp !== t)
        })
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(createDog(input))
        alert("Raza de perro CREADA")
        setInput({
            name : "",
            height : "",
            weight : "",
            life : "",
            temperament : [],
            image : ""
        })
        dispatch(getDogs())
        history.push("/home")
    }
    console.log(input)

    useEffect(()=>{
        dispatch(getTemperament())
    }, [])// eslint-disable-line react-hooks/exhaustive-deps

    return(
        <div>
            <Link to="/home">Volver...</Link>
            <h1>Crea tu propia Raza de Perro</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="">Nombre</label>
                    <input 
                    type="text" 
                    value={input.name}
                    name="name"
                    onChange={ (e)=>handleChange(e)}
                    />
                </div>
                <div>
                    <label htmlFor="">Height</label>
                    <input 
                    type="text" 
                    value={input.height}
                    name="height"
                    onChange={ (e)=>handleChange(e)}
                    />
                </div>
                {/* <div>
                    <label htmlFor="">Weight</label>
                    <input 
                    type="text" 
                    value={input.weight}
                    name="weight"
                    onChange={ (e)=>handleChange(e)}
                    />
                </div> */}
                <div>
                    <label htmlFor="">Weight Min</label>
                    <input 
                    type="text" 
                    value={peso.pesoMin}
                    name="pesoMin"
                    onChange={ (e)=>handleChangePeso(e)}
                    />
                </div>
                <div>
                    <label htmlFor="">Weight Max</label>
                    <input 
                    type="text" 
                    value={peso.pesoMax}
                    name="pesoMax"
                    onChange={ (e)=>handleChangePeso(e)}
                    />
                </div>
                <div>
                    <label htmlFor="">Life</label>
                    <input 
                    type="text" 
                    value={input.life}
                    name="life"
                    onChange={ (e)=>handleChange(e)}
                    />
                </div>
                <div>
                    <label htmlFor="">Imagen</label>
                    <input 
                    type="text" 
                    value={input.image}
                    name="image"
                    onChange={ (e)=>handleChange(e)}
                    />
                </div>
                <div>
                    <label htmlFor="">Temperamentos</label>
                    <select onChange={(e)=>handleSelect(e)}>
                        <option value="">Seleccione una opcion</option>
                        {
                            temperaments && temperaments.map((temp)=>{
                                return(
                                    <option value={temp.name}>{temp.name}</option>
                                )
                            })
                        }
                    </select>
                    
                </div>
                <button type="submit" >Crear Raza</button>
            </form>
            {
                        input.temperament.map(t =>{
                            return(
                                <div>
                                    <p>{t}</p>
                                    <button onClick={()=> handleDelete(t)}>X</button>
                                </div>
                            )
                        })
            }
        </div>
    )

}