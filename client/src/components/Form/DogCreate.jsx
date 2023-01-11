import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useHistory } from "react-router-dom"
import { createDog, getDogs, getTemperament } from "../../actions"
import "../../style/Form.css"

const expresiones = {
    nombre: /^[A-Za-z\s]*$/,
    numero: /^\d+$/,
    URL : /^https?:\/\/.*\/.*\.(png|gif|webp|jpeg|jpg)\??.*$/gmi
}

function validateNameUrlTemp(input){
    let errors = {}
    if(!input.name){
        errors.name = "Campo Requerido"
    }else if(!input.name.match(expresiones.nombre)){
        errors.name = "Dato Incorrecto"
    }

    if(!input.image){
        errors.image = "URL Requerida"
    }else if(!input.image.match(expresiones.URL)){
        errors.image = "Dato Incorrecto"
    }

    return errors;
}

function validate(peso){
    let errors = {}
    let n;
    if(!peso.pesoMin){
        errors.pesoMin = "Campo Requerido"
    }
    else if(!peso.pesoMin.match(expresiones.numero)){
        errors.pesoMin = "Dato incorrecto"
    }

    if(!peso.pesoMax){
        errors.pesoMax = "Campo Requerido"
    }else if(peso.pesoMax <= peso.pesoMin){
        errors.pesoMax = "El Peso Maximo NO puede ser MENOR o IGUAL al Peso Minimo"
    }
    else if(!peso.pesoMax.match(expresiones.numero)){
        errors.pesoMax = "Dato Incorrecto"
    }
    return errors;
}

function validateAlt(alt){
    let errors = {}
    if(!alt.altMin){
        errors.altMin = "Campo Requerido"
    }
    else if(!alt.altMin.match(expresiones.numero)){
        errors.altMin = "Dato incorrecto"
    }

    if(!alt.altMax){
        errors.altMax = "Campo Requerido"
    }else if(alt.altMax <= alt.altMin){
        errors.altMax = "La Altura Maxima NO puede ser MENOR o IGUAL a la Altura Minima"
    }
    else if(!alt.altMax.match(expresiones.numero)){
        errors.altMax = "Dato Incorrecto"
    }
    return errors;
}

function validateLife(life){
    let errors = {}
    if(!life.lifeMin){
        errors.lifeMin = "Campo Requerido"
    }
    else if(!life.lifeMin.match(expresiones.numero)){
        errors.lifeMin = "Dato incorrecto"
    }

    if(!life.lifeMax){
        errors.lifeMax = "Campo Requerido"
    }else if(life.lifeMax <= life.lifeMin){
        errors.lifeMax = "La Altura Maxima NO puede ser MENOR o IGUAL a la Altura Minima"
    }
    else if(!life.lifeMax.match(expresiones.numero)){
        errors.lifeMax = "Dato incorrecto"
    }
    return errors
}


export default function DogCreate(){
    
    const dispatch = useDispatch()
    const history = useHistory()
    const temperaments = useSelector((state) => state.temperaments)

    const [button, setButton] = useState(1)
    const [btnCrear, setBtnCrear] = useState(1)

    const[errosPeso, setErrorsPeso] = useState({})
    const [errorsAlt, setErrorsAlt] = useState({})
    const [errorsLife, setErrorsLife] = useState({})
    const [errors, setErrors] = useState({})

    useEffect(()=>{
        dispatch(getTemperament())
    }, [])// eslint-disable-line react-hooks/exhaustive-deps


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
            console.log(peso.pesoMax)
            setErrorsPeso(validate({
                ...peso,
                [e.target.name] : e.target.value
            }))
        }
        else if(e.target.name === "altMin" || e.target.name === "altMax"){
            setAlt({
                ...alt,
                [e.target.name] : e.target.value
            })
            setErrorsAlt(validateAlt({
                ...alt,
                [e.target.name] : e.target.value
            }))
        }
        else if(e.target.name === "lifeMin" || e.target.name === "lifeMax"){
            setLife({
                ...life,
                [e.target.name] : e.target.value
            })
            setErrorsLife(validateLife({
                ...life,
                [e.target.name] : e.target.value
            }))
        }
        // if(!errosPeso.hasOwnProperty("pesoMax") || errosPeso.hasOwnProperty("pesoMin")){
        //         console.log("Tenemos error: ")
        //         setButton(1)
        //     }else setButton(0)
        
        //console.log(Object.values(errosPeso))
    }

    useEffect(()=>{
        // if(Object.entries(errosPeso).length){
        //     //console.log("SI")
        //     setButton(1)
        // }
        // else if(Object.entries(errorsAlt).length){
        //     setButton(1)
        // }
        // else if(Object.entries(errorsLife).length){
        //     setButton(1)
        // }
        // else setButton(0)
        if(Object.entries(errosPeso).length || Object.entries(errorsAlt).length || Object.entries(errorsLife).length){
            setButton(1)
        }
        else setButton(0)

        if(input.name.length > 0 && input.height.length > 0 && input.image.length > 0 && input.weight.length > 0 && input.temperament.length > 0){
            setBtnCrear(0)
        }else setBtnCrear(1)
    },[errosPeso, alt, life, input,setButton, setBtnCrear])

    //useEffect(()=>{
        // if(input.name.length > 0 && input.height.length > 0 && input.image.length > 0 && input.weight.length > 0 && input.temperament.length > 0){
        //     setBtnCrear(0)
        // }else setBtnCrear(1)
    //},[input, setBtnCrear])

    //console.log((errosPeso.hasOwnProperty("pesoMax")))
    //console.log("esto es btn: ", button)
    //console.log(Object.entries(errosPeso))

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(validateNameUrlTemp({
            ...input,
            [e.target.name] : e.target.value
        }))
        
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
            <div className="form">
            <form onSubmit={handleSubmit} className="formulario">
            <h1 className="title_form">Crea tu propia Raza de Perro</h1>
                <div className="input_img input">
                    <label htmlFor="">Imagen URL: </label>
                        <input 
                        type="text" 
                        value={input.image}
                        name="image"
                        onChange={ (e)=>handleChange(e)}
                        />
                        {
                            errors.image && (
                                <p>{errors.image}</p>
                            )
                        }
                </div>
                <div className="input_name input">
                    <label htmlFor="">Nombre: </label>
                    <input 
                    type="text" 
                    value={input.name}
                    name="name"
                    onChange={ (e)=>handleChange(e)}
                    />
                    {
                        errors.name &&(
                            <p>{errors.name}</p>
                        )
                    }
                </div>
                <div className="input_Wm input">
                    <label htmlFor="">Weight Min: </label>
                    <input 
                    type="text" 
                    value={peso.pesoMin}
                    name="pesoMin"
                    onChange={ (e)=>handleChangeAtributes(e)}
                    />
                    {
                        errosPeso.pesoMin && (
                            <p>{errosPeso.pesoMin}</p>
                        )
                    }
                </div>
                <div className="input_Wm input">
                    <label htmlFor="">Weight Max: </label>
                    <input 
                    type="text" 
                    value={peso.pesoMax}
                    name="pesoMax"
                    onChange={ (e)=>handleChangeAtributes(e)}
                    />
                    {
                        errosPeso.pesoMax && (
                            <p>{errosPeso.pesoMax}</p>
                        )
                    }
                </div>
                <div className="input_Hmin input">
                    <label htmlFor="">Height Min: </label>
                    <input 
                    type="text" 
                    value={alt.altMin}
                    name="altMin"
                    onChange={ (e)=>handleChangeAtributes(e)}
                    />
                    {
                        errorsAlt.altMin && (
                            <p>{errorsAlt.altMin}</p>
                        )
                    }
                </div>
                <div className="input_Hmax input">
                    <label htmlFor="">Height Max: </label>
                    <input 
                    type="text" 
                    value={alt.altMax}
                    name="altMax"
                    onChange={ (e)=>handleChangeAtributes(e)}
                    />
                    {
                        errorsAlt.altMax && (
                            <p>{errorsAlt.altMax}</p>
                        )
                    }
                </div>
                <div className="input_Lmin input">
                    <label htmlFor="">Life Min: </label>
                    <input 
                    type="text" 
                    value={life.lifeMin}
                    name="lifeMin"
                    onChange={ (e)=>handleChangeAtributes(e)}
                    />
                    {
                       errorsLife.lifeMin && (
                        <p>{errorsLife.lifeMin}</p>
                       ) 
                    }
                </div>
                <div className="input_Lmax input">
                    <label htmlFor="">Life Max: </label>
                    <input 
                    type="text" 
                    value={life.lifeMax}
                    name="lifeMax"
                    onChange={ (e)=>handleChangeAtributes(e)}
                    />
                    {
                       errorsLife.lifeMax && (
                        <p>{errorsLife.lifeMax}</p>
                       ) 
                    }
                </div>
                <div className="input_temp ">
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
                
                
                <button onClick={(e => handleCargar(e))} disabled={button} className="btn_formVolver">Cargar Datos</button>
                <br />
                <button type="submit" disabled={btnCrear} className="btn_formVolver">Crear Raza</button>
            </form>
            </div>
            <div className="vista_previa">
                <div className="vista_card">
                {
                    input.image && (
                        <div className="vista_img">
                            <img src={input.image} alt="img" />
                        </div>
                    )
                }
                {
                    input.name && (
                        <div className="vista_name vista">
                            <h1> Nombre de Raza : {input.name}</h1>
                        </div>
                    )
                }
                {
                    input.weight && (
                        <div className="vista_peso">
                            <h4> Peso: {input.weight}</h4>
                        </div>
                    )
                }
                {
                    input.height && (
                        <div className="vista_alt">
                            <h4> Altura : {input.height}</h4>
                        </div>
                    )
                }
                {
                    input.life && (
                        <div className="vista_life">
                            <h4> Vida : {input.life}</h4>
                        </div>
                    )
                }
                <div className="temp_class">
                {
                    input.temperament && input.temperament.map(t =>{
                        return(
                            <div className="list_temp">
                                <p>{t}</p>
                                <button onClick={()=> handleDelete(t)}>X</button>
                            </div>
                        )
                    })
                }
                </div>
                </div>
            </div> 
            <button className="btn_formVolver volver"><Link to="/home">Volver...</Link></button>           
        </div>
        
    )
}