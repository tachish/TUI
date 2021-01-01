import React, { useState } from 'react'
import Input, { InputProps } from '../input/input'

// TODO add mouse event
export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
    fetchSuggestions: (keyword: string) => string[]
    onSelect: (item: string) => void
    renderOption?: (item: string) => React.ReactElement
}


const AutoComplete: React.FC<AutoCompleteProps> = (props => {
    const {
        fetchSuggestions,
        onSelect,
        value,
        renderOption,
        ...restProps
    } = props

    const [inputValue, setinputValue] = useState(value)
    const [suggestions, setsuggestions] = useState<string[]>([])

    console.log(suggestions)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim()
        setinputValue(value)
        if (value) {
            const results = fetchSuggestions(value)
            setsuggestions(results)
        } else {
            setsuggestions([])
        }
    }

    const handleSelect = (item: string) => {
        setinputValue(item)
        setsuggestions([])
        if (onSelect) {
            onSelect(item)
        }
    }

    const renderTmplate = (item: string) => {
        return renderOption ? renderOption(item) : item
    }

    const genDropDown = () => {
        return (
            <ul className={"autoComplete-selections"}>
                {
                    suggestions.map((item, index) => {
                        return (
                            <li
                                key={index}
                                onClick={(e: React.MouseEvent) => { 
                                    handleSelect(item) 
                                }}
                                className={"autoComplete-selection"}
                            >
                                {renderTmplate(item)}
                            </li>
                        )
                    })
                }
            </ul>
        )
    }
    return (
        <div
            className="autoComplete"
            {...restProps}
        >
            <Input
                value={inputValue}
                {...restProps}
                onChange={handleChange}
            >
            </Input>
            {
                suggestions.length > 0 ?
                    genDropDown() :
                    <></>
            }
        </div>
    )
})

export default AutoComplete