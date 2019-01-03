(function() {
    'use strict';

    angular.module('lumx.utils.depth', []);
    angular.module('lumx.utils.event-scheduler', []);
    angular.module('lumx.utils.utils', []);

    angular.module('lumx.utils', [
        'lumx.utils.depth',
        'lumx.utils.event-scheduler',
        'lumx.utils.utils',
    ]);

    angular.module('lumx.button', []);
    angular.module('lumx.checkbox', []);
    angular.module('lumx.chip', []);
    angular.module('lumx.dialog', []);
    angular.module('lumx.dropdown', []);
    angular.module('lumx.icon', []);
    angular.module('lumx.list', []);
    angular.module('lumx.notification', []);
    angular.module('lumx.progress', []);
    angular.module('lumx.radio-button', []);
    angular.module('lumx.select', []);
    angular.module('lumx.tabs', []);
    angular.module('lumx.text-field', []);
    angular.module('lumx.theme', []);

    angular.module('lumx', [
        'lumx.button',
        'lumx.checkbox',
        'lumx.chip',
        'lumx.dialog',
        'lumx.dropdown',
        'lumx.icon',
        'lumx.list',
        'lumx.notification',
        'lumx.progress',
        'lumx.radio-button',
        'lumx.select',
        'lumx.tabs',
        'lumx.text-field',
        'lumx.theme',
        'lumx.utils',
    ]);
})();
