import "../../style/Paginado.css"

export default function Paginado({dogsPorPage, allDogs, pagination, actualPage}){
    const numberPage = []

    for(let i = 1; i<=Math.ceil(allDogs/dogsPorPage); i++){
        numberPage.push(i);
    }

    console.log(numberPage)

    return(
        <nav className="paginado">
            <ul className="pag_ul">
                {
                    numberPage && numberPage.map(n=>{
                        return(
                            <li key={n} className={'li_pag' + (actualPage === n ? ' active' : '')} onClick={() => pagination(n)}>
                                <span className="pagspan">{n}</span>
                            </li>
                        )
                    })
                }
            </ul>
        </nav>
    )
}