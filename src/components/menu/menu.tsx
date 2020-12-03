import React, { useState, createContext } from 'react';
import classNames from 'classnames';
import { MenuItemProps } from "./menuItem"

// TODO left border style is to improve

type MenuMode = "horizontal" | 'vertical'
type SelecCallback = (selectedIndex: string) => void;

export interface MenuProps {
    defaultIndex?: string;
    className?: string;
    mode?: MenuMode;
    style?: React.CSSProperties;
    onSelect?: SelecCallback;
    defaultOpenSubMenus?: string[]
}

interface IMenuContext {
    index: string;
    onSelect?: SelecCallback;
    mode?: MenuMode;
    defaultOpenSubMenus?: string[]
}

export const MenuContext = createContext<IMenuContext>({ index: '0' })

const Menu: React.FC<MenuProps> = (props) => {
    const {
        className,
        mode,
        style,
        children,
        defaultIndex,
        onSelect,
        defaultOpenSubMenus
    } = props;

    const [currentActive, setActive] = useState(defaultIndex);

    const classes = classNames("menu", className, {
        'menu-vertical': mode === "vertical"
    })

    const handleClick = (index: string) => {
        setActive(index);
        if (onSelect) {
            onSelect(index)
        }

    }
    const passedContext: IMenuContext = {
        index: currentActive ? currentActive : '0',
        onSelect: handleClick,
        mode,
        defaultOpenSubMenus, 
    }

    const renderChildren = () => {
        return React.Children.map(children, (child, index) => {
            const childElement = child as React.FunctionComponentElement<MenuItemProps>
            const { displayName } = childElement.type;
            if (displayName === 'MenuItem' || displayName === 'SubMenu') {
                console.log("in first")
                return React.cloneElement(childElement, {
                    index: index.toString()
                });
            } else {
                console.error("[Warning] Menu has a child is not MenuItem")
            }
        })
    }
    return (
        <ul className={classes} style={style}>
            <MenuContext.Provider value={passedContext}>
                {renderChildren()}
            </MenuContext.Provider>
        </ul>
    )
}

Menu.defaultProps = {
    defaultIndex: '0',
    mode: "horizontal",
    defaultOpenSubMenus: []
}

export default Menu;