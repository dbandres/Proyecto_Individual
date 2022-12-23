import "../../style/Paginado.css"

export default function Paginado({dogsPorPage, allDogs, pagination}){
    const numberPage = []

    for(let i = 1; i<=Math.ceil(allDogs/dogsPorPage); i++){
        numberPage.push(i);
    }

    return(
        <nav className="paginado">
            <ul className="pag_ul">
                {
                    numberPage && numberPage.map(n=>{
                        return(
                            <li key={n} className="li_pag"><a onClick={() => pagination(n)}>{n}</a></li>
                        )
                    })
                }
            </ul>
        </nav>
    )
}