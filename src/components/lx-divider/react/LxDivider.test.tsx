import { ICommonSetup } from 'LumX/core/testing/utils.test';

/////////////////////////////

import React from 'react';

import { shallow, ShallowWrapper } from 'enzyme';

import { getBasicClass } from 'LumX/core/utils';

import { CLASSNAME, DEFAULT_PROPS, LxDivider, LxDividerProps, Themes } from './LxDivider';

/////////////////////////////

/**
 * Define the overriding properties waited by the `setup` function.
 */
type ISetupProps = Partial<LxDividerProps>;

/**
 * Defines what the `setup` function will return.
 */
interface ISetup extends ICommonSetup {
    props: ISetupProps;

    /**
     * The <hr> element.
     */
    hr: ShallowWrapper;
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
    const props: LxDividerProps = {
        children: 'Label',
        ...propsOverrides,
    };

    const wrapper: ShallowWrapper = shallow(<LxDivider {...props} />);

    return {
        hr: wrapper.find('hr'),

        props,
        wrapper,
    };
};

describe(`<${LxDivider.displayName}>`, (): void => {
    // 1. Test render via snapshot (default states of component).
    describe('Snapshots and structure', (): void => {
        it('should render correctly', (): void => {
            const { hr, wrapper }: ISetup = setup();
            expect(wrapper).toMatchSnapshot();

            expect(hr.exists()).toEqual(true);
            expect(hr.prop('className')).toContain(CLASSNAME);
        });
    });

    /////////////////////////////

    // 2. Test defaultProps value and important props custom values.
    describe('Props', (): void => {
        it('should use default props', (): void => {
            const { hr }: ISetup = setup();

            Object.keys(DEFAULT_PROPS).forEach(
                (prop: string): void => {
                    expect(
                        hr.hasClass(getBasicClass({ prefix: CLASSNAME, type: prop, value: DEFAULT_PROPS[prop] })),
                    ).toEqual(true);
                },
            );
        });

        it('should use the given `theme`', (): void => {
            const testedProp: string = 'theme';
            const modifiedProps: ISetupProps = {
                [testedProp]: Themes.dark,
            };

            const { hr }: ISetup = setup(modifiedProps);

            expect(
                hr.hasClass(getBasicClass({ prefix: CLASSNAME, type: testedProp, value: modifiedProps[testedProp] })),
            ).toEqual(true);
            expect(
                hr.hasClass(getBasicClass({ prefix: CLASSNAME, type: testedProp, value: DEFAULT_PROPS[testedProp] })),
            ).toEqual(false);
        });

        it('should forward any CSS class', (): void => {
            const testedProp: string = 'className';
            const modifiedProps: ISetupProps = {
                [testedProp]: 'component component--is-tested',
            };

            const { hr }: ISetup = setup(modifiedProps);

            expect(hr.prop(testedProp)).toContain(CLASSNAME);
            expect(hr.prop(testedProp)).toContain(modifiedProps[testedProp]);
        });

        it('should forward any other prop', (): void => {
            const testedProp: string = 'winter';
            const modifiedProps: ISetupProps = {
                [testedProp]: 'is coming',
            };

            const { hr }: ISetup = setup(modifiedProps);

            expect(hr.prop(testedProp)).toEqual(modifiedProps[testedProp]);
        });
    });

    /////////////////////////////

    // 3. Test events.
    describe('Events', (): void => {
        // Nothing to do here.
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
});
