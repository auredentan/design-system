import { ICommonSetup } from 'LumX/core/testing/utils.test';

import { LxButtonRootProps } from './LxButtonRoot';

/////////////////////////////

import React from 'react';

import { shallow, ShallowWrapper } from 'enzyme';

import { LxButtonRoot } from './LxButtonRoot';

/////////////////////////////

/**
 * The URL to use as test URL.
 *
 * @type {string}
 * @constant
 * @readonly
 */
const TEST_URL: string = 'https://www.lumapps.com';

/////////////////////////////

/**
 * Define the overriding properties waited by the `setup` function.
 */
interface ISetupProps extends Partial<LxButtonRootProps> {}

/**
 * Defines what the `setup` function will return.
 */
interface ISetup extends ICommonSetup {
    props: ISetupProps;

    /**
     * The <a> element when the <LxButton> receives a `href` prop.
     */
    a: ShallowWrapper;

    /**
     * The <button> element when the <LxButton> does not receives a `href` prop.
     */
    button: ShallowWrapper;
}

/////////////////////////////

/**
 * Mounts the component and returns common DOM elements / data needed in multiple tests further down.
 *
 * @param  {ISetupProps} props  The props to use to override the default props of the component.
 * @return {ISetup}      An object with the props, the component wrapper and some shortcut to some element inside of the
 *                       component.
 */
const setup = ({ ...propsOverrides }: ISetupProps = {}): ISetup => {
    const props: LxButtonRootProps = {
        children: 'Label',
        ...propsOverrides,
    };

    const wrapper: ShallowWrapper = shallow(<LxButtonRoot {...props} />);

    return {
        a: wrapper.find('a'),
        button: wrapper.find('button'),

        props,
        wrapper,
    };
};

describe(`<${LxButtonRoot.displayName}>`, (): void => {
    // 1. Test render via snapshot (default states of component).
    describe('Snapshots and structure', (): void => {
        it('should render correctly as a button', (): void => {
            const { a, button, wrapper }: ISetup = setup();
            expect(wrapper).toMatchSnapshot();

            expect(a.exists()).toEqual(false);
            expect(button.exists()).toEqual(true);
        });

        it('should render correctly as a link', (): void => {
            const { a, button, wrapper }: ISetup = setup({ href: TEST_URL });
            expect(wrapper).toMatchSnapshot();

            expect(a.exists()).toEqual(true);
            expect(button.exists()).toEqual(false);
        });
    });

    /////////////////////////////

    // 2. Test defaultProps value and important props custom values.

    describe('Props', (): void => {
        it('can be disabled', (): void => {
            const testedProp: string = 'disabled';
            const modifiedProps: ISetupProps = {
                [testedProp]: 'true',
            };

            const { button }: ISetup = setup(modifiedProps);

            expect(button.prop(testedProp)).toEqual(modifiedProps[testedProp]);

            /////////////////////////////

            modifiedProps.href = TEST_URL;

            const { a }: ISetup = setup(modifiedProps);

            expect(a.prop(testedProp)).toEqual(modifiedProps[testedProp]);
        });

        it('should use the given `href`', (): void => {
            const testedProp: string = 'href';
            const modifiedProps: ISetupProps = {
                [testedProp]: TEST_URL,
            };

            const { a }: ISetup = setup(modifiedProps);

            expect(a.prop(testedProp)).toEqual(modifiedProps[testedProp]);
        });

        it('should use the given `target`', (): void => {
            const testedProp: string = 'href';
            const modifiedProps: ISetupProps = {
                [testedProp]: '_blank',
                href: TEST_URL,
            };

            const { a }: ISetup = setup(modifiedProps);

            expect(a.prop(testedProp)).toEqual(modifiedProps[testedProp]);
        });

        it('should forward any CSS class', (): void => {
            const testedProp: string = 'className';
            const modifiedProps: ISetupProps = {
                [testedProp]: 'component component--is-tested',
            };

            const { button }: ISetup = setup(modifiedProps);

            expect(button.prop(testedProp)).toEqual(modifiedProps[testedProp]);

            /////////////////////////////

            modifiedProps.href = TEST_URL;

            const { a }: ISetup = setup(modifiedProps);

            expect(a.prop(testedProp)).toEqual(modifiedProps[testedProp]);
        });

        it('should forward any other prop', (): void => {
            const testedProp: string = 'winter';
            const modifiedProps: ISetupProps = {
                [testedProp]: 'is coming',
            };

            const { button }: ISetup = setup(modifiedProps);

            expect(button.prop(testedProp)).toEqual(modifiedProps[testedProp]);

            /////////////////////////////

            modifiedProps.href = TEST_URL;

            const { a }: ISetup = setup(modifiedProps);

            expect(a.prop(testedProp)).toEqual(modifiedProps[testedProp]);
        });
    });

    /////////////////////////////

    // 3. Test events.

    /////////////////////////////

    // 4. Test conditions (i.e. things that display or not in the UI based on props).
    describe('Conditions', (): void => {
        it('should fail when no child is given', (): void => {
            expect(
                (): void => {
                    setup({ children: null });
                },
            ).toThrowErrorMatchingSnapshot();
        });
    });

    /////////////////////////////

    // 5. Test state.
});
