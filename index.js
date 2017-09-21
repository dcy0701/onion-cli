#! /usr/bin/env node

const yargs = require('yargs');
const fs = require('fs');

let argv = yargs
    .option('name', {
        type: 'string',
        describe: '组件名',
        alias: 'n'
    })
    .option('mname', {
        type: 'string',
        describe: '模块名',
        alias: 'm'
    })
    .example('onion --name test-abc --mname test1', '创建一个组件')
    .help('h')
    .alias('h', 'help')
    .epilog('designed by onion @2017')
    .argv;

// 参数分为 componentName 就够了
let basepath = process.cwd();

// component模板
let componentName = argv.name;
let moduleName = argv.mname;

if([componentName, moduleName].includes(undefined)) {
    console.log('name、mname必填');
    process.exit(-1);
}

let originalName = componentName;

if (componentName.includes('-')) {
    componentName = componentName.replace(/-([a-z])/g, (str, match) => match.toLocaleUpperCase())
}


fs.mkdirSync(`${basepath}/${originalName}`);

let entryJsTmpl = `import ${componentName}Controller from './${originalName}.component.js';

let ${componentName}Module = angular.module('${moduleName}', []);

${componentName}Module.extend(${componentName}Controller);

export default ${componentName}Module.name;
`;

let entryJspath = `${basepath}/${originalName}/${originalName}.js`;

let htmlpath = `${basepath}/${originalName}/${originalName}.html`;
let csspath = `${basepath}/${originalName}/${originalName}.css`;

let componentTmpl = `import { Inject, Component } from 'angular-onion';

import ${componentName}Html from './${originalName}.html';
import './${originalName}.css';

@Component({
    selector: '${originalName}',
    props: {

    },
    template: ${componentName}Html
})
@Inject()
class ${componentName}Controller {
    constructor () {

    }

    $onInit () {

    }
}

export default ${componentName}Controller;
`;

let componentPath = `${basepath}/${originalName}/${originalName}.component.js`;

fs.writeFileSync(htmlpath, '<div></div>');
fs.writeFileSync(csspath, '');
fs.writeFileSync(entryJspath, entryJsTmpl);
fs.writeFileSync(componentPath, componentTmpl);
