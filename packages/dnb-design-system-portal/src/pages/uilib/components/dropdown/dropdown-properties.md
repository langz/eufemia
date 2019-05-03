---
draft: true
---

import { Data } from 'Pages/uilib/components/dropdown/Examples'

| Properties            | Description                                                                                                                       |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `data`                | _(mandatory)_ the data we want to fill the list with. Provide the data as a json string or data array structure.                  |
| `selected_item`       | _(optional)_ a number as a string or integer, defines the active item in the data array. The default value is the first item.     |
| `icon`                | _(optional)_ name of icon to be included in the dropdown.                                                                         |
| `icon_position`       | _(optional)_ position of icon inside the dropdown. Set to `left` or `right`. Defaults to `right` if not set.                      |
| `disabled`            | _(optional)_ to disable/enable the dropdown without using the `attribute` property.                                               |
| `direction`           | _(optional)_ defines the direction of how the dropdown shows the options list. Can be `bottom` or `top`. Defaults to `auto`.      |
| `scrollable`          | _(optional)_ defines if the options list should be scrollable (the `max-height` is set by default to `50vh`). Defaults to `true`. |
| `no_scroll_animation` | _(optional)_ to disable scrolling animation. Defaults to `false`.                                                                 |
| `no_animation`        | _(optional)_ to disable appear/disappear (show/hide) animation. Defaults to `false`.                                              |
| `max_height`          | _(optional)_ defines if the height (in `rem`) of the options list. Defualts to null, as this is set automatically by default.     |

## Data structure

<Data />