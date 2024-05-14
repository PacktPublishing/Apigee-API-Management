# Cryptography with Java Callout

This Apigee API Proxy performs encryption and decryption operations with AES cipher and PBKDF2 password hashing using Java Callout

Unit tests for Java Callout code are impelemented using JUnit and JMockit frameworks.




# Quick Start

## Build and test API proxy with JavaScript policy



### To download and import Apigee Java jar dependencies into your local Maven repository


```
curl -LO https://us-maven.pkg.dev/apigee-release/apigee-java-callout-dependencies/com/apigee/gateway/libraries/message-flow/1.0.0/message-flow-1.0.0.jar

curl -LO https://us-maven.pkg.dev/apigee-release/apigee-java-callout-dependencies/com/apigee/infra/libraries/expressions/1.0.0/expressions-1.0.0.jar


mvn install:install-file \
   -Dfile=expressions-1.0.0.jar \
   -DgroupId=com.apigee \
   -DartifactId=expressions \
   -Dversion=1.0.0 \
   -Dpackaging=jar \
   -DgeneratePom=true

mvn install:install-file \
   -Dfile=message-flow-1.0.0.jar \
   -DgroupId=com.apigee \
   -DartifactId=message-flow \
   -Dversion=1.0.0 \
   -Dpackaging=jar \
   -DgeneratePom=true
```



### To build java callout
```
cd callout
mvn package

cd ..
```

### To "deploy" java callout into the proxy resources/java folder:

```
cp callout/target/crypto-aes-1.0-SNAPSHOT.jar bundle/apiproxy/resources/java
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

API=crypto-aes-java

apigeecli apis list --org=$ORG
```


### To import the api bundle into $ORG and deploy the $API

NOTE: for a current folder `--name=${PWD##*/}`


```
REV=$(apigeecli apis create bundle --name=$API --org=$ORG --proxy-folder=bundle/apiproxy --wait | jq -r .revision)

apigeecli apis deploy --ovr --wait --name $API --rev $REV --org $ORG --env $ENV
```



### To test the API Proxy, in the client-vm

Encrypt operation:
```
curl -X POST https://api.exco.com/crypto-aes-java \
  --header 'Content-Type: application/x-www-form-urlencoded' \
  --data op=encrypt \
  --data passphrase=secretkey123 \
  --data salt=1oycXzfn6fU= \
  --data iterations=10000 \
  --data plaintext=my%20message%0A
```


Decrypt operation:
```
curl -X POST https://api.exco.com/crypto-aes-java \
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
REV=$(apigeecli envs deployments get --env=$ENV --org=$ORG |jq -r ".deployments[]|select(.apiProxy==\"$API\")".revision)

apigeecli apis undeploy --name $API --env $ENV --rev $REV --org $ORG

apigeecli apis --org=$ORG delete --name $API
```
