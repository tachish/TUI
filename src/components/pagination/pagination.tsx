import React, { useState } from 'react';
import classNames from 'classnames';
import useThrottle from '../../utils/throttle'

// TODO improve style and more interface
interface BasePaginationProps {
    defaultCurrent?: number
    current?: number
    totalPages: number
    boundaryNum?: number
    showTotal?: boolean
    gap?: number
    showJumper?: boolean
}

const Pagination: React.FC<BasePaginationProps> = (props) => {
    const {
        defaultCurrent,
        current,
        totalPages,
        boundaryNum,

        // TODO
        showTotal,
        gap,
        //showJumper,
    } = props

    const [currentPage, setcurrentPage] = useState(current ? current : defaultCurrent)
    const [totalSelect, settotalSelect] = useState(showTotal as boolean)
    const [currentTotal, setcurrentTotal] = useState(totalPages)
    const [displayPages, setdisplayPages] = useState(1)

    const getSelections = (start: number, end: number, gap: number) => {
        const gapNum = Math.ceil((end - start + 1) / gap)
        const selections: React.ReactNode[] = []
        for (let i = 0; gapNum * i <= totalPages; i++) {
            const selectionNum = gapNum * i ? gapNum * i : 1
            const selection = <div
                className={"pagination-selection"}
                onClick={() => {
                    setcurrentTotal(Math.ceil(totalPages / (selectionNum)))
                    setdisplayPages(selectionNum)
                    settotalSelect(!totalSelect)
                }}
                key={i}>
                {selectionNum}
            </div>
            selections.push(selection)
        }
        return selections
    }

    const getIcons = (totalHandler: (e: React.MouseEvent) => void, preHandler: (e: React.MouseEvent) => void, nextHandler: (e: React.MouseEvent) => void) => {
        const totalCls = classNames("pagination-total", "pagination-node")
        const prsCls = classNames("pagination-preIcon", "pagination-node")
        const nextCls = classNames("pagination-nextIcon", "pagination-node")

        const total = <div className={totalCls} onClick={totalHandler} onMouseEnter={totalHandler} onMouseLeave={totalHandler}>
            {displayPages}
            {totalSelect ?
                getSelections(1, totalPages, gap as number) :
                <></>
            }
        </div>
        const preIcon = <div className={prsCls} onClick={preHandler}>{"<"}</div>
        const nextIcon = <div className={nextCls} onClick={nextHandler}>{">"}</div>
        return { total, preIcon, nextIcon }
    }

    const totalHandler = (e: React.MouseEvent) => {
        settotalSelect(!totalSelect)
    }


    const preHandler = (e: React.MouseEvent) => {
        if (currentPage as number > 1) {
            setcurrentPage(currentPage as number - 1);
        }
    }

    const nextHandler = (e: React.MouseEvent) => {
        if (currentPage as number < currentTotal) {
            setcurrentPage(currentPage as number + 1)
        }
    }

    const { total, preIcon, nextIcon } = getIcons(useThrottle(totalHandler, 300), preHandler, nextHandler)

    const newPageNode = (start: number, end: number): React.ReactNode[] => {
        const nodes: React.ReactNode[] = []
        for (let i = start; i < end + 1; i++) {
            const nodeCls = classNames("pagination-node", {
                "pagination-current-node": i === currentPage as number
            })
            const node = <a href="javascript:void" className={nodeCls} key={i}>{i}</a>
            nodes.push(node)
        }
        return nodes
    }

    const ellipse = <div className={"pagination-ellipse"}>...</div>

    //
    const renderContent = (): React.ReactNode => {
        // middle
        if ((currentPage as number) > (boundaryNum as number) && (currentPage as number) < currentTotal - (boundaryNum as number)) {
            const content = <div className={"pagination-content"}>
                {newPageNode(1, 1)}
                {ellipse}
                {newPageNode(currentPage as number - Math.floor((boundaryNum as number) / 2), currentPage as number + Math.floor((boundaryNum as number) / 2))}
                {ellipse}
                {newPageNode(currentTotal, currentTotal)}
            </div>
            return content
        } else {
            const lower = boundaryNum as number > currentTotal ? currentTotal : boundaryNum as number
            // left
            if ((currentPage as number) <= (boundaryNum as number)) {
                const content = <div className={"pagination-content"}>
                    {newPageNode(1, lower)}
                    {ellipse}
                    {newPageNode(currentTotal, currentTotal)}
                </div>
                return content
            } else {
                const content = <div className={"pagination-content"}>
                    {newPageNode(1, 1)}
                    {ellipse}
                    {newPageNode(currentTotal - (boundaryNum as number), currentTotal)}
                </div>
                return content
            }
        }
    }

    const content = renderContent()
    return (
        <div className={"pagination"}>
            {preIcon}
            {content}
            {nextIcon}
            {total}
        </div>
    )
}

Pagination.defaultProps = {
    defaultCurrent: 1,
    boundaryNum: 5,
    gap: 10
}

export default Pagination