import React, { useState } from "react";
import classNames from 'classnames';
import { StepProps } from "./step"


export interface StepsProps {
    current?: number;
    direction?: 'horizontal' | 'vertical';
    className?: string;
    change?: boolean;
    onClick?: React.MouseEventHandler<HTMLElement>;
}
const Steps: React.FC<StepsProps> = (props) => {
    const {
        current,
        direction,
        className,
        change,
        onClick,
        children,
        ...restProps
    } = props

    const classnames = classNames(className, {
        "steps": true
    })

    const [currentIdx, setcurrentIdx] = useState(current ? current : 0)

    // childrenComponent only have Step Components
    const childrenComponent = React.Children.map(children, (child, index) => {
        const childElement = child as React.FunctionComponentElement<StepProps>
        if (childElement.type.displayName === 'Step') {
            // sub component compare current and index
            return React.cloneElement(childElement, {
                index,
                status: index > (currentIdx) ? "wait" : "success"
            })
        } else {
            console.error("[Warning] Steps has a child is not Step")
        }
    })

    const handleClick = (e: React.MouseEvent) => {
        if (currentIdx < React.Children.count(children) - 1) {
            setcurrentIdx(currentIdx + 1)
        }
        console.log("[current]", currentIdx)
    }

    return (
        <div
            className={classnames}
            onClick={(e: React.MouseEvent) => { 
                if(change) {
                    handleClick(e) 
                }
            }}
            {...restProps}
        >
            {childrenComponent}
        </div>
    )
}


Steps.defaultProps = {
    current: 0,
    change: false
}

export default Steps
