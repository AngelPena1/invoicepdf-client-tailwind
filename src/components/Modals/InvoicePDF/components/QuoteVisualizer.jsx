import React from 'react'

const QuoteVisualizer = (props) => {
    return (
        <div className="relative px-4 min-h-screen md:flex md:items-center md:justify-center">
            <div className="opacity-25 w-full h-full absolute z-10 inset-0"></div>
            <div className="bg-white w-auto rounded-lg p-4 z-50 mb-4 mx-4 relative shadow-lg">
                <div className="md:flex items-center">
                    <div className="mb-6">
                        <p className="font-bold">Detalles de la Cotización</p>
                        <p className="">La cotización cuenta con los siguientes productos</p>
                    </div>
                </div>
                <div className='max-h-80 overflow-auto px-8'>
                    <table>
                        <thead className='sticky top-0 bg-white'>
                            <tr>
                                <th className='text-left'>Descripción</th>
                                <th className='px-3 text-center'>Cantidad</th>
                                <th className='text-right'>Precio</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.selectedItems?.map((quote, index) => {
                                return (
                                    <tr key={index} className=''>
                                        <td className='text-left p-3'>
                                            <p>
                                                {quote?.description}
                                            </p>
                                        </td>
                                        <td className=' text-center'>{quote?.quantity}</td>
                                        <td className=' text-right'>{quote?.price}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                        <tfoot className='sticky bottom-0 bg-white mt-3'>
                            <tr className='mt-3 p-4'>
                                <td className='text-left'></td>
                                <td className=' text-center'></td>
                                <td className='font-bold text-right'>
                                    <div className='border-t-2 border-gray-400'></div>
                                    <div className='grid grid-cols-2'>
                                        <p className='justify-start'>
                                            Descuento:
                                        </p>
                                        <p className='justify-end'>
                                            {props.selectedQuote?.discount}
                                        </p>
                                    </div>
                                    <div className='grid grid-cols-2'>
                                        <p className='justify-start'>
                                            Subtotal:
                                        </p>
                                        <p className='justify-end'>
                                            {props.selectedQuote?.subtotal}
                                        </p>
                                    </div>
                                    <div className='grid grid-cols-2'>
                                        <p className='justify-start'>
                                            Itbis:
                                        </p>
                                        <p className='justify-end'>
                                            {props.selectedQuote?.itbis}
                                        </p>
                                    </div>
                                    <div className='grid grid-cols-2'>
                                        <p className='justify-start'>
                                            Total:
                                        </p>
                                        <p className='justify-end font-bold'>
                                            {props.selectedQuote?.total}
                                        </p>
                                    </div>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <div className="text-center md:text-right mt-4 md:flex md:justify-end">
                </div>
            </div>
        </div>
    )
}

export default QuoteVisualizer