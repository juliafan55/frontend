import React, {useState, useRef} from 'react'
import MenuItem from './MenuItem'
import useClickOutside from "../../helpers/clickOutside"

export default function PostMenu({ postUserId, userId, setShowMenu }) {
    const [test, setTest] = useState(postUserId === userId ? true : false)
    const menu = useRef(null)

    useClickOutside(menu, () => setShowMenu(false));

    return (
        <ul className="post-menu" ref={menu}>
            <MenuItem icon="pin_icon" title="Pin Post"/>
            {test && <MenuItem icon="edit_icon" title="Edit Post"/>}
            {test && <MenuItem icon="trash_icon" title="Delete Post"/>}
        </ul>
    )
}
