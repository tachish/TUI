import React, { useContext, useState } from 'react'
import classNames from 'classnames';

// TODO imple loading ani
interface SwitchContext {
    checked?: boolean;
    loading?: boolean;
}

interface BaseSwitchProps {
    size?: "sm" | "normal" | "lg"
    className?: string;
    context: React.Context<SwitchContext>;
    onClick?: (e: React.MouseEvent) => void
}

interface SwitchProps {
    checked?: boolean;
    loading?: boolean;

    size?: "sm" | "normal" | "lg"
    className?: string;
    onClick?: (e: React.MouseEvent) => {}
}

const BaseSwitch: React.FC<BaseSwitchProps> = (props) => {
    const {
        className,
        onClick,
        context,
        ...restProps
    } = props

    const switchCxt = useContext(context)
    const value = switchCxt.checked ? "on" : "off"

    const classnames = classNames({
        [`switch-container-${value}`]: value,
    })

    return (
        <div
            className={classnames}
            onClick={(e: React.MouseEvent) => {
                if(onClick) {
                    onClick(e)
                }
            }}
            {...restProps}
        >
            <div
                className={"switchIcon"}
            >
            </div>
        </div>
    )
}

// HOC
const HOC = (BaseSwitch: React.FC<BaseSwitchProps>) => {
    const SwitchHOC: React.FC<SwitchProps> = (props) => {
        const {
            checked,
            loading,
            className,
            size,
            onClick,
        } = props

        const [value, setvalue] = useState(checked)
        const ctxProps: SwitchContext = {
            checked: value,
            loading
        }

        const switchCtx = React.createContext(ctxProps)
        
        async function handleClick(e: React.MouseEvent){
            if(onClick) {
                await onClick(e)
            }
            setvalue(!value);
        }

        const BaseSwitchProps: BaseSwitchProps = {
            className,
            size,
            context: switchCtx,
            onClick: handleClick,
        }

        return (
            <switchCtx.Provider value={ctxProps}>
                <BaseSwitch
                    {...BaseSwitchProps}
                >
                </BaseSwitch>
            </switchCtx.Provider>
        )
    }

    return SwitchHOC
}


const Switch = HOC(BaseSwitch)

export default Switch