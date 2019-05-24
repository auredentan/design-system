import React, { useRef, useState } from 'react';

import classNames from 'classnames';

import { IPopperOffsets, Popover, PopperPositions } from 'LumX/components/popover/react/Popover';
import { COMPONENT_PREFIX } from 'LumX/core/react/constants';
import { useClickAway } from 'LumX/core/react/hooks';
import { handleBasicClasses, onEscapePressed } from 'LumX/core/utils';
import { IGenericProps, getRootClassName } from 'LumX/react/utils';

/////////////////////////////

/**
 * Defines the props of the component.
 */
interface IDropdownProps extends IGenericProps {
    /** Whether a click anywhere out of the Dropdown would close it. */
    closeOnClick?: boolean;
    /** Whether an escape key press would close the Dropdown. */
    escapeClose?: boolean;
    /** Vertical and/or horizontal offsets that will be applied to the Dropdown position. */
    offset?: IPopperOffsets;
    /** The preferred Dropdown location against the toggle element. */
    position?: PopperPositions | string;
    /** The reference element that will be used as the toggle of the Dropdown. */
    toggleElement: React.ReactNode;
    /** The width of the dropdown container. */
    width?: number;
}
type DropdownProps = IDropdownProps;

/////////////////////////////

/**
 * Define the types of the default props.
 */
interface IDefaultPropsType extends Partial<DropdownProps> {}

/////////////////////////////
//                         //
//    Public attributes    //
//                         //
/////////////////////////////

/**
 * The display name of the component.
 */
const COMPONENT_NAME = `${COMPONENT_PREFIX}Dropdown`;

/**
 * The default class name and classes prefix for this component.
 */
const CLASSNAME: string = getRootClassName(COMPONENT_NAME);

/**
 * The default value of props.
 */
const DEFAULT_PROPS: IDefaultPropsType = {
    closeOnClick: true,
    escapeClose: true,
};

/////////////////////////////

/**
 * Displays a dropdown.
 *
 * @return The component.
 */
const Dropdown: React.FC<DropdownProps> = ({
    children,
    className = '',
    closeOnClick = DEFAULT_PROPS.closeOnClick,
    escapeClose = DEFAULT_PROPS.escapeClose,
    offset,
    position,
    toggleElement,
    width,
}: DropdownProps): React.ReactElement => {
    const wrapperRef: React.RefObject<HTMLDivElement> = useRef(null);
    const [isOpen, setIsOpen]: [boolean, (isOpen: boolean) => void] = useState(Boolean(false));

    function closeDropdown(): void {
        setIsOpen(false);
    }

    function toggleDropdown(): void {
        setIsOpen(!isOpen);
    }

    const anchorElement: React.ReactNode = (
        <div className={`${CLASSNAME}__toggle`} onClick={toggleDropdown}>
            {toggleElement}
        </div>
    );

    const popperElement: React.ReactNode = isOpen && (
        <div className={`${CLASSNAME}__menu`} style={{ width }}>
            <div className={`${CLASSNAME}__content`}>{children(setIsOpen)}</div>
        </div>
    );

    // Any click away from the dropdown container will close it.
    useClickAway(wrapperRef, () => {
        if (!closeOnClick) {
            return;
        }
        closeDropdown();
    });

    return (
        <div
            className={classNames(className, handleBasicClasses({ prefix: CLASSNAME }), {
                [`${CLASSNAME}--has-toggle`]: toggleElement,
            })}
            ref={wrapperRef}
            onKeyDown={escapeClose ? onEscapePressed(closeDropdown) : null}
        >
            <Popover
                anchorElement={anchorElement}
                showPopper={isOpen}
                popperElement={popperElement}
                popperOffset={offset}
                popperPlacement={position}
            />
        </div>
    );
};
Dropdown.displayName = COMPONENT_NAME;

/////////////////////////////

export { CLASSNAME, DEFAULT_PROPS, Dropdown, DropdownProps };
