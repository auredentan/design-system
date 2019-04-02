import { mdiDotsVertical } from 'LumX/icons';

/////////////////////////////

function DemoExpansionPanelController() {
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
        mdiDotsVertical,
    };
}

/////////////////////////////

angular.module('design-system').controller('DemoExpansionPanelController', DemoExpansionPanelController);

/////////////////////////////

export { DemoExpansionPanelController };
