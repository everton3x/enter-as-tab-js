/**
 * Initializes a tab cycle for a given set of elements.
 *
 * @param {NodeList} elements - The list of elements to be part of the tab cycle.
 * @return {Object} An object containing methods to configure and initialize the tab cycle.
 * @property {Function} useTabIndex - Sets whether to use the tabindex attribute to define the tab order.
 * @property {Function} autoDetectAction - Sets whether to automatically detect action elements.
 * @property {Function} textAreaStrategy - Sets the strategy for handling enter key in textareas.
 * @property {Function} cyclic - Sets whether to cycle through elements when reaching the end of the tab cycle.
 * @property {Function} init - Initializes the tab cycle.
 */
function enterastab(elements) {

    // Global configs.
    const config = {
        useTabIndex: false,
        autoDetectAction: true,
        textAreaStrategy: 'tab',
        cyclic: false
    };

    /**
     * Sets the value of the `useTabIndex` property in the `config` object and returns the current object.
     * 
     * If `true`, it means that the `tabindex` attribute will be used to define the tab order. 
     * To do this, tabindex must start at `0` and be sequential. 
     * Additionally, all elements must have the attribute defined. 
     * If `false`, the order in which the list is included in the enterastab() function will be used.
     *
     * @param {boolean} value - The new value for the `useTabIndex` property.
     * @return {Object} The current object.
     */
    function useTabIndex(value) {
        config.useTabIndex = value;
        return this;
    }

    /**
     * Sets the value of the `autoDetectAction` property in the `config` object and returns the current object.
     * 
     * If `true`, the library will automatically detect which elements are action elements. 
     * Action elements are those in which the enter key performs some action other than adding a new line. The action items automatically considered are 
     * `button` and `a` (link). If `false`, action elements must be indicated by the `data-is-action` attribute. When an action element has the enter key 
     * pressed, the default action for the element is performed instead of the tab.
     *
     * @param {boolean} value - The new value for the `autoDetectAction` property.
     * @return {Object} The current object.
     */
    function autoDetectAction(value) {
        config.autoDetectAction = value;
        return this;
    }

    /**
     * Sets the value of the `cyclic` property in the `config` object and returns the current object.
     * 
     * The library's default behavior when reaching the last element in the list of tabbed elements is to maintain focus on it. 
     * If cyclic is `true`, this behavior is changed so that, if the focus is on the last item in the list (if it is not an action element), 
     * when pressing enter the focus will be moved to the first item in the list.
     *
     * @param {boolean} value - The new value for the `cyclic` property.
     * @return {Object} The current object.
     */
    function cyclic(value) {
        config.cyclic = value;
        return this;
    }

    /**
     * A function to set the strategy for handling the Enter key in textareas.
     *
     * The default behavior of pressing the enter key when the focus is on a `textarea` is to place the focus on the next element. 
     * However, if `textAreaStrategy` is set to `new line`, the element will maintain focus and a new line will be added; 
     * if set to `ctrl+enter`, a new line will be added and the focus will be kept on the element only if the ctrl+enter combination is pressed, 
     * otherwise the focus will move to the next element in the tab.
     * 
     * @param {string} value - The value representing the textarea strategy.
     * @return {Object} The current object to enable method chaining.
     */
    function textAreaStrategy(value) {
        switch (value) {
            case 'tab':
            case 'new line':
            case 'ctrl+enter':
                break;
            default:
                throw new Error('Invalid textarea strategy!');
        }
        config.selectStrategy = value;
        return this;
    }

    /**
     * Initializes the tab cycle for a given set of elements.
     *
     * @return {void} This function does not return anything.
     */
    function init() {
        if (config.useTabIndex) {
            const sorted = Array.from(elements);
            sorted.sort((a, b) => {
                const tabindexA = parseInt(a.getAttribute('tabindex') || 0);
                const tabindexB = parseInt(b.getAttribute('tabindex') || 0);
                return tabindexA - tabindexB
            });
            elements = sorted;
        }
        elements.forEach((element, index) => {
            element.eastIndex = index;
            setHandler(element);
        });
    }

    /**
     * A function to determine if the element is an action element based on configuration settings.
     *
     * @param {Element} element - The element to check for being an action element.
     * @return {boolean} A boolean indicating if the element is an action element.
     */
    function isAction(element) {
        if (config.autoDetectAction) {
            if (element.tagName === 'BUTTON') {
                return true;
            }
            return false;
        } else {
            if (element.hasAttribute('data-is-action')) {
                return true;
            }
            return false;
        }

    }

    /**
     * Moves the focus to the next element in the tab cycle, if cyclic is true and the current element is not the last one in the cycle.
     *
     * @param {Object} element - The current element in the tab cycle.
     * @return {void} This function does not return anything.
     */
    function next(element) {
        if (config.cyclic) {
            if (element.eastIndex === elements.length - 1) {
                elements[0]?.focus();
                return;
            }
        }
        elements[element.eastIndex + 1]?.focus();
    }

    /**
     * Sets a keydown event listener on the given element to handle the Enter key press.
     * If the element is an action element, the function returns early.
     * If the element is a textarea, the function checks the selectStrategy configuration and performs the appropriate action.
     * If the element is not a textarea, the function prevents the default behavior of the Enter key press and calls the next function with the element as an argument.
     *
     * @param {Element} element - The element to set the keydown event listener on.
     * @return {void} This function does not return anything.
     */
    function setHandler(element) {
        element.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {

                if (isAction(element)) {
                    return;
                }

                if (element.tagName === 'TEXTAREA') {
                    switch (config.selectStrategy) {
                        case 'tab':
                            break;
                        case 'new line':
                            return;
                            break;
                        case 'ctrl+enter':
                            if (event.ctrlKey) {
                                element.value += '\n';
                                event.preventDefault();
                                return;
                            }
                            break;
                    }
                }

                event.preventDefault();
                next(element);

            }
        });
    }

    return {
        useTabIndex,
        autoDetectAction,
        textAreaStrategy,
        cyclic,
        init,
    };
};

export default enterastab;