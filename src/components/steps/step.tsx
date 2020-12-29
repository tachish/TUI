import React from "react";
import classNames from 'classnames';

export interface StepProps {
    index?: number;
    className?: string;
    title?: string;
    description?: string;
    status?: "wait" | "process" | "success" | "failed";
}


const Step: React.FC<StepProps> = (props) => {
    const {
        index,
        title,
        description,
        status,
        className,
        ...restProps
    } = props

    const classnames = classNames(className, {
        "step": true,
        [`step-${status}`]: true,
    })

    const content = (
        <div className={"step-content"}>
            <div className={"step-title"}>
                {title}
            </div>
            <div className={"step-description"}>
                {description}
            </div>
        </div>
    )

    const lineCls = classNames({
        [`step-line-${status}`]: status
    })

    return (
        <div
            className={classnames}
            {...restProps}
        >
            <div className={"step-icon"}>
                ✓
            </div>
            {content}
            <div
                className={lineCls}
            >
            </div>
        </div>
    )
}

Step.displayName = "Step"
Step.defaultProps = {
    status: "wait"
}
export default Step