import React, { ReactElement } from 'react';

import { mount, shallow } from 'enzyme';

import { ICommonSetup, Wrapper, commonTestsSuite } from 'LumX/core/testing/utils.test';
import { getBasicClass } from 'LumX/core/utils';
import { mdiCheck, mdiChevronDown, mdiPlus } from 'LumX/icons';
import { Button, ButtonProps, CLASSNAME, DEFAULT_PROPS } from './Button';

/////////////////////////////

/**
 * Define the overriding properties waited by the `setup` function.
 */
type ISetupProps = Partial<ButtonProps>;

/**
 * Defines what the `setup` function will return.
 */
interface ISetup extends ICommonSetup {
    props: ISetupProps;

    /**
     * ButtonRoot element.
     */
    buttonRoot: Wrapper;

    /**
     * Button icons.
     */
    icon: Wrapper;
}

/**
 * Mounts the component and returns common DOM elements / data needed in multiple tests further down.
 *
 * @param  props                   The props to use to override the default props of the component.
 * @param  [shallowRendering=true] Indicates if we want to do a shallow or a full rendering.
 * @return An object with the props, the component wrapper and some shortcut to some element inside of the component.
 */
const setup = ({ ...props }: ISetupProps = {}, shallowRendering: boolean = true): ISetup => {
    const renderer: (el: ReactElement) => Wrapper = shallowRendering ? shallow : mount;
    // @ts-ignore
    const wrapper: Wrapper = renderer(<Button {...props} />);

    return {
        buttonRoot: wrapper.find('ButtonRoot'),
        icon: wrapper.find('Icon'),
        props,
        wrapper,
    };
};

describe(`<${Button.displayName}>`, () => {
    // 1. Test render via snapshot (default states of component).
    describe('Snapshots and structure', () => {
        it('should render button with label', () => {
            const label = 'Label';
            const { buttonRoot, icon, wrapper } = setup({
                children: label,
            });
            expect(wrapper).toMatchSnapshot();

            expect(buttonRoot).toExist();

            expect(icon).not.toExist();

            expect(buttonRoot.contains(label)).toBeTrue();
        });

        it('should render button with label and right icon', () => {
            const label = 'Label';
            const { buttonRoot, icon, wrapper } = setup({
                children: label,
                rightIcon: mdiChevronDown,
            });
            expect(wrapper).toMatchSnapshot();

            expect(buttonRoot).toExist();

            expect(icon).toExist();
            expect(icon.length).toEqual(1);

            expect(buttonRoot.contains(label)).toBeTrue();
        });

        it('should render button with label and left icon', () => {
            const label = 'Label';
            const { buttonRoot, icon, wrapper } = setup({
                children: label,
                leftIcon: mdiChevronDown,
            });
            expect(wrapper).toMatchSnapshot();

            expect(buttonRoot).toExist();

            expect(icon).toExist();
            expect(icon.length).toEqual(1);

            expect(buttonRoot.contains(label)).toBeTrue();
        });

        it('should render button with label and icons', () => {
            const label = 'Label';
            const { buttonRoot, icon, wrapper } = setup({
                children: label,
                leftIcon: mdiCheck,
                rightIcon: mdiChevronDown,
            });
            expect(wrapper).toMatchSnapshot();

            expect(buttonRoot).toExist();

            expect(icon).toExist();
            expect(icon.length).toEqual(2);

            expect(buttonRoot.contains(label)).toBeTrue();
        });
    });

    /////////////////////////////

    // 2. Test defaultProps value and important props custom values.
    describe('Props', () => {
        it('should use default props', () => {
            const { buttonRoot } = setup();

            const actualProps = buttonRoot.props() as ButtonProps;
            expect(actualProps.variant).toEqual('button');
            for (const [propName, propValue] of Object.entries(DEFAULT_PROPS)) {
                expect(actualProps[propName]).toEqual(propValue);
            }
        });

        it('should forward any CSS class', (): void => {
            const props: Partial<ButtonProps> = {
                className: 'component component--is-tested',
            };
            const { wrapper, buttonRoot } = setup(props);
            expect(wrapper).toMatchSnapshot();

            expect(buttonRoot).toHaveClassName(props.className);
        });

        it('should use the given props for class names', () => {
            const props: Partial<ButtonProps> = {
                leftIcon: mdiChevronDown,
                rightIcon: mdiPlus,
            };
            const { wrapper, buttonRoot } = setup(props);
            expect(wrapper).toMatchSnapshot();

            expect(buttonRoot).toHaveClassName(getBasicClass({ prefix: CLASSNAME, type: 'hasLeftIcon', value: true }));
            expect(buttonRoot).toHaveClassName(getBasicClass({ prefix: CLASSNAME, type: 'hasRightIcon', value: true }));
        });
    });

    /////////////////////////////

    // 3. Test events.
    describe('Events', () => {
        // Nothing to do here.
    });

    /////////////////////////////

    // 4. Test conditions (i.e. things that display or not in the UI based on props).
    describe('Conditions', () => {
        // Nothing to do here.
    });

    /////////////////////////////

    // 5. Test state.
    describe('State', () => {
        // Nothing to do here.
    });

    /////////////////////////////

    // Common tests suite.
    commonTestsSuite(setup, { prop: 'buttonRoot' }, { className: CLASSNAME });
});
