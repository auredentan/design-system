import React, { ReactElement, useCallback } from 'react';

import classNames from 'classnames';

import { Icon, Size } from 'LumX';
import { COMPONENT_PREFIX } from 'LumX/core/react/constants';
import { IGenericProps, getRootClassName } from 'LumX/core/react/utils';
import { handleBasicClasses, onEnterPressed } from 'LumX/core/utils';

import { mdiArrowDown, mdiArrowUp } from 'LumX/icons';

import isFunction from 'lodash/isFunction';

/////////////////////////////

/**
 * The authorized values for the `sortOrder` prop.
 */
enum ThOrder {
    asc = 'asc',
    desc = 'desc',
}

/**
 * The authorized values for the `scope` prop.
 */
enum ThScope {
    col = 'col',
    row = 'row',
}

/**
 * The authorized variants.
 */
enum TableCellVariant {
    body = 'body',
    head = 'head',
}

/////////////////////////////

/**
 * Defines the props of the component.
 */
interface ITableCellProps extends IGenericProps {
    /**
     * The mdi name of the icon (thead only).
     */
    icon?: string;

    /**
     * Whether the column is sortable or not (thead only).
     */
    isSortable?: boolean;

    /**
     * The scope of the thead.
     */
    scope?: ThScope;

    /**
     * The initial sort order (sortable thead only).
     */
    sortOrder?: ThOrder;

    /**
     * The variant of the cell.
     */
    variant?: TableCellVariant;

    /**
     * The function to call when we click on an order button.
     */
    onHeaderClick?(): void;
}
type TableCellProps = ITableCellProps;

/////////////////////////////

/**
 * Define the types of the default props.
 */
interface IDefaultPropsType extends Partial<TableCellProps> {
    variant: TableCellVariant;
}

/////////////////////////////
//                         //
//    Public attributes    //
//                         //
/////////////////////////////

/**
 * The display name of the component.
 */
const COMPONENT_NAME = `${COMPONENT_PREFIX}TableCell`;

/**
 * The default class name and classes prefix for this component.
 */
const CLASSNAME: string = getRootClassName(COMPONENT_NAME, true);

/**
 * The default value of props.
 */
const DEFAULT_PROPS: IDefaultPropsType = {
    onHeaderClick: undefined,
    variant: TableCellVariant.body,
};

/////////////////////////////

/**
 * The TableCell component displays an HTML Table Header Cell.
 *
 * @return The component.
 */
const TableCell: React.FC<TableCellProps> = ({
    children,
    className = '',
    icon,
    isSortable,
    onHeaderClick = DEFAULT_PROPS.onHeaderClick,
    sortOrder,
    variant = DEFAULT_PROPS.variant,
    ...props
}: TableCellProps): ReactElement => {
    /**
     * Handle click on the ordered thead.
     */
    const handleOnHeaderClick = useCallback(() => {
        if (isFunction(onHeaderClick)) {
            onHeaderClick();
        }
    }, [onHeaderClick]);

    return (
        <>
            {variant === TableCellVariant.head && (
                <th
                    className={classNames(
                        handleBasicClasses({ prefix: CLASSNAME, isSortable }),
                        className,
                        `${CLASSNAME}--head`,
                        {
                            [`${CLASSNAME}--is-sorted`]: isSortable && sortOrder,
                        },
                    )}
                    tabIndex={isSortable && isFunction(onHeaderClick) ? 0 : -1}
                    onClick={handleOnHeaderClick}
                    onKeyDown={onEnterPressed(handleOnHeaderClick)}
                    {...props}
                >
                    <div className={`${CLASSNAME}-wrapper`}>
                        {icon && !isSortable && <Icon className={`${CLASSNAME}-icon`} icon={icon} size={Size.xxs} />}

                        {isSortable && sortOrder === ThOrder.asc && (
                            <Icon className={`${CLASSNAME}-icon`} icon={mdiArrowUp} size={Size.xxs} />
                        )}

                        {isSortable && sortOrder === ThOrder.desc && (
                            <Icon className={`${CLASSNAME}-icon`} icon={mdiArrowDown} size={Size.xxs} />
                        )}

                        <div className={`${CLASSNAME}-content`}>{children}</div>
                    </div>
                </th>
            )}

            {variant === TableCellVariant.body && (
                <td
                    className={classNames(className, handleBasicClasses({ prefix: CLASSNAME }), `${CLASSNAME}--body`)}
                    {...props}
                >
                    <div className={`${CLASSNAME}-content`}>{children}</div>
                </td>
            )}
        </>
    );
};
TableCell.displayName = COMPONENT_NAME;

/////////////////////////////

export { CLASSNAME, DEFAULT_PROPS, TableCell, TableCellProps, TableCellVariant, ThOrder, ThScope };
