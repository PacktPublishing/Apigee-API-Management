/* eslint-disable no-invalid-this */ // See usage in apickli Documentation
/* eslint-disable new-cap */
"use strict";

const apickli = require('apickli');

const env = process.env.NODE_ENV || 'dev';
console.log('running on ' + env + ' environment');

Before( function(){
    this.Before(function(scenario, callback) {

        const host = process.env.APIGEE_HOST || "api.exco.com";
        const basePath = "";
        const url = `${host}${basePath}`;

        console.log(`URL: ${url}`);

        this.apickli = new apickli.Apickli('https', url);
        callback();
    });
});
