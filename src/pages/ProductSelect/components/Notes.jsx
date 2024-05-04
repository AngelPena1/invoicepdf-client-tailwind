import React from 'react'

const Notes = ({ onHide }) => {
    return (
        <>
            <div onClick={onHide} className="fixed inset-0 flex items-center justify-center z-40 backdrop-blur confirm-dialog"></div>
            <section className="fixed w-2xl h-auto z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 shadow-lg rounded-lg">
                <div className='text-center text-2xl'>
                    <h2>Notas del Documento</h2>
                </div>
                <div className='mt-10'>
                    <input type="text" className='mb-4' placeholder='Inserte una nota aquí...' />
                    <input type="text" className='mb-4' placeholder='Inserte una nota aquí...' />
                    <input type="text" className='mb-4' placeholder='Inserte una nota aquí...' />
                    <input type="text" className='mb-4' placeholder='Inserte una nota aquí...' />
                    <input type="text" className='mb-4' placeholder='Inserte una nota aquí...' />
                </div>
                <div className='flex justify-end mt-10'>
                    <button onClick={onHide} className='py-0 px-4 h-10 button-2'>Cancelar</button>
                    <button className='py-0 px-4 h-10'>Aceptar</button>
                </div>
            </section>
        </>
    )
}

export default Notes