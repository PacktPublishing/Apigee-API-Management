"use strict";

const apickli = require('apickli');
const { Before } = require("@cucumber/cucumber");

const env = process.env.NODE_ENV || 'dev';
console.log('running on ' + env + ' environment');

Before( function(){
    const host = process.env.APIGEE_HOST || "api.exco.com";
    const basePath = "";
    const url = `${host}${basePath}`;

    console.log(`URL: ${url}`);

    this.apickli = new apickli.Apickli('https', url);
});
