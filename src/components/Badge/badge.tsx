import React from 'react';

export interface BadgeProps {
    counter?: number;
    content?: string;
    bgcColor?: string;
    overflowNum?: number;
    offsetX?: number;
    offsetY?: number;
    children?: React.ReactNode;
}

// Style use CSSProperties control
// radius === padding

const Badge: React.FC<BadgeProps> = (props) => {
    const {
        counter,
        content,
        overflowNum,
        bgcColor,
        offsetX,
        offsetY,
        children,
        ...restProps
    } = props;
    
    let noContent = counter === undefined && content === undefined

    const noNumCSS: React.CSSProperties = {}

    if(noContent) {
        noNumCSS.height = "14px"
        noNumCSS.width = "14px"
        noNumCSS.borderRadius = "14px"
    }

    let contentTxt = counter?.toString() || content || '';
    if( overflowNum && counter && overflowNum < counter ) {
        contentTxt = overflowNum.toString() + '+';
    }


    const dotCss: React.CSSProperties = {
        backgroundColor: bgcColor,
        marginRight: offsetX ? 0 - offsetX : 0,
        marginTop: offsetY ? 0 + offsetY : 0,
        ...noNumCSS
    }

    return (
        <div
            className={"badge"}
            {...restProps}
        >
            <div
                className={"badge-dot"}
                style={dotCss}
            >
                {contentTxt}
            </div>
            {children}
        </div>
    )
}

export default Badge