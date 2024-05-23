import { useState } from 'react'

const useInputData = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    function HandleChangeUsername(e) {
        const { value } = e.target
        return setUsername(value)
    }

    function HandleChangePassword(e) {
        const { value } = e.target
        return setPassword(value)
    }

    return { username, password, HandleChangeUsername, HandleChangePassword }
}

export default useInputData