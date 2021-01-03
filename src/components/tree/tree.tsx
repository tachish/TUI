import React from 'react'
import classNames from 'classnames';
import TreeNode, { TreeNodeAttrs } from './treeNode'

interface TreeProps {
    data?: TreeNodeAttrs[]
}

// 检查 children displayName 保证 children 是 TreeNode
// 用数组模拟树结构, 以避免层次过深时的前拷贝问题
const Tree: React.FC<TreeProps> = (props) => {
    const {
        data,
        children,
        className,
        ...restProps
    } = props

    const classes = classNames("tree", className)



    // dfs
    const renderTreeNodes = (data: TreeNodeAttrs[]): React.ReactElement => {
        if (data) {
            const layer: React.ReactElement = data.map((item, index) => {

                const treeNode: React.ReactElement = (
                    // 抽成组件, 需要局部的hook
                    <TreeNode
                        attr={{
                            id: item.id,
                            children: item.children,
                            label: item.label,
                            foldOption: item.foldOption
                        }}
                        renderFC={renderTreeNodes}
                    >
                    </TreeNode>
                )
                return treeNode
            })
            return layer
        } else {
            return <></>
        }
    }


    return (
        <div
            className={classes}
            {...restProps}
        >
            {renderTreeNodes(data)}
            {children}
        </div>
    )
}


export default Tree