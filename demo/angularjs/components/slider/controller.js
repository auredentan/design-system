import { mdiFileDocumentBoxOutline, mdiMenu } from 'LumX/icons';

/////////////////////////////

function DemoSliderController() {
    'ngInject';

    const vm = this;

    /////////////////////////////
    //                         //
    //    Public attributes    //
    //                         //
    /////////////////////////////

    /**
     * The icons to use in the template.
     *
     * @type {Object}
     * @constant
     * @readonly
     */
    vm.icons = {
        mdiFileDocumentBoxOutline,
        mdiMenu,
    };
}

/////////////////////////////

angular.module('design-system').controller('DemoSliderController', DemoSliderController);

/////////////////////////////

export { DemoSliderController };
