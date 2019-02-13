import '../style/lx-select.scss';

/////////////////////////////

function lxSelectController($document, $filter, $interpolate, $sce, $scope, LxDropdownService, LxUtilsService) {
    // eslint-disable-next-line consistent-this
    const lxSelect = this;

    /////////////////////////////
    //                         //
    //    Private attributes   //
    //                         //
    /////////////////////////////

    /**
     * The down key code.
     *
     * @type {number}
     * @constant
     * @readonly
     */
    const _DOWN_KEY_CODE = 40;

    /**
     * The enter key code.
     *
     * @type {number}
     * @constant
     * @readonly
     */
    const _ENTER_KEY_CODE = 13;

    /**
     * The up key code.
     *
     * @type {number}
     * @constant
     * @readonly
     */
    const _UP_KEY_CODE = 38;

    /**
     * The choice template.
     *
     * @type {string}
     */
    let _choiceTemplate;

    /**
     * The model controller.
     *
     * @type {Object}
     */
    // eslint-disable-next-line one-var
    let _modelController;

    /**
     * The selected template.
     *
     * @type {string}
     */
    // eslint-disable-next-line one-var
    let _selectedTemplate;

    /////////////////////////////
    //                         //
    //    Public attributes    //
    //                         //
    /////////////////////////////

    /**
     * The active choice index useful when navigating with keybord arrow keys.
     *
     * @type {number}
     */
    lxSelect.activeChoiceIndex = 0;

    /**
     * Wether the dropdown is open or not.
     *
     * @type {boolean}
     */
    lxSelect.isOpen = false;

    /**
     * The dropdown unique identifier.
     *
     * @type {string}
     */
    lxSelect.dropdownUuid = LxUtilsService.generateUUID();

    /**
     * The filter model.
     *
     * @type {string}
     */
    lxSelect.filterModel = undefined;

    /**
     * The dropdown target unique identifier.
     *
     * @type {string}
     */
    lxSelect.targetUuid = LxUtilsService.generateUUID();

    /**
     * The model view value.
     *
     * @type {string}
     */
    lxSelect.viewValue = undefined;

    /////////////////////////////
    //                         //
    //    Private functions    //
    //                         //
    /////////////////////////////

    /**
     * Returns the object index in an array.
     *
     * @param  {Array}  arr The array to check in.
     * @param  {Object} obj The object to check.
     * @return {number} The object index.
     */
    function _arrayObjectIndexOf(arr, obj) {
        for (let i = 0, len = arr.length; i < len; i++) {
            if (angular.equals(obj, arr[i])) {
                return i;
            }
        }

        return -1;
    }

    /**
     * Init view value.
     */
    function _initViewValue() {
        if (angular.isDefined(lxSelect.modelToSelection)) {
            if (lxSelect.multiple) {
                lxSelect.viewValue = [];

                angular.forEach(_modelController.$viewValue, (item) => {
                    lxSelect.modelToSelection({
                        // eslint-disable-next-line id-blacklist
                        callback(response) {
                            lxSelect.viewValue.push(response);
                        },
                        // eslint-disable-next-line id-blacklist
                        data: item,
                    });
                });
            } else {
                lxSelect.modelToSelection({
                    // eslint-disable-next-line id-blacklist
                    callback(response) {
                        lxSelect.viewValue = response;
                    },
                    // eslint-disable-next-line id-blacklist
                    data: _modelController.$viewValue,
                });
            }
        } else {
            lxSelect.viewValue = _modelController.$viewValue;
        }
    }

    /**
     * Increase active choice index on key down press.
     */
    function _nextChoiceOnKeyDown() {
        const filteredChoices = $filter('lxSelectChoicesFilter')(
            lxSelect.choices,
            lxSelect.filter,
            lxSelect.filterModel,
        );

        if (lxSelect.activeChoiceIndex + 1 >= filteredChoices.length) {
            lxSelect.activeChoiceIndex = 0;
        } else {
            lxSelect.activeChoiceIndex += 1;
        }
    }

    /**
     * Decrease active choice index on key up press.
     */
    function _previousChoiceOnKeyUp() {
        const filteredChoices = $filter('lxSelectChoicesFilter')(
            lxSelect.choices,
            lxSelect.filter,
            lxSelect.filterModel,
        );

        if (lxSelect.activeChoiceIndex === 0) {
            lxSelect.activeChoiceIndex = filteredChoices.length - 1;
        } else {
            lxSelect.activeChoiceIndex -= 1;
        }
    }

    /**
     * Select choice from filtered list according to active choice index.
     */
    function _selectChoiceOnKeyEnter() {
        const filteredChoices = $filter('lxSelectChoicesFilter')(
            lxSelect.choices,
            lxSelect.filter,
            lxSelect.filterModel,
        );

        lxSelect.select(filteredChoices[lxSelect.activeChoiceIndex]);
    }

    /**
     * Select item synchronously (no selectiontoModel).
     *
     * @param {Object} choice The choice object.
     */
    function _updateModel(choice) {
        let updatedModel;

        if (lxSelect.multiple) {
            updatedModel = angular.copy(_modelController.$viewValue);

            const choiceIndex = _arrayObjectIndexOf(_modelController.$viewValue, choice);

            if (choiceIndex === -1) {
                updatedModel.push(choice);
            } else {
                updatedModel.splice(choiceIndex, 1);
            }
        } else {
            updatedModel = choice;
        }

        _modelController.$setViewValue(updatedModel);
    }

    /**
     * Update view value on select.
     *
     * @param {Object} choice The choice object.
     */
    function _updateViewValue(choice) {
        if (lxSelect.multiple) {
            const choiceIndex = _arrayObjectIndexOf(lxSelect.viewValue, choice);

            if (choiceIndex === -1) {
                lxSelect.viewValue.push(choice);
            } else {
                lxSelect.viewValue.splice(choiceIndex, 1);
            }
        } else {
            lxSelect.viewValue = choice;
        }
    }

    /**
     * Handle key events on input rapper focus.
     *
     * @param {Event} evt The key event.
     */
    function _onKeyUp(evt) {
        if (evt.keyCode === _DOWN_KEY_CODE) {
            if (lxSelect.isOpen) {
                _nextChoiceOnKeyDown();
                $scope.$apply();
            } else {
                lxSelect.openDropdown();
            }
        } else if (evt.keyCode === _UP_KEY_CODE) {
            if (lxSelect.isOpen) {
                _previousChoiceOnKeyUp();
                $scope.$apply();
            }
        } else if (evt.keyCode === _ENTER_KEY_CODE) {
            if (lxSelect.isOpen) {
                _selectChoiceOnKeyEnter();
                $scope.$apply();

                if (!lxSelect.multiple) {
                    lxSelect.closeDropdown();
                }
            }
        }

        evt.stopPropagation();
    }

    /////////////////////////////
    //                         //
    //     Public functions    //
    //                         //
    /////////////////////////////

    /**
     * Clear the model on clear button click.
     *
     * @param {Event} [evt] The event that triggered the function.
     */
    function clearModel(evt) {
        _modelController.$setViewValue(undefined);

        evt.stopPropagation();
    }

    /**
     * Close the dropdown menu.
     */
    function closeDropdown() {
        LxDropdownService.close(lxSelect.dropdownUuid);
    }

    /**
     * Disable key events on input wrapper blur.
     */
    function disableKeyEvents() {
        $document.off('keyup', _onKeyUp);
    }

    /**
     * Display the choice according to the choice template.
     *
     * @param  {Object} choice The choice object.
     * @return {string} The choice label.
     */
    function displayChoice(choice) {
        const choiceScope = {
            $choice: choice,
        };

        const interpolatedChoice = $interpolate(_choiceTemplate)(choiceScope);

        return $sce.trustAsHtml(interpolatedChoice);
    }

    /**
     * Display the selected item according to the selected template.
     *
     * @param  {Object} [selected] The selected object.
     * @return {string} The selected label.
     */
    function displaySelected(selected) {
        const selectedScope = {
            $selected: angular.isDefined(selected) ? selected : lxSelect.viewValue,
        };

        const interpolatedSelected = $interpolate(_selectedTemplate)(selectedScope);

        return $sce.trustAsHtml(interpolatedSelected);
    }

    /**
     * Enable key events on input wrapper focus.
     */
    function enableKeyEvents() {
        $document.on('keyup', _onKeyUp);
    }

    /**
     * Check if the model is empty.
     *
     * @return {boolean} Wether the model is empty or not.
     */
    function isModelEmpty() {
        if (lxSelect.multiple) {
            return _modelController.$viewValue.length === 0;
        }

        return angular.isUndefined(_modelController.$viewValue);
    }

    /**
     * Check if a choice is selected.
     *
     * @param  {Object}  choice The choice object.
     * @return {boolean} Wether the choice is selected or not.
     */
    function isSelected(choice) {
        if (lxSelect.multiple) {
            return _arrayObjectIndexOf(lxSelect.viewValue, choice) !== -1;
        }

        return angular.equals(choice, lxSelect.viewValue);
    }

    /**
     * Open the dropdown menu on input wrapper click.
     */
    function openDropdown() {
        LxDropdownService.open(lxSelect.dropdownUuid, `#${lxSelect.targetUuid}`);
    }

    /**
     * Register the choice template.
     *
     * @param {string} choiceTemplate The choice template.
     */
    function registerChoiceTemplate(choiceTemplate) {
        _choiceTemplate = choiceTemplate;
    }

    /**
     * Select the selected template.
     *
     * @param {string} selectedTemplate The choice template.
     */
    function registerSelectedTemplate(selectedTemplate) {
        _selectedTemplate = selectedTemplate;
    }

    /**
     * Select a choice.
     *
     * @param {Object} choice The choice object.
     * @param {Event}  [evt]  The event that triggered the function.
     */
    function select(choice, evt) {
        if (angular.isDefined(evt) && lxSelect.multiple) {
            evt.stopPropagation();
        }

        if (angular.isDefined(lxSelect.selectionToModel)) {
            lxSelect.selectionToModel({
                // eslint-disable-next-line id-blacklist
                callback(response) {
                    _updateModel(response);
                    _updateViewValue(choice);
                },
                // eslint-disable-next-line id-blacklist
                data: choice,
            });
        } else {
            _updateModel(choice);
            _updateViewValue(choice);
        }
    }

    /**
     * Set the model controller.
     *
     * @param {Object} modelController The model controller.
     */
    function setModelController(modelController) {
        _modelController = modelController;

        _modelController.$render = _initViewValue;
    }

    /**
     * Update choices list according to filter model.
     */
    function updateFilter() {
        lxSelect.activeChoiceIndex = 0;

        if (angular.isDefined(lxSelect.filter)) {
            lxSelect.filter({
                newValue: lxSelect.filterModel,
            });
        }
    }

    /////////////////////////////

    lxSelect.clearModel = clearModel;
    lxSelect.closeDropdown = closeDropdown;
    lxSelect.disableKeyEvents = disableKeyEvents;
    lxSelect.displayChoice = displayChoice;
    lxSelect.displaySelected = displaySelected;
    lxSelect.enableKeyEvents = enableKeyEvents;
    lxSelect.isModelEmpty = isModelEmpty;
    lxSelect.isSelected = isSelected;
    lxSelect.openDropdown = openDropdown;
    lxSelect.registerChoiceTemplate = registerChoiceTemplate;
    lxSelect.registerSelectedTemplate = registerSelectedTemplate;
    lxSelect.select = select;
    lxSelect.setModelController = setModelController;
    lxSelect.updateFilter = updateFilter;

    /////////////////////////////
    //                         //
    //          Events         //
    //                         //
    /////////////////////////////

    /**
     * Add focus class to input wrapper on dropdown open.
     *
     * @param {Event}  evt    The dropdown open event.
     * @param {Object} params The dropdown uuid and the target id.
     */
    $scope.$on('lx-dropdown__open', (evt, params) => {
        if (params.uuid === lxSelect.dropdownUuid) {
            lxSelect.isOpen = true;
        }
    });

    /**
     * Remove focus class to input wrapper on dropdown close.
     *
     * @param {Event}  evt    The dropdown open event.
     * @param {Object} params The dropdown uuid and the target id.
     */
    $scope.$on('lx-dropdown__close', (evt, params) => {
        if (params.uuid === lxSelect.dropdownUuid) {
            lxSelect.isOpen = false;
        }
    });
}

/////////////////////////////

function lxSelectDirective() {
    function link(scope, el, attrs, ctrls, transclude) {
        ctrls[0].setModelController(ctrls[1]);

        transclude(
            scope,
            (clone) => {
                let template = '';

                for (let i = 0; i < clone.length; i++) {
                    template += clone[i].data || clone[i].outerHTML || '';
                }

                ctrls[0].registerChoiceTemplate(template);
            },
            null,
            'choices',
        );

        transclude(
            scope,
            (clone) => {
                let template = '';

                for (let i = 0; i < clone.length; i++) {
                    template += clone[i].data || clone[i].outerHTML || '';
                }

                ctrls[0].registerSelectedTemplate(template);
            },
            null,
            'selected',
        );
    }

    return {
        bindToController: true,
        controller: lxSelectController,
        controllerAs: 'lxSelect',
        link,
        replace: true,
        require: ['lxSelect', 'ngModel'],
        restrict: 'E',
        scope: {
            allowClear: '=lxAllowClear',
            choices: '=lxChoices',
            displayFilter: '=?lxDisplayFilter',
            displayHelper: '=?lxDisplayHelper',
            filter: '&?lxFilter',
            hasError: '=?lxError',
            helper: '@?lxHelper',
            isDisabled: '=?ngDisabled',
            isValid: '=?lxValid',
            label: '@?lxLabel',
            loading: '=?lxLoading',
            modelToSelection: '&?lxModelToSelection',
            multiple: '=?lxMultiple',
            selectionToModel: '&?lxSelectionToModel',
            theme: '@?lxTheme',
        },
        template: require('./lx-select.html'),
        transclude: {
            choices: 'lxSelectChoices',
            selected: 'lxSelectSelected',
        },
    };
}

/////////////////////////////

angular.module('lumx.select').directive('lxSelect', lxSelectDirective);

/////////////////////////////

export { lxSelectDirective };
