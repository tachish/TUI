import React from 'react';
import classNames from 'classnames';

export interface DividerProps {
    text?: string
    ori?: "left" | "middle" | "right"
}

const Divider: React.FC<DividerProps> = (props) => {
    const {
        text,
        ori
    } = props
    
    const classes = classNames("divider-text", {
        [`divider-text-${ori}`]: ori
    })
    const content = text ?
                            <>
                                <div className={"divider-line"}></div>
                                <div className={"divider-text"}>{text}</div>
                                <div className={"divider-line"}></div>
                            </>:
                            <>
                                <div className={"divider-line"}></div>
                            </>;
    

    return (
        <div
            className={classes}
        >
            {content}
        </div>
    )
}

Divider.defaultProps = {
    ori: "middle"
}

export default Divider