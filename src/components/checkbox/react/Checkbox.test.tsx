import React, { ReactElement } from 'react';

import { mount, shallow } from 'enzyme';

import { ICommonSetup, Wrapper, commonTestsSuite } from 'LumX/core/testing/utils.test';
import { getBasicClass } from 'LumX/core/utils';

import { CLASSNAME, Checkbox, CheckboxProps } from './Checkbox';

/////////////////////////////

/**
 * Define the overriding properties waited by the `setup` function.
 */
type ISetupProps = Partial<CheckboxProps>;

/**
 * Defines what the `setup` function will return.
 */
interface ISetup extends ICommonSetup {
    props: ISetupProps;

    /**
     * The <div> element that wraps checkbox and children elements.
     */
    wrapper: Wrapper;

    /**
     * The <div> element for the label.
     */
    label: Wrapper;

    /**
     * The <div> element for the helper.
     */
    helper: Wrapper;
}

/////////////////////////////

/**
 * Mounts the component and returns common DOM elements / data needed in multiple tests further down.
 *
 * @param props  The props to use to override the default props of the component.
 * @param     [shallowRendering=true] Indicates if we want to do a shallow or a full rendering.
 * @return      An object with the props, the component wrapper and some shortcut to some element inside of the
 *                       component.
 */
const setup = ({ ...props }: ISetupProps = {}, shallowRendering: boolean = true): ISetup => {
    const renderer: (el: ReactElement) => Wrapper = shallowRendering ? shallow : mount;
    // @ts-ignore
    const wrapper: Wrapper = renderer(<Checkbox {...props} />);

    return {
        helper: wrapper.find(`.${CLASSNAME}__helper`),
        label: wrapper.find('label'),
        props,
        wrapper,
    };
};

describe(`<${Checkbox.displayName}>`, (): void => {
    // 1. Test render via snapshot (default states of component).
    describe('Snapshots and structure', (): void => {
        it('should render correctly', (): void => {
            const { wrapper } = setup();
            expect(wrapper).toMatchSnapshot();

            expect(wrapper).toExist();
            expect(wrapper).toHaveClassName(CLASSNAME);
            expect(wrapper).not.toHaveClassName('lumx-checkbox--is-disabled');
            expect(wrapper).toHaveClassName('lumx-checkbox--is-unchecked');
        });
    });

    /////////////////////////////

    // 2. Test defaultProps value and important props custom values.
    describe('Props', (): void => {
        it('should add a "disabled" and "checked" class names', (): void => {
            const { wrapper } = setup({
                disabled: true,
                value: true,
            });

            expect(wrapper).toHaveClassName(getBasicClass({ prefix: CLASSNAME, type: 'disabled', value: true }));
            expect(wrapper).toHaveClassName(getBasicClass({ prefix: CLASSNAME, type: 'checked', value: true }));
        });

        it('should use the given props', (): void => {
            const { helper, label, wrapper } = setup({
                helper: 'Test helper',
                label: 'Test label',
            });

            expect(helper).toExist();
            expect(label).toExist();
            expect(wrapper).toMatchSnapshot();
        });
    });

    /////////////////////////////

    // 3. Test events.
    describe('Events', (): void => {
        const onChange: jest.Mock = jest.fn();

        beforeEach(
            (): void => {
                onChange.mockClear();
            },
        );

        it('should trigger `onChange` when checkbox is clicked', (): void => {
            const { wrapper } = setup({ value: false, onChange }, false);
            const checkbox = wrapper.find('input');

            checkbox.simulate('change');
            expect(onChange).toHaveBeenCalledWith(true);
        });
    });

    /////////////////////////////

    // 4. Test conditions (i.e. things that display or not in the UI based on props).
    describe('Conditions', (): void => {
        // Nothing to do here.
    });

    /////////////////////////////

    // 5. Test state.
    describe('State', (): void => {
        // Nothing to do here.
    });

    /////////////////////////////

    // Common tests suite.
    commonTestsSuite(setup, { className: 'wrapper', prop: 'wrapper' }, { className: CLASSNAME });
});
