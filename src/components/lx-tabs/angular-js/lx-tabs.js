import '../style/lx-tabs.scss';

/////////////////////////////

function lxTabsController() {
    // eslint-disable-next-line consistent-this
    const lxTabs = this;

    /////////////////////////////
    //                         //
    //    Private attributes   //
    //                         //
    /////////////////////////////

    /**
     * The enter key code.
     *
     * @type {number}
     * @constant
     * @readonly
     */
    const _ENTER_KEY_CODE = 13;

    /////////////////////////////
    //                         //
    //    Public attributes    //
    //                         //
    /////////////////////////////

    /**
     * The lactive tab index.
     *
     * @type {number}
     */
    lxTabs.activeTab = angular.isDefined(lxTabs.activeTab) ? lxTabs.activeTab : 0;

    /**
     * The list of tabs.
     *
     * @type {Array}
     */
    lxTabs.tabs = [];

    /////////////////////////////
    //                         //
    //     Public functions    //
    //                         //
    /////////////////////////////

    /**
     * Add a tab to the list of tabs.
     *
     * @param {Object} tabToAdd The tab to add.
     */
    function addTab(tabToAdd) {
        lxTabs.tabs.push(tabToAdd);
    }

    /**
     * Check if a given tab is active.
     *
     * @param  {number}  tabIndex The tab index.
     * @return {boolean} Wether the given tab is active or not.
     */
    function isTabActive(tabIndex) {
        return lxTabs.activeTab === tabIndex;
    }

    /**
     * Remove the given tab.
     *
     * @param {Object} tabToRemove The tab to remove.
     */
    function removeTab(tabToRemove) {
        lxTabs.tabs.splice(tabToRemove.index, 1);

        angular.forEach(lxTabs.tabs, (tab, index) => {
            tab.index = index;
        });

        if (lxTabs.tabs.length > 0) {
            lxTabs.setActiveTab(lxTabs.tabs[0]);
        }
    }

    /**
     * Set the given tab as active.
     *
     * @param {Object} tab   The tab.
     * @param {Event}  [evt] The key event.
     */
    function setActiveTab(tab, evt) {
        if (tab.isDisabled || (angular.isDefined(evt) && evt.which !== _ENTER_KEY_CODE)) {
            return;
        }

        lxTabs.activeTab = tab.index;
    }

    /**
     * Update the given tab.
     *
     * @param {Object} updatedTab The tab to update.
     */
    function updateTab(updatedTab) {
        angular.forEach(lxTabs.tabs, (tab) => {
            if (tab.uuid === updatedTab.uuid) {
                tab = updatedTab;
            }
        });
    }

    /////////////////////////////

    lxTabs.addTab = addTab;
    lxTabs.isTabActive = isTabActive;
    lxTabs.removeTab = removeTab;
    lxTabs.setActiveTab = setActiveTab;
    lxTabs.updateTab = updateTab;
}

/////////////////////////////

function lxTabsDirective() {
    return {
        bindToController: true,
        controller: lxTabsController,
        controllerAs: 'lxTabs',
        replace: true,
        restrict: 'E',
        scope: {
            activeTab: '=?lxActiveTab',
            layout: '@?lxLayout',
            position: '@?lxPosition',
            theme: '@?lxTheme',
        },
        template: require('./lx-tabs.html'),
        transclude: true,
    };
}

/////////////////////////////

angular.module('lumx.tabs').directive('lxTabs', lxTabsDirective);

/////////////////////////////

export { lxTabsDirective };
