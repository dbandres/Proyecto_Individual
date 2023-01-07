import "../../style/Nav.css"
import { filterByTemp, filterCreated} from "../../actions"
import { useDispatch, useSelector } from "react-redux"

export default function NavBar({setPageNumber}){
    
    const dispatch = useDispatch()
    const allTemperaments = useSelector((state) => state.temperaments)
    //const allDogs = useSelector((state)=> state.dogs)

    let orderTemp = allTemperaments.sort((a,b)=>{
        if(a.name > b.name){
            return 1
        }else if(b.name > a.name){
            return -1
        }
        return 0
    })

    let filterNull = orderTemp.filter(t => t.name !== "")
    
    function handleFilterCreated(e){
        e.preventDefault()
        setPageNumber()
        dispatch(filterCreated(e.target.value))
    }

    function handleTemFilter(e){
        e.preventDefault()
        setPageNumber()
        dispatch(filterByTemp(e.target.value))
    }

    return(
        <div className="constiner">
            <div className="nav">
                <h4>Razas existentes</h4>
                    <select className="format" onChange={(e) =>{handleFilterCreated(e)}}>
                        <option value="all">Todos</option>
                        <option value="api">Traidos desde la API</option>
                        <option value="db">Creados</option>
                    </select>
                <h4>Temperamentos</h4>
                    <select className="format" onChange={(e) => handleTemFilter(e)}>
                        <option value="">Seleccione una Opcion</option>
                            {
                                filterNull && filterNull.map((temp) => {
                                    return(
                                    <option value={temp.name} key={temp.id}>{temp.name}</option>
                                    )
                                })
                            }
                    </select>           
            </div>
            <div className="nav_title">
                <h1>Dogs PI</h1>
                <img src="https://cdn.dribbble.com/users/690037/screenshots/15169590/media/7c2471f1be68e6946ce0897c6afc33ef.jpg?compress=1&resize=400x300" alt="" />
            </div>
        </div>
    )
}