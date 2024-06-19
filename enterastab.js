function enterastab(elements) {
    const config = {
        useTabIndex: false,
        autoDetectAction: true,
        textAreaStrategy: 'tab',
        cyclic: false
    };

    function useTabIndex(value) {
        config.useTabIndex = value;
        return this;
    }

    function autoDetectAction(value) {
        config.autoDetectAction = value;
        return this;
    }

    function cyclic(value) {
        config.cyclic = value;
        return this;
    }

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
    function next(element) {
        if (config.cyclic) {
            if (element.eastIndex === elements.length - 1) {
                elements[0]?.focus();
                return;
            }
        }
        elements[element.eastIndex + 1]?.focus();
    }

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