import React, { useState } from 'react';
import classnames from 'classnames';

// NOTE 始终展现，不会自动消失，用户可以点击关闭。 默认展现形式
// NOTE 四种基本样式: success, info, warning, error
// NOTE 自定义关闭
// NOTE 自定义icon
// NOTE 轮播

export interface AlertProps {
    // Base props
    // optional alert type
    type?: 'success' | 'info' | 'warning' | 'error';
    // if can be closed
    closable?: boolean;
    // content of alert
    children: React.ReactNode;
    // if show icon
    showIcon?: boolean;
    // default icon
    defaultIcon?: React.ReactNode;
    // customised icon
    cusIcon?: React.ReactNode;

    // TODO Carousel implement with Carousel component

    // Callback Functions
    // after clicked callback
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    // after closed callback
    onClose?: React.MouseEventHandler<HTMLDivElement>;
}


const Alert: React.FC<AlertProps> = (props) => {
    const classes = classnames(`alert-${props.type}`);
    const [isClosed, setisClosed] = useState(false);
    // if closable
    const {
        closable: isClosable,
        cusIcon,
        children,
        ...restProps
    } = props;
    // if icon
    const iconNode = () => {
        if (cusIcon) {
            return
        }
        return React.createElement('div', { className: "alert-icon" })
    }
    // if carousel

    return (
        !isClosed ?
            <div 
                className={classes}
                {...restProps}
            >
                {iconNode}
                {children}
                {isClosable ?
                    <div
                        className={"closeIcon"}
                        onClick={() => {
                            setisClosed(!isClosed);
                        }}
                    >
                        ✕
                </div> :
                    <></>
                }
            </div>
            : <></>
    )
}

Alert.defaultProps = {
    type: 'success',
    closable: false
}

export default Alert;