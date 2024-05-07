# Cryptography with Javascript


Unit tests for JavaScript code with mocks of Apigee global functions using [Jest](https://jestjs.io/).




# Quick Start

npm i --no-fund

npm run unit-test



?. In the Cloud Shell:
```
gcloud auth print-access-token)
```

?. On your development computer, i.e., where you run VSCode

TOKEN=<ya29...copy-token-from-above>

apigeecli token cache -t $TOKEN

ORG=apigeex-devops
ENV=eval

API=crypto-aes-js

apigeecli apis --org=$ORG list


# --name=${PWD##*/}

apigeecli apis create bundle --name=$API --org=$ORG --proxy-folder=apiproxy --wait | jq -r .revision

REV=1

apigeecli apis deploy --wait --name $API --rev $REV --org $ORG --env $ENV --token $TOKEN



## To test the API Proxy, in the client-vm

curl -X POST https://api.exco.com/crypto-aes-js \
  --header 'Content-Type: application/x-www-form-urlencoded' \
  --data op=encrypt \
  --data passphrase=secretkey123 \
  --data salt=1oycXzfn6fU= \
  --data plaintext=my%20message%0A



curl -X POST https://api.exco.com/crypto-aes-js \
  --header 'Content-Type: application/x-www-form-urlencoded' \
  --data op=decrypt \
  --data passphrase=secretkey123 \
  --data salt=1oycXzfn6fU= \
  --data ciphertext=n90/3q45JlmrIQYbVu0gCQ==





## To delete the proxy

apigeecli apis listdeploy get --env=$ENV --org=$ORG --name=$API

REV=$( apigeecli apis listdeploy get --env=$ENV --org=$ORG --name=$API|jq -r .deployments[0].revision)

apigeecli apis undeploy --name $API --env $ENV --rev $REV --org $ORG




apigeecli apis --org=$ORG delete --name $API

