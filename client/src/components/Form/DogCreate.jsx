import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useHistory } from "react-router-dom"
import { createDog, getDogs, getTemperament } from "../../actions"
import "../../style/Form.css"


const validation = (input, peso, alt, life) => {
    let errors = {}
    if(!input.name){
        errors.name = "El campo Nombre es obligatorio, no puede contener numeros"
    }
    if(!peso.pesoMin || !peso.pesoMax){
        errors.weight = "El campo Peso es requerido, el valor minimo no puede ser mayor al valor maximo"
    }
    if(!alt.altMin || !alt.altMax){
        errors.height = "El campo Altura es requerido, el valor minimo no puede ser mayor al valor maximo"
    }
    if(!life.lifeMin || !life.lifeMax){
        errors.life = "El campo Vida es requerido, el valor minimo no puede ser mayor al valor maximo"
    }
    return errors;
}



export default function DogCreate(){
    
    const dispatch = useDispatch()
    const history = useHistory()
    const temperaments = useSelector((state) => state.temperaments)

    const [button, setButton] = useState(false);
    const [errors, setErrors] = useState({
        name: "",
        temperament : [],
        image : "",
        pesoMin: "",
        pesoMax: "",
        altMin: "",
        altMax: "",
        lifeMin: "",
        lifeMax: ""
    })

    useEffect(()=>{
        dispatch(getTemperament())
    }, [])// eslint-disable-line react-hooks/exhaustive-deps

    const expresiones = {
        nombre: /^[a-zA-ZÁ-ÿ\s]{1,40}$/,
        numero: /^[0-9]+$/
    }

    const [peso, setPeso] = useState({
        pesoMin: "",
        pesoMax: ""
    })

    const [alt, setAlt] = useState({
        altMin: "",
        altMax: ""
    })

    const [life, setLife] = useState({
        lifeMin: "",
        lifeMax: ""
    })

    const [input, setInput] = useState({
        name : "",
        height : "",
        weight: "",
        life : "",
        temperament : [],
        image : ""
    })

    function handleChangeAtributes(e){
        if(e.target.name === "pesoMin" || e.target.name === "pesoMax"){
            setPeso({
                ...peso,
                [e.target.name] : e.target.value
            })
        }
        else if(e.target.name === "altMin" || e.target.name === "altMax"){
            setAlt({
                ...alt,
                [e.target.name] : e.target.value
            })
        }
        else if(e.target.name === "lifeMin" || e.target.name === "lifeMax"){
            setLife({
                ...life,
                [e.target.name] : e.target.value
            })
        }
    }

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


    function handleCargar(e){
        e.preventDefault()
        setInput({
            ...input,
            weight: `${peso.pesoMin} - ${peso.pesoMax}`,
            height: `${alt.altMin} - ${alt.altMax}`,
            life: `${life.lifeMin} - ${life.lifeMax}`
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
    //console.log(input)

    

    return(
        <div className="form_container">
            <Link to="/home">Volver...</Link>
            <h1>Crea tu propia Raza de Perro</h1>
            <form onSubmit={handleSubmit} className="formulario">
                <div>
                    <label htmlFor="">Nombre: </label>
                    <input 
                    type="text" 
                    value={input.name}
                    name="name"
                    onChange={ (e)=>handleChange(e)}
                    />
                </div>
                <div>
                    <label htmlFor="">Weight Min: </label>
                    <input 
                    type="text" 
                    value={peso.pesoMin}
                    name="pesoMin"
                    onChange={ (e)=>handleChangeAtributes(e)}
                    />
                </div>
                <div>
                    <label htmlFor="">Weight Max: </label>
                    <input 
                    type="text" 
                    value={peso.pesoMax}
                    name="pesoMax"
                    onChange={ (e)=>handleChangeAtributes(e)}
                    />
                </div>

                <div>
                    <label htmlFor="">Height Min: </label>
                    <input 
                    type="text" 
                    value={alt.altMin}
                    name="altMin"
                    onChange={ (e)=>handleChangeAtributes(e)}
                    />
                </div>
                <div>
                    <label htmlFor="">Height Max: </label>
                    <input 
                    type="text" 
                    value={alt.altMax}
                    name="altMax"
                    onChange={ (e)=>handleChangeAtributes(e)}
                    />
                </div>
                <div>
                    <label htmlFor="">Life Min: </label>
                    <input 
                    type="text" 
                    value={life.lifeMin}
                    name="lifeMin"
                    onChange={ (e)=>handleChangeAtributes(e)}
                    />
                </div>
                <div>
                    <label htmlFor="">Life Max: </label>
                    <input 
                    type="text" 
                    value={life.lifeMax}
                    name="lifeMax"
                    onChange={ (e)=>handleChangeAtributes(e)}
                    />
                </div>
                <button onClick={(e => handleCargar(e))}>Cargar</button>
                <div>
                    <label htmlFor="">Imagen URL: </label>
                    <input 
                    type="text" 
                    value={input.image}
                    name="image"
                    onChange={ (e)=>handleChange(e)}
                    />
                </div>
                <div>
                    <label htmlFor="">Temperamentos: </label>
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