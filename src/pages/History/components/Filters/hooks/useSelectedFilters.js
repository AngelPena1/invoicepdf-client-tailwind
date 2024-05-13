import { useEffect, useState } from 'react'

const useSelectedFilters = ({ date, ClientData, clearSpecificDate, clearDateState, HandleSearchHistory }) => {
    const [filters, setFilters] = useState({
        from: "",
        to: "",
        from_to: "",
        client: ""
    })

    function HandleSelectClient(provide_client) {
        ClientData.forEach(client => {
            if (client?.id === provide_client) {
                return setFilters({
                    ...filters, client: {
                        id: client?.id,
                        name: client?.name
                    }
                })
            }
        });
    }

    //`Hasta: ${fullDateFormat(date?.to, "spanish")}`

    function HandleDateFilters() {
        const dateFromHasValue = date?.from !== ""
        const dateToHasValue = date?.to !== ""
        const dateFromToHasValue = date?.from_to !== ""
        return setFilters({
            ...filters,
            from: dateFromHasValue ? date?.from : "",
            to: dateToHasValue ? date?.to : "",
            from_to: dateFromToHasValue ? date?.from_to : "",
        })
    }

    function RemoveFilter(name) {
        clearSpecificDate(name)
        HandleSearchHistory()
        setFilters({ ...filters, [name]: "" })
        return null
    }


    function clearAllFilters() {
        setFilters({
            from: "",
            to: "",
            from_to: "",
            client: ""
        })
        clearDateState()
        return HandleSearchHistory()
    }


    useEffect(() => {
        HandleDateFilters(date)
        // eslint-disable-next-line
    }, [date])

    return { filters, HandleSelectClient, clearAllFilters, RemoveFilter }
}

export default useSelectedFilters