[![GitHub license](https://img.shields.io/github/license/akbeeram/ng2-search-select.svg)](https://github.com/akbeeram/ng2-search-select/blob/master/LICENSE)
[![npm version](https://badge.fury.io/js/ng2-search-select.svg)](https://badge.fury.io/js/ng2-search-select)
[![npm](https://img.shields.io/npm/dt/ng2-search-select.svg)](https://www.npmjs.com/package/ng2-search-select)
[![GitHub contributors](https://img.shields.io/github/contributors/akbeeram/ng2-search-select.svg)](https://GitHub.com/akbeeram/ng2-search-select/graphs/contributors/)
[![GitHub issues](https://img.shields.io/github/issues/akbeeram/ng2-search-select.svg)](https://GitHub.com/akbeeram/ng2-search-select/issues/)
[![GitHub issues-closed](https://img.shields.io/github/issues-closed/akbeeram/ng2-search-select.svg)](https://GitHub.com/akbeeram/ng2-search-select/issues?q=is%3Aissue+is%3Aclosed)
[![GitHub pull-requests](https://img.shields.io/github/issues-pr/akbeeram/ng2-search-select.svg)](https://GitHub.com/akbeeram/ng2-search-select/pull/)

# ng2-search-select

  A simple and smart dropdown with search and tabs. Works great as a starting/decision point for your workflow.

## Installation

  `npm i ng2-search-select`

## Usage
  Import the library into your project. 
  ```javascript
    import { Ng2SearchSelectModule } from 'ng2-search-select';
  ```
  
  Add the library into your module imports section.
  ```javascript
  imports: [
    Ng2SearchSelectModule
  ],
  ```
  Be Sure to add the styles into your angular-cli.json.
  ```javascript
  "styles": [
    "styles.css",
    "./../node_modules/ng2-search-select/styles.css"
  ]
  ```
  
  In you comonent template:
  ```javascript
  <search-select name="sel-ser" id="sel-ser" ngModel
      [width]="'350px'"
      [data]="data" 
      [defaultIndex]="defaultIndex"
      [defaultTab]="1"
      (onOpen)="onOpen()" 
      (onClose)="onClose()"
      (onChange)="onChange($event)"></search-select>
  ```
  
  * `width` - widht of the ccomponent. Specify the width property as a string like `[width]="'500px'"` or `[width]="'50%'"`.
  * `data` - pass the data as an array. Each object in the array must have a `data` property which is an array. Each object inside the data array must have a property `label`, this is what is displayed on the dropdown. When using multi tabbed data, each object in the array must have a `title` and a `data` array.
  * `defaultIndex` - the option to select by default, can be dynamic `defaultIndex` or use `0`.
  * `defaultTab` - when using a multi tabbed component, specify the default tab that must be highlighted. If not specified, this will default to the first tab.
  * `onOpen` - a handler to notify when the dropdown is opened.
  * `onClose` - a handler to notify when the dropdown is closed.
  * `onChange` - a handler to notify when a new slection is made and return the newly seleted item.
  
  ## Demo
    ![Demo GIF]https://github.com/akbeeram/ng2-search-select/blob/master/demo.gif)
  ## License

  [MIT](./LICENSE)