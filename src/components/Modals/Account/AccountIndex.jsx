import {useState} from 'react'
import AccountForm from './AccountForm'

const AccountIndex = (props) => {
    const [show, setShow] = useState(true)

    function invertShow(bool) {
        setShow(bool)
    }
    return (
        <AccountForm toggleAccount={props.toggleAccount} invertShow={invertShow} show={show}/>
    )
}

export default AccountIndex