import React from 'react';
import classNames from 'classnames';


export interface AvatarProps {
    size?: "sm" | 'lg' | 'default';
    shape?: "square" | "circle";
    src?: string;
    char?: string;
}

const Avator: React.FC<AvatarProps> = (props) => {
    const {
        size,
        shape,
        src,
        char,
    } = props

    const avatarSize = size === "default" ? "normal" : size;
    const content = src ? <img src={src} alt="avatar" /> : char;

    const classnames = classNames({
        [`avatar-${shape}`]: true,
        [`avatar-${avatarSize}`]: true,
        "avatar-char": typeof content === "string"
    })
    return (
            <div
                className={classnames}
            >
                {content}
            </div>
        )
}

Avator.defaultProps = {
    size: "default",
    shape: "circle",
    src: "",
    char: "U"
}

export default Avator
