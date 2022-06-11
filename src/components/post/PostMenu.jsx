import React, {useState, useRef} from 'react'
import MenuItem from './MenuItem'
import useClickOutside from "../../helpers/clickOutside"
import { deletePost } from '../../helpers/post'

export default function PostMenu({ postUserId, userId, setShowMenu, token, postId, postRef }) {
    const [test, setTest] = useState(postUserId === userId ? true : false)
    const menu = useRef(null)


    useClickOutside(menu, () => setShowMenu(false));

    const deleteHandler = async () => {
        const res = await deletePost(postId, token);
        if (res.status === "ok")
        postRef.current.remove()
    }

    return (
        <ul className="post-menu" ref={menu}>
            <MenuItem icon="pin_icon" title="Pin Post"/>
            {test && <MenuItem icon="edit_icon" title="Edit Post"/>}
            {test && (
                <div onClick={() => deleteHandler()}>
                    <MenuItem icon="trash_icon" title="Delete Post"/>
                </div>
            )}
        </ul>
    )
}
