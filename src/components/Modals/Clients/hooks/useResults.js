import { useEffect, useState } from 'react'

const useResults = ({ inputData, clientData }) => {
    const [data, setData] = useState([])

    function FilterInput() {
        if (inputData === "") return setData("")

        let results = []

        clientData.forEach(client => {
            const clientName = client?.name.toLowerCase()
            const inputInLowerCase = inputData?.toLowerCase()

            if (clientName.includes(inputInLowerCase)) return results.push(client)
        })

        return setData(results)
    }

    useEffect(() => {
        FilterInput()
        // eslint-disable-next-line
    }, [inputData])

    return { data }
}

export default useResults