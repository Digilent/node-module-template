# Node Module Template

1. Clone this repository.
2. Run `node setup.js` and follow the on screen instructions.
3. Run `npm install` 
4. Add source code in **src/**
5. Run `node run build` to build the module.
6. The browser module is built in **/bundle** and nodeJS module in **/dist**

## Subdirectories
* **bundle**
  * Contains the bundled module and any supporting files for use in the browser.
* **dist**
  * Contains the build module, the TS declaration file and any other support files.
* **examples**
  * Contains examples that demonstrate how to use the module.  The examples directory should be subdivided into browser and nodeJS.
* **src**
  * Contains the module source code includes TS, CSS, etc.