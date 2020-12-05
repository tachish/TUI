import React from "react"
import classNames from 'classnames';

type LayoutType = "Container" | "Header" | "Main" | "Footer" | "Aside";

interface DecoratorProps {
    layoutType: LayoutType;
    displayName: string;
}

interface BasicLayoutProps {
    prefixCls: LayoutType;
    // 00 no side, 01 right side, 10 left side, 11 both side
    sideOption?: number;
    className?: string;
}

const Layout: React.FC<BasicLayoutProps> = (props) => {
    const {
        prefixCls,
        sideOption,
        className,
        children
    } = props

    var sideCls: string;
    switch (sideOption) {
        case 1:
            sideCls = "right-side";
            break;
        case 2:
            sideCls = "left-side";
            break;
        case 3:
            sideCls = "both-side";
            break;
        default:
            sideCls = "no-side";
            break;
    }

    const classes = classNames(prefixCls, className, {
        [sideCls]: prefixCls === "Aside",
    })


    return (
        <div className={classes}>

            {children}
        </div>
    )
}

const decorator = ({ layoutType, displayName }: DecoratorProps) => {
    return (Layout: React.FC<BasicLayoutProps>) => {
        
        const SpecificLayout: React.FC<BasicLayoutProps> = (props) => {
            const {
                children,
                sideOption,
                className
            } = props

            var classes = classNames(className);

            const renderChildren = () => {
                return React.Children.map(children, (child, index) => {
                    if (typeof child === "string") {
                        return child;
                    }
                    const childElement = child as React.FunctionComponentElement<BasicLayoutProps>;
                    const { displayName } = childElement.type;
                    if (displayName === "Container" || displayName === "Header" || displayName === "Main" || displayName === "Footer" || displayName === "Aside") {
                        if (displayName === "Aside") {
                            switch (childElement.props.sideOption) {
                                case 0:
                                    console.error("[error]: sideOption 0 error");
                                    break;
                                case 1: 
                                    classes = classNames(classes, "has-lside");
                                    break;
                                case 2:
                                    classes = classNames(classes, "has-rside")
                                    break;
                                case 3:
                                    classes = classNames(classes, "has-lside");
                                    classes = classNames(classes, "has-rside")
                                    break;
                                default:
                                    console.error("[error]: sideOption default error");
                                    break;
                            }
                        }

                        return React.cloneElement(childElement)
                    } else {
                        console.error("[Warning]: Layout Component's children is illegal!")
                    }
                })
            }



            const renderedChildren = renderChildren();
            
            return <Layout prefixCls={layoutType} sideOption={sideOption} className={classes}>
                {renderedChildren}
            </Layout>
        }
        SpecificLayout.displayName = displayName
        return SpecificLayout
    }
}

export default Layout;
export const Container = decorator({ layoutType: "Container", displayName: "Container" })(Layout);
export const Header = decorator({ layoutType: "Header", displayName: "Header" })(Layout);
export const Main = decorator({ layoutType: "Main", displayName: "Main" })(Layout);
export const Footer = decorator({ layoutType: "Footer", displayName: "Footer" })(Layout);
export const Aside = decorator({ layoutType: "Aside", displayName: "Aside" })(Layout);