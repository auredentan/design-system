(function IIFE() {
    'use strict';

    /////////////////////////////

    function DemoRadioButtonController() {
        var vm = this;

        /////////////////////////////
        //                         //
        //    Public attributes    //
        //                         //
        /////////////////////////////

        vm.radioButtons = {
            basic: {
                test1: 'ipsum',
                test2: 'lorem',
            },
            colors: {
                test4: 'lorem'
            },
            states: {
                test3: 'dolor',
            },
        };
    }

    /////////////////////////////

    angular.module('lumx').controller('DemoRadioButtonController', DemoRadioButtonController);
})();
