---
showTabs: true
---

## Helper functions

All components have various function helpers, you also can use in projects. This is totally optional and not really a part of the Design System.

- [Component helpers](#component-helpers)
- [General helpers](#general-helpers)

---

### Component helpers

```js
import {
  makeUniqueId,
  toPascalCase
} from 'dnb-ui-lib/shared/component-helper'
```

| Function             | Description                                                                                      | Parameters                                                                       | Return            |
| -------------------- | ------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------- | ----------------- |
| `isTrue`             | Checks if a value is Truthy or Falsy.                                                            | `[String or Boolean or Number]`                                                  | `Boolean`         |
| `isTouchDevice`      | Checks if the target device has touch support.                                                   |                                                                                  | `Boolean`         |
| `toPascalCase`       | Transforms a string containing several words to a [pascalCase](!/uilib/development/naming).      | `[String]`                                                                       | `String`          |
| `detectOutsideClick` | Detects an click outside of the defined target HTML `element` and will then emit the `callback`. | `[element, callback({ event })]`                                                 | `Void`            |
| `filterProps`        | Filters out unwanted entries from either an object or array.                                     | `[props={object or array}, remove={object or array}, allowed={object or array}]` | `object or array` |
| `makeUniqueId`       | Creates a truly unique hash.                                                                     | `[prefix='', length=8]`                                                          | `String`          |
| `slugify`            | Breaks down phrases of words to be URI compatible. Removes special characters.                   | `[String]`                                                                       | `String`          |

### General helpers

| Function                 | Description                                                                                                                     | Parameters                                                    | Return    |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- | --------- |
| `scrollToLocationHashId` | Enhance the native anchor scroll handling by providing additional features like a custom offset.                                | `{ offset: Integer, delay: Integer, onCompletion: Function }` | `Element` |
| `getOffsetTop`           | Get the HTML Element offset to the top of the browser window, minus `offset`.                                                   | `{ offset: Integer }`                                         | `Number`  |
| `applyPageFocus`         | More info about that function in the [focus section about better accessibility](/uilib/usage/accessibility/focus#focus-helper). | `[optional key as String]`                                    | `Void`    |
| `setPageFocusElement`    | More info about that function in the [focus section about better accessibility](/uilib/usage/accessibility/focus#focus-helper). | `[CSS selector or HTML element, optional key as String]`      | `Void`    |
| `isIE11`                 | Returns true or false, depending on the detection.                                                                              | none                                                          | `Boolean` |
| `isEdge`                 | Returns true or false, depending on the detection.                                                                              | none                                                          | `Boolean` |
| `isSafari`               | Returns true or false, depending on the detection.                                                                              | none                                                          | `Boolean` |
| `isiOS`                  | Returns true or false, depending on the detection.                                                                              | none                                                          | `Boolean` |
| `isMac`                  | Returns true or false, depending on the detection.                                                                              | none                                                          | `Boolean` |
| `isWin`                  | Returns true or false, depending on the detection.                                                                              | none                                                          | `Boolean` |
| `isLinux`                | Returns true or false, depending on the detection.                                                                              | none                                                          | `Boolean` |

| Constant    | Description                                                         | Value     |
| ----------- | ------------------------------------------------------------------- | --------- |
| `IS_IE11`   | Gives you true or false, depending on the detection during startup. | `Boolean` |
| `IS_EDGE`   | Gives you true or false, depending on the detection during startup. | `Boolean` |
| `IS_SAFARI` | Gives you true or false, depending on the detection during startup. | `Boolean` |
| `IS_IOS`    | Gives you true or false, depending on the detection during startup. | `Boolean` |
| `IS_MAC`    | Gives you true or false, depending on the detection during startup. | `Boolean` |
| `IS_WIN`    | Gives you true or false, depending on the detection during startup. | `Boolean` |
| `IS_LINUX`  | Gives you true or false, depending on the detection during startup. | `Boolean` |

#### `scrollToLocationHashId` Example

```js
import { scrollToLocationHashId } from 'dnb-ui-lib/shared/helpers'

// in case there is a #hash in the url
const elem = scrollToLocationHashId({
  offset: 100,
  delay: 100,
  onCompletion: (elem) => {
    try {
      elem.classList.add('focus')
    } catch (e) {
      //
    }
  }
})
```
