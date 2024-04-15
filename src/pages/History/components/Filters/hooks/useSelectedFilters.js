import { useEffect, useState } from 'react'
import { fullDateFormat } from '../../../../../utils/dateFormat/dateFormat'

const useSelectedFilters = ({ date, clearSpecificDate }) => {
    const [filters, setFilters] = useState({
        from: "",
        to: "",
        from_to: "",
        client: ""
    })

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
        setFilters({...filters, [name]: ""})
        return null
    }

    useEffect(() => {
        HandleDateFilters(date)
        // eslint-disable-next-line
    }, [date])

    return { filters, RemoveFilter }
}

export default useSelectedFilters