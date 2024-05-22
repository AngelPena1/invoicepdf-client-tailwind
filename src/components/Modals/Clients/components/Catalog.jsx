import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const Catalog = (props) => {

    const clientData = props.clientData ? props.clientData : []
    const showCatalog = props.toggles?.catalog

    const switchIfHasResults = props.results ? props.results : clientData

    const ShowToggleCatalog = () => {
        props.HandleToggleCatalog(true)
    }

    const HideToggleCatalog = () => {
        props.HandleToggleCatalog(false)
    }

    return (
        <section ref={props.dropdownRef} className='relative'>
            <div onClick={ShowToggleCatalog}>
                <label className='inline-block mr-3' htmlFor="">Selecciona un Cliente</label>
                <FontAwesomeIcon icon={faUser} />
            </div>
            {showCatalog && <div className='absolute right-0 top-10 w-60 min-h-28 max-h-60 fade-in-top bg-white rounded-lg shadow-style-2 z-20 overflow-auto'>
                <div className='grid justify-center sticky top-0 pt-4 bg-white z-10'>
                    <div>
                        <input 
                            ref={props.searchRef} 
                            type="text" className='inline w-full mr-2' 
                            placeholder='Ingrese un cliente...'
                            value={props.inputData}
                            onChange={props.HandleInputData}
                        />
                        {/* <button className='w-8 bg-slate-200 hover:bg-slate-300  rounded-lg text-slate-500 inline'>
                            <FontAwesomeIcon className='' icon={faPlus} />
                        </button> */}
                    </div>
                </div>
                <div className='px-4'>
                    {switchIfHasResults.map(client => {
                        return <button onClick={(e) => {
                            HideToggleCatalog()
                            props.onClickEvent(e)
                        }} 
                        className='text-center block w-full rounded-lg py-2 my-2 text-[#27415a] bg-white hover:bg-slate-100 cursor-pointer' 
                        key={client?.name}
                        value={client?.id}
                        >
                            {client?.name}
                        </button>
                    })}
                </div>
            </div>}
        </section>
    )
}

export default Catalog