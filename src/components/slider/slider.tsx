import React, { useState } from 'react'
interface SliderProps {
    lowerNum?: number
    upperNum?: number
    currentNum?: number
    defaultPercent?: number
    sliderWidth?: number
    onChange?: (value: number) => void;
}

const Slider: React.FC<SliderProps> = (props) => {
    const {
        lowerNum,
        upperNum,
        defaultPercent,
        sliderWidth,
        onChange
    } = props

    // lock value true: has lock
    const widthNum = sliderWidth !== undefined ? sliderWidth : 200
    const diffValue = (upperNum !== undefined && lowerNum !== undefined) ? upperNum - lowerNum : 200
    const [moveLock, setmoveLock] = useState(true)
    const [beginX, setbeginX] = useState(0)
    const [lwidth, setlwidth] = useState((defaultPercent as number) * 0.01 * widthNum)
    const [rwidth, setrwidth] = useState((100 - (defaultPercent as number)) * 0.01 * widthNum)
    const [value, setvalue] = useState(0)

    return (
        <>
            { 
                lowerNum !== undefined ? <div className={"slider-display"}>
                                            {lowerNum }
                                        </div> : <></>
            }

            <div
                className={"slider"}
                // cause mouse maybe move much more faster than the thumb, so event should bind at parent node
                onMouseDown={(e: React.MouseEvent) => {
                    setbeginX(e.clientX)
                    setmoveLock(false)
                }}
                onMouseUp={(e: React.MouseEvent) => {
                    setmoveLock(true)
                    setbeginX(0)
                    setvalue(diffValue * lwidth / widthNum )
                    if(onChange) {
                        onChange(diffValue * lwidth / widthNum + (lowerNum as number))
                    }
                }}
                onMouseMove={(e: React.MouseEvent) => {
                    if (!moveLock) {
                        // left 2 right offset is possitive
                        const offset = (e.clientX - beginX)

                        setbeginX(beginX + offset)
                        setlwidth((lwidth + offset) > widthNum ? widthNum : ((lwidth + offset) < 0 ? 0 : (lwidth + offset)))
                        setrwidth((rwidth - offset) > widthNum ? widthNum : ((rwidth - offset) < 0 ? 0 : (rwidth - offset)))
                    }
                }}
                style={{
                    width: widthNum + 20 + "px"
                }}
            >
                <div
                    className={"slider-left"}
                    style={{
                        width: lwidth + "px"
                    }}
                >
                </div>
                <div
                    className={"slider-trumb"}
                ></div>
                <div
                    className={"slider-right"}
                    style={{
                        width: rwidth + "px"
                    }}
                >
                </div>
            </div>
            
            { 
                upperNum !== undefined ?
                            <div className={"slider-display"}>
                                {upperNum}
                            </div>
                            :<></>
            }
        </>
    )
}

Slider.defaultProps = {
    defaultPercent: 20
}
export default Slider