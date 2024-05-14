# Cryptography with JavaScript

This Apigee API Proxy performs encryption and decryption operations with AES cipher and PBKDF2 password hashing using JavaScript policy

Unit tests for JavaScript code with mocks of Apigee global functions using [Jest](https://jestjs.io/).




# Quick Start

## Build and test API proxy with JavaScript policy

### On your development computer

Run the npm command to install all dependencies

```
npm i --no-fund
```

### To execute unit tests for the javascript policy implementation:
```
npm run unit-test
```

## Deploy and Test API Proxy

### In the Cloud Shell:

Copy the token outputted by the following command:
```
gcloud auth print-access-token
```

### On your development computer, i.e., where you run VSCode

...and paste as a value for the `TOKEN` environment variable:
```
TOKEN=<ya29...copy-token-from-above>
```

Cache the token value so you don't need to repeat it for each `apigeecli` command invocation:
```
apigeecli token cache -t $TOKEN
```

### To set up variables and test connectivity
```
ORG=apigeex-devops
ENV=eval

API=crypto-aes-js

apigeecli apis --org=$ORG list
```


### To import the api bundle into $ORG and deploy the $API

NOTE: for a current folder `--name=${PWD##*/}`


```
REV=$(apigeecli apis create bundle --name=$API --org=$ORG --proxy-folder=apiproxy --wait | jq -r .revision)

apigeecli apis deploy --ovr --wait --name $API --rev $REV --org $ORG --env $ENV
```



### To test the API Proxy, in the client-vm

Encrypt operation:
```
curl -X POST https://api.exco.com/crypto-aes-js \
  --header 'Content-Type: application/x-www-form-urlencoded' \
  --data op=encrypt \
  --data passphrase=secretkey123 \
  --data salt=1oycXzfn6fU= \
  --data iterations=10000 \
  --data plaintext=my%20message%0A
```


Decrypt operation:
```
curl -X POST https://api.exco.com/crypto-aes-js \
  --header 'Content-Type: application/x-www-form-urlencoded' \
  --data op=decrypt \
  --data passphrase=secretkey123 \
  --data salt=1oycXzfn6fU= \
  --data iterations=10000 \
  --data ciphertext=n90/3q45JlmrIQYbVu0gCQ==
```


### To list $API proxy deployments
```
apigeecli apis listdeploy get --env=$ENV --org=$ORG --name=$API
```

### To delete the proxy

```
REV=$( apigeecli apis listdeploy get --env=$ENV --org=$ORG --name=$API|jq -r .deployments[0].revision)

apigeecli apis undeploy --name $API --env $ENV --rev $REV --org $ORG

apigeecli apis --org=$ORG delete --name $API
```
