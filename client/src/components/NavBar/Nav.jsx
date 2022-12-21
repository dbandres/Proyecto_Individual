import "../../style/Nav.css"
import { filterCreated } from "../../actions"
import { useDispatch } from "react-redux"


export default function NavBar(){

    const dispatch = useDispatch()

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
            <select onChange={e =>{handleFilterCreated(e)}}>
                <option value="all">Todos</option>
                <option value="api">Traidos desde la API</option>
                <option value="db">Creados</option>
            </select>
            </div>
        </div>
    )
}