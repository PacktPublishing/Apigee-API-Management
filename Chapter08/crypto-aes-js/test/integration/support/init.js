/* eslint-disable no-invalid-this */ // See usage in apickli Documentation
/* eslint-disable new-cap */
"use strict";

const apickliModule = require("apickli");
const { Before, setDefaultTimeout } = require("@cucumber/cucumber");

setDefaultTimeout(5 * 1000); // this is in ms

Before(function () {
  const host = process.env.TEST_HOST || "org-env.apigee.net";
  const basePath = `/airports-cicd${process.env.APIGEE_DEPLOYMENT_SUFFIX || ''}/v1`;
  const baseUri = `${host}${basePath}`;
  console.log(`Test Base URI: ${baseUri}`);
  this.apickli = new apickliModule.Apickli("https", baseUri);
  this.apickli.addRequestHeader("Cache-Control", "no-cache");
});
