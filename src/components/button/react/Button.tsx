import React, { ReactElement, ReactNode } from 'react';

import { Emphasis, Icon, Size, Theme } from 'LumX';
import { COMPONENT_PREFIX } from 'LumX/core/react/constants';
import { getRootClassName } from 'LumX/core/react/utils';
import { getBasicClass } from 'LumX/core/utils';
import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import { BaseButtonProps, ButtonRoot } from './ButtonRoot';

/////////////////////////////

/**
 * The authorized values for the `emphasis` prop.
 * @deprecated Use Emphasis instead.
 */
const ButtonEmphasis = Emphasis;

/////////////////////////////

/**
 * Defines the props of the component.
 */
interface IBaseButtonProps extends BaseButtonProps {
    /**
     * Button content.
     */
    children?: ReactNode;

    /**
     * Adds an icon to the left of the button label.
     * @see {@link IconProps#icon}
     */
    leftIcon?: string;

    /**
     * Adds an icon to the right of the button label.
     * @see {@link IconProps#icon}
     */
    rightIcon?: string;
}
type ButtonProps = IBaseButtonProps;

/////////////////////////////

/**
 * Define the types of the default props.
 */
interface IDefaultPropsType extends Partial<ButtonProps> {}

/////////////////////////////
//                         //
//    Public attributes    //
//                         //
/////////////////////////////

/**
 * The display name of the component.
 */
const COMPONENT_NAME = `${COMPONENT_PREFIX}Button`;

/**
 * The default class name and classes prefix for this component.
 */
const CLASSNAME: string = getRootClassName(COMPONENT_NAME);

/**
 * The default value of props.
 */
const DEFAULT_PROPS: IDefaultPropsType = {
    emphasis: Emphasis.high,
    size: Size.m,
    theme: Theme.light,
};

/////////////////////////////

/**
 * Displays a button.
 * If the `href` property is set, it will display a `<a>` HTML tag. If not, it will use a `<button>` HTML tag instead.
 *
 * @return The component.
 */
const Button: React.FC<ButtonProps> = (props: ButtonProps): ReactElement => {
    const {
        className,
        children,
        emphasis = DEFAULT_PROPS.emphasis,
        leftIcon,
        rightIcon,
        size = DEFAULT_PROPS.size,
        theme = DEFAULT_PROPS.theme,
        ...forwardedProps
    } = props;

    const buttonClassName = classNames(
        className,
        getBasicClass({ prefix: CLASSNAME, type: 'hasLeftIcon', value: !isEmpty(leftIcon) }),
        getBasicClass({ prefix: CLASSNAME, type: 'hasRightIcon', value: !isEmpty(rightIcon) }),
    );

    return (
        <ButtonRoot {...{ emphasis, size, theme, ...forwardedProps }} className={buttonClassName} variant="button">
            {leftIcon && !isEmpty(leftIcon) && <Icon icon={leftIcon} />}
            {children && <span>{children}</span>}
            {rightIcon && !isEmpty(rightIcon) && <Icon icon={rightIcon} />}
        </ButtonRoot>
    );
};
Button.displayName = COMPONENT_NAME;

/////////////////////////////

export { CLASSNAME, DEFAULT_PROPS, ButtonEmphasis, Button, ButtonProps };
