import { Categories, Category, DemoObject } from 'LumX/demo/react/constants';

/////////////////////////////

/**
 * The title of the demo.
 */
const title: string = 'Buttons';

/**
 * The category of the demo.
 */
const category: Category = Categories.components;

/**
 * The description of the component.
 */
const description: string =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eu sem et mauris convallis tempor. Mauris placerat enim eget ligula fermentum, in aliquam lorem congue. Vivamus lacinia consectetur mollis.';

const demos: { [demoName: string]: DemoObject } = {
    /* tslint:disable: object-literal-sort-keys */
    default: {
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eu sem et mauris convallis tempor. Mauris placerat enim eget ligula fermentum, in aliquam lorem congue. Vivamus lacinia consectetur mollis.',
        title: 'Default',
    },
    sizes: {
        title: 'Buttons sizes',
    },
    disabled: {
        title: 'Disabled',
    },
    'with-icons': {
        title: 'With icon(s)',
    },
    dropdown: {
        title: 'Dropdown buttons',
    },
    /* tslint:enable: object-literal-sort-keys */
};

/////////////////////////////

/*
 * Important Note: for the dynamic loading of the demo component in the Main component, you have to assign your demo
 * JSX to the `Component` export.
 * You must also have a `title` export.
 * You should also have `category`, `description` exports.
 */
export { category, description, title, demos };
