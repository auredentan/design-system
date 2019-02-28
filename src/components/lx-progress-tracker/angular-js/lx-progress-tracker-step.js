import { mdiAlertCircle, mdiCheckCircle, mdiRadioboxBlank, mdiRadioboxMarked } from '@lumx/icons';

import template from './lx-progress-tracker-step.html';

/////////////////////////////

function lxProgressTrackerStepController($scope, $element) {
    // eslint-disable-next-line consistent-this
    const lxProgressTrackerStep = this;

    /////////////////////////////
    //                         //
    //    Private attributes   //
    //                         //
    /////////////////////////////

    /**
     * The parentController.
     *
     * @type {Object}
     */
    let _parentController;

    /////////////////////////////
    //                         //
    //     Public functions    //
    //                         //
    /////////////////////////////

    /**
     * Get step icon according to its state.
     *
     * @return {string} The icon path.
     */
    function getIcon() {
        if (lxProgressTrackerStep.isComplete) {
            return mdiCheckCircle;
        }

        if (lxProgressTrackerStep.isActive) {
            if (lxProgressTrackerStep.hasError) {
                return mdiAlertCircle;
            }

            return mdiRadioboxMarked;
        }

        return mdiRadioboxBlank;
    }

    /**
     * Wheter the step is clickable or not.
     *
     * @return {boolean} Wheter the step is clickable or not.
     */
    function isClickable() {
        return (
            lxProgressTrackerStep.isActive ||
            lxProgressTrackerStep.isComplete ||
            $element.prev().hasClass('lx-progress-tracker-step--is-complete')
        );
    }

    /**
     * Set parent controller.
     *
     * @param {Object} parentController The parent controller.
     */
    function setParentController(parentController) {
        _parentController = parentController;
    }

    /////////////////////////////

    lxProgressTrackerStep.getIcon = getIcon;
    lxProgressTrackerStep.isClickable = isClickable;
    lxProgressTrackerStep.setParentController = setParentController;

    /////////////////////////////
    //                         //
    //        Watchers         //
    //                         //
    /////////////////////////////

    /**
     * Watch for any changes of the step active step to update the progress bar.
     *
     * @param {boolean} isActive Whether the step is active or not.
     */
    $scope.$watch('lxProgressTrackerStep.isActive', function isActiveWatcher(isActive, wasActive) {
        if (isActive !== wasActive) {
            if (isActive) {
                _parentController.setActiveStep($element.index());
            }
        }
    });
}

/////////////////////////////

function lxProgressTrackerStepDirective() {
    function link(scope, el, attrs, ctrls) {
        ctrls[1].increaseStepCount();
        ctrls[0].setParentController(ctrls[1]);
    }

    return {
        bindToController: true,
        controller: lxProgressTrackerStepController,
        controllerAs: 'lxProgressTrackerStep',
        link,
        replace: true,
        require: ['lxProgressTrackerStep', '^lxProgressTracker'],
        restrict: 'E',
        scope: {
            hasError: '=?lxHasError',
            helper: '@?lxHelper',
            isActive: '=?lxIsActive',
            isComplete: '=?lxIsComplete',
            label: '@lxLabel',
        },
        template,
    };
}

/////////////////////////////

angular.module('lumx.progress-tracker').directive('lxProgressTrackerStep', lxProgressTrackerStepDirective);

/////////////////////////////

export { lxProgressTrackerStepDirective };
