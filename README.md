# Enter As Tab JS

Library to transform enter into tab in your web applications.

**Enter As Tab JS** is a quick, easy and simple way to implement the conversion of the Enter key to Tab in web applications.

## Dependencies

**Enter As Tab JS** has no dependencies.

## Installation

To install **enter As Tab JS**, run the npm instalation command:

`npm install enter-as-tab-js`

## Usage

**Enter As Tab JS** acts on a collation of html elements. This collection (which can be an Array) contains the elements that will make up the tabulation cycle. They can be selected by any form of selection and html elements.

In the example provided with the package, we used a `data-east` attribute to indicate which elements in each form would be selected. This way is just a suggestion. You may want to use selection by html tag, or by a specific css class, etc. instead.

```javascript
import enterastab from 'enter-as-tab-js';

const elements = document.getElementById('myform1').querySelectorAll('[data-east]');
enterastab(elements).useTabIndex(true).autoDetectAction(false).cyclic(true).textAreaStrategy('new line').init();

```

See de `example` directory to samples of use.

To run examples, does:

```
cd examples/basic #or cd examples/advanced
npm install
npm run dev --host
```

You will see in the example that it is possible to establish independent cycles between different sets of elements on the same web page.

## Configuration options

To use the library, only the following code needs to be executed:

```javascript
import enterastab from 'enter-as-tab-js';

enterastab(elements).init();

```

`element` is the list of elements that will be part of each tab cycle.

Basically, we call the `enterastab()` function passing the list of elements into the constructor and then call the `init()` method.

Each of the configuration options must be passed through the respective methods after calling the `enterastab()` function and before `.init()`.

The available options are the following:

`useTabIndex(bool)` (default is `false`)
: If `true`, it means that the `tabindex` attribute will be used to define the tab order. To do this, tabindex must start at `0` and be sequential. Additionally, all elements must have the attribute defined. If `false`, the order in which the list is included in the enterastab() function will be used.

`autoDetectAction(bool)` (default is `true`)
: If `true`, the library will automatically detect which elements are action elements. Action elements are those in which the enter key performs some action other than adding a new line. The action items automatically considered are `button` and `a` (link). If `false`, action elements must be indicated by the `data-is-action` attribute. When an action element has the enter key pressed, the default action for the element is performed instead of the tab.

`cyclic(bool)`(default is `false`)
: The library's default behavior when reaching the last element in the list of tabbed elements is to maintain focus on it. If cyclic is `true`, this behavior is changed so that, if the focus is on the last item in the list (if it is not an action element), when pressing enter the focus will be moved to the first item in the list.

`textAreaStrategy(string ['tab', 'new line', 'ctrl+enter'])` (default is `tab`)
: The default behavior of pressing the enter key when the focus is on a `textarea` is to place the focus on the next element. However, if `textAreaStrategy` is set to `new line`, the element will maintain focus and a new line will be added; if set to `ctrl+enter`, a new line will be added and the focus will be kept on the element only if the ctrl+enter combination is pressed, otherwise the focus will move to the next element in the tab.

## Contributing

Contributions are welcome. If you find a bug or have a suggestion for improvement, please consider opening an [issue](https://github.com/everton3x/enter-as-tab-js/issues).

If you want to contribute code, consider taking the following steps:

1. Create a [fork](https://github.com/everton3x/enter-as-tab-js/fork);
2. In your fork, implement the improvements/fixes;
3. Submit a pull request.

Please consider using the [Conventional Commits](conventionalcommits.org) guidelines in your commits.

## Licence
This library is distributed under the [MIT license](https://opensource.org/license/MIT).

## Contributors

[Everton da Rosa](https://github.com/everton3x)
