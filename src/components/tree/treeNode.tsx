import React, { useState } from 'react'
import classNames from 'classnames';
import Icon from '../icon/icon';

export interface TreeNodeAttrs {
    id: string
    children: TreeNodeAttrs[]
    label?: string
    foldOption?: boolean
}

interface TreeNodeProps {
    attr: TreeNodeAttrs,
    renderFC: (data: TreeNodeAttrs[]) => {},
}

const TreeNode: React.FC<TreeNodeProps> = (props) => {
    const {
        className,
        attr,
        renderFC,
        ...restProps
    } = props

    const [arrowDir, setarrowDir] = useState("left")
    const childrenLengh = attr.children !== undefined && attr.children.length > 0 ? attr.children.length : 0
    const formatTreeNodeID = (id: string): number => {
        const layerNum: number = id.split("-").length
        return layerNum
    }

    const treeNodeCls = classNames("treeNode", {
        [`treeNode-${formatTreeNodeID(attr.id)}`]: true
    })

    const handleClick = (e: React.MouseEvent) => {
        if (arrowDir === 'left') {
            setarrowDir("down")
        } else {
            setarrowDir("left")
        }
    }

    return (
        <>
            <div
                className={"treeNode-title"}
                onClick={handleClick}
            >
                {childrenLengh > 0 ? <Icon icon={arrowDir === "left" ? "chevron-left" : "chevron-down"} className={"treeNode-icon"} /> : <></>}
                {attr.label ? attr.label : attr.id}
            </div>
            <div
                className={treeNodeCls}
                {...restProps}
            >
                {arrowDir === "down" ? renderFC(attr.children) : <></>}
            </div>
        </>
    )
}

TreeNode.displayName = "TreeNode"
export default TreeNode