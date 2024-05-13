# Cryptography with Java Sanitizer Callout

This Apigee API Proxy performs sanitazation of JSON messages according to the OWASP recommendation using Java Callout
https://owasp.org/json-sanitizer/

It takes a JSON-like content and converts it to valid JSON.

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
cp callout/target/json-sanitizer-callout-1.0.jar bundle/apiproxy/resources/java
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

### To set up environment variables
```
ORG=apigeex-devops
ENV=eval

API=json-sanitizer
```

### To test the token
```
apigeecli apis list --org=$ORG
```


### To import the api bundle into $ORG and deploy the $API

NOTE: for a current folder `--name=${PWD##*/}`


```
REV=$(apigeecli apis create bundle --name=$API --org=$ORG --proxy-folder=bundle/apiproxy --wait | jq -r .revision)

apigeecli apis deploy --ovr --wait --name $API --rev $REV --org $ORG --env $ENV
```



### To test the API Proxy, in the client-vm


```
curl https://api.exco.com/json-sanitizer \
  -H "Content-Type: application/json" \
  --data-binary @- <<EOF
{"xx":"<script>alert(1)</script>", "yy": 'yyy',"ar":[0,,2]}
EOF
```

sanitized output:
```
{"xx":"<script>alert(1)<\/script>", "yy": "yyy","ar":[0,null,2]}
```



```
curl https://api.exco.com/json-sanitizer \
  -H "Content-Type: application/json; charset=utf-8" \
  --data-binary @- <<EOF
{foo:'bar',arr:[1,2,3,],val:/*/true**/false}
EOF
```
expected result:
```
{"foo":"bar","arr":[1,2,3],"val":false
```


### To delete the proxy

```
REV=$(apigeecli envs deployments get --env=$ENV --org=$ORG |jq -r ".deployments[]|select(.apiProxy==\"$API\")".revision)

apigeecli apis undeploy --name $API --env $ENV --rev $REV --org $ORG

apigeecli apis --org=$ORG delete --name $API
```
