import React, { ReactElement } from 'react';

import classNames from 'classnames';

import { CSS_PREFIX } from 'LumX/core/constants';
import { COMPONENT_PREFIX } from 'LumX/react/constants';

import { handleBasicClasses } from 'LumX/core/utils';
import { IGenericProps } from 'LumX/react/utils';

/////////////////////////////

/**
 * Defines the props of the component.
 */
interface IRadioButtonHelperProps extends IGenericProps {}
type RadioButtonHelperProps = IRadioButtonHelperProps;

/////////////////////////////

/**
 * Define the types of the default props.
 */
interface IDefaultPropsType extends Partial<RadioButtonHelperProps> {}

/////////////////////////////
//                         //
//    Public attributes    //
//                         //
/////////////////////////////

/**
 * The display name of the component.
 */
const COMPONENT_NAME = `${COMPONENT_PREFIX}RadioButtonHelper`;

/**
 * The default class name and classes prefix for this component.
 */
const CLASSNAME = `${CSS_PREFIX}-radio-button__helper`;

/**
 * The default value of props.
 */
const DEFAULT_PROPS: IDefaultPropsType = {};

/////////////////////////////

/**
 * Define a radiobutton helper component.
 *
 * @return The component.
 */
const RadioButtonHelper: React.FC<RadioButtonHelperProps> = ({
    children,
    className = '',
    ...props
}: RadioButtonHelperProps): ReactElement => {
    return (
        <span className={classNames(className, handleBasicClasses({ prefix: CLASSNAME }))} {...props}>
            {children}
        </span>
    );
};
RadioButtonHelper.displayName = COMPONENT_NAME;

/////////////////////////////

export { CLASSNAME, DEFAULT_PROPS, RadioButtonHelper, RadioButtonHelperProps };
