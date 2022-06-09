import React,{useRef, useState} from 'react'
import Header from '../../components/header/Header'
import useClickOutside from '../../helpers/clickOutside'

export default function Login() {
    const [visible, setVisible] = useState(true)
    const el = useRef(null)

    useClickOutside(el, () => {
        setVisible(false);
    })
    
    return (
        <div>
            <Header />
            {visible && <div className="card" ref={el}></div>}
        </div>
    )
}
