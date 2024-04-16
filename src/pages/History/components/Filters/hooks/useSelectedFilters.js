import { useEffect, useState } from 'react'
import { fullDateFormat } from '../../../../../utils/dateFormat/dateFormat'

const useSelectedFilters = ({ date, ClientData, clearSpecificDate }) => {
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

    function HandleDateFilters() {
        const dateFromHasValue = date?.from !== ""
        const dateToHasValue = date?.to !== ""
        const dateFromToHasValue = date?.from_to !== ""
        return setFilters({
            ...filters,
            from: dateFromHasValue ? `Desde: ${fullDateFormat(date?.from, "spanish")}` : "",
            to: dateToHasValue ? `Hasta: ${fullDateFormat(date?.to, "spanish")}` : "",
            from_to: dateFromToHasValue ? fullDateFormat(date?.from_to, "spanish") : "",
        })
    }

    function RemoveFilter(name) {
        clearSpecificDate(name)
        setFilters({ ...filters, [name]: "" })
        return null
    }

    useEffect(() => {
        HandleDateFilters(date)
        // eslint-disable-next-line
    }, [date])

    return { filters, HandleSelectClient, RemoveFilter }
}

export default useSelectedFilters