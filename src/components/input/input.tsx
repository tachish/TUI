import React, { ChangeEvent, InputHTMLAttributes, ReactElement,useState } from 'react';
import classNames from 'classnames';

type InputSize = 'lg' | 'sm';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
    disabled?: boolean;
    size?: InputSize;
    prepend?: string | ReactElement;
    append?: string | ReactElement;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = (props) => {
    const {
        disabled,
        size,
        prepend,
        append,
        style,
        ...restProps
    } = props;

    const names = classNames('input-wrapper', {
        [`input-size-${size}`]: size,
        "is-disabled": disabled,
        "input-group": prepend || append,
        "input-group-append": !!append,
        "input-group-prepend": !!prepend,
    })

    const fixControlledValue = (value: any)=> {
        if(typeof value === 'undefined' || value == null) {
            return ''
        }
        return value
    }
    if('value' in props) {
        delete restProps.defaultValue
        restProps.value = fixControlledValue(props.value)
    }

    return (
        <div className={names} style={style}>
            { prepend && <div className={ "input-group-prepend" }>{ prepend }</div> }
            <input 
                className={"input-inner"}
                disabled={disabled}
                {...restProps}
            />
            { append && <div className={"input-group-append"}>{ append }</div> }
        </div>
    )
}

export default Input;

export const ControlledInput = (props: InputProps) => {
    const [value, setValue] = useState('');
    const {
        style
    } = props
    return <Input 
            value={value}
            onChange={(e)=>{
                setValue(e.target.value)
            }}
            style={style}
            ></Input>
}

export const DefaultInput = () => {
    return <>
        <Input
            style={{width: "300px"}}
            placeholder="placeholder"
        >
        </Input>
    </>
}
