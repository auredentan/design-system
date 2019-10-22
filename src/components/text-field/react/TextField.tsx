import React, { ReactElement, useState } from 'react';

import classNames from 'classnames';
import get from 'lodash/get';
import uuid from 'uuid/v4';

import { Icon, Size, Theme } from 'LumX';
import { CSS_PREFIX } from 'LumX/core/constants';
import { COMPONENT_PREFIX } from 'LumX/core/react/constants';
import { IGenericProps, getRootClassName } from 'LumX/core/react/utils';
import { handleBasicClasses } from 'LumX/core/utils';
import { mdiAlertCircle, mdiCheckCircle } from 'LumX/icons';

/////////////////////////////

enum TextFieldType {
    input = 'input',
    textarea = 'textarea',
}

/**
 * Defines the props of the component.
 */
interface ITextFieldProps extends IGenericProps {
    /** Whether the text field is displayed with error style or not. */
    hasError?: boolean;

    /** Text field helper message. */
    helper?: string;

    /** Text field icon (SVG path). */
    icon?: string;

    /** Id that will be passed to input element. An id is generated (uuid) if no id is provided. */
    id?: string;

    /** Whether the text field is disabled or not. */
    isDisabled?: boolean;

    /** Whether the text field is displayed with valid style or not. */
    isValid?: boolean;

    /** Text field label displayed in a label tag. */
    label?: string;

    /** Text field placeholder message. */
    placeholder?: string;

    /** Theme. */
    theme?: Theme;

    /** Whether custom colors are applied to this component. */
    useCustomColors?: boolean;

    /** Text field value. */
    value: string;

    /** Text field type (input or textarea). */
    type?: TextFieldType;

    /** Text field value change handler. */
    onChange(value: string): void;
}
type TextFieldProps = ITextFieldProps;

/////////////////////////////

/////////////////////////////
//                         //
//    Public attributes    //
//                         //
/////////////////////////////

/**
 * The display name of the component.
 */
const COMPONENT_NAME = `${COMPONENT_PREFIX}TextField`;

/**
 * The default class name and classes prefix for this component.
 */
const CLASSNAME: string = getRootClassName(COMPONENT_NAME);

/**
 * The default value of props.
 */
const DEFAULT_PROPS: Partial<TextFieldProps> = {
    hasError: false,
    isDisabled: false,
    isValid: false,
    theme: Theme.light,
    type: TextFieldType.input,
};

/////////////////////////////

interface IInputNativeProps {
    id?: string;
    isDisabled?: boolean;
    placeholder?: string;
    type?: TextFieldType;
    value: string;
    setFocus(focus: boolean): void;
    onChange(value: string): void;
}

const renderInputNative = (props: IInputNativeProps): ReactElement => {
    const { id, isDisabled, placeholder, type, value, setFocus, onChange, ...forwardedProps } = props;
    const onFocus = (): void => setFocus(true);
    const onBlur = (): void => setFocus(false);

    const handleChange = (event: React.ChangeEvent): void => onChange(get(event, 'target.value'));

    if (type === TextFieldType.textarea) {
        return (
            <textarea
                id={id}
                disabled={isDisabled}
                placeholder={placeholder}
                value={value}
                onFocus={onFocus}
                onBlur={onBlur}
                onChange={handleChange}
                {...forwardedProps}
            />
        );
    }
    return (
        <input
            id={id}
            disabled={isDisabled}
            type="text"
            placeholder={placeholder}
            value={value}
            onFocus={onFocus}
            onBlur={onBlur}
            onChange={handleChange}
            {...forwardedProps}
        />
    );
};

/**
 * Text field.
 *
 * @param  props Text field props.
 * @return The component.
 */
const TextField: React.FC<TextFieldProps> = (props: TextFieldProps): ReactElement => {
    const {
        className = '',
        hasError,
        helper,
        icon,
        id = uuid(),
        isDisabled,
        isValid,
        label,
        onChange,
        placeholder,
        theme = DEFAULT_PROPS.theme,
        type = DEFAULT_PROPS.type,
        useCustomColors,
        value,
        ...forwardedProps
    } = props;
    const [isFocus, setFocus] = useState(false);

    return (
        <div
            className={classNames(
                className,
                handleBasicClasses({
                    hasError: !isValid && hasError,
                    hasIcon: Boolean(icon),
                    hasInput: type === TextFieldType.input,
                    hasLabel: Boolean(label),
                    hasPlaceholder: Boolean(placeholder),
                    hasTextarea: type === TextFieldType.textarea,
                    hasValue: Boolean(value),
                    isDisabled,
                    isFocus,
                    isValid,
                    prefix: CLASSNAME,
                    theme,
                }),
                { [`${CSS_PREFIX}-custom-colors`]: useCustomColors },
            )}
        >
            {label && (
                <label htmlFor={id} className={`${CLASSNAME}__label`}>
                    {label}
                </label>
            )}

            {helper && <span className={`${CLASSNAME}__helper`}>{helper}</span>}

            <div className={`${CLASSNAME}__input-wrapper`}>
                {icon && (
                    <Icon
                        className={`${CLASSNAME}__input-icon`}
                        color={theme === Theme.dark ? 'light' : undefined}
                        icon={icon}
                        size={Size.xs}
                    />
                )}

                <div className={`${CLASSNAME}__input-native`}>
                    {renderInputNative({
                        id,
                        isDisabled,
                        onChange,
                        placeholder,
                        setFocus,
                        type,
                        value,
                        ...forwardedProps,
                    })}
                </div>

                {(isValid || hasError) && (
                    <Icon
                        className={`${CLASSNAME}__input-validity`}
                        color={theme === Theme.dark ? 'light' : undefined}
                        icon={isValid ? mdiCheckCircle : mdiAlertCircle}
                        size={Size.xs}
                    />
                )}
            </div>
        </div>
    );
};
TextField.displayName = COMPONENT_NAME;

/////////////////////////////

export { CLASSNAME, DEFAULT_PROPS, TextField, TextFieldType, TextFieldProps };
