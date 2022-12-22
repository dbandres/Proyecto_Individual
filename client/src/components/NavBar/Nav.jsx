import "../../style/Nav.css"
import { filterCreated,  getTemperament} from "../../actions"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"


export default function NavBar(){
    
    const dispatch = useDispatch()
    
    const allTemperaments = useSelector((state) => state.temperaments)
    
    function handleFilterCreated(e){
        dispatch(filterCreated(e.target.value))
    }

    return(
        <div className="constiner">
            <div className="nav">
            <select>
                <option value="asc">Ascendente</option>
                <option value="desc">Descendente</option>
            </select>
            <select onChange={(e) =>{handleFilterCreated(e)}}>
                <option value="all">Todos</option>
                <option value="api">Traidos desde la API</option>
                <option value="db">Creados</option>
            </select>
            <select>
                {
                    allTemperaments && allTemperaments.map((temp) => {
                        return(
                            <option key={temp.id}>{temp.name}</option>
                        )
                    })
                }
            </select>
            </div>
        </div>
    )
}