
# Mashup: JavaScript Composite Service

## Fork-Join pattern


The Fork-Join pattern is a parallel programming technique used to break down large tasks into smaller, independent subtasks that can be executed concurrently. It involves two main steps:

1. Forking: The main task is divided into smaller subtasks. These subtasks are typically independent, meaning they don't rely on the completion of each other to run.
2. Joining: Once the subtasks are finished executing concurrently, the results are combined to produce the final outcome for the original task.


### To set up variables and test connectivity
```
ORG=apigeex-devops
ENV=eval

API=mashup

apigeecli apis --org=$ORG list
```

### To import the api bundle into $ORG and deploy the $API

```
REV=$(apigeecli apis create bundle --name=$API --org=$ORG --proxy-folder=apiproxy --wait | jq -r .revision)

apigeecli apis deploy --ovr --wait --name $API --rev $REV --org $ORG --env $ENV
```



### To test the API Proxy


```bash
time curl "https://api.exco.com/mashup?lat=-121.8946165&lon=37.3340573"
```


Output:
```json
{"location":{"lat":-121.8946165,"lon":37.3340573},"weather":{"temperature":72,"conditions":"Sunny"},"restaurants":[{"name":"Restaurant A","rating":4.5,"features":["outdoor seating"]},{"name":"Restaurant B","rating":4.2,"features":["delivery"]},{"name":"Restaurant C","rating":4.8,"features":[]}]}
real    0m7.135s
user    0m0.008s
sys     0m0.007s
```

JavaScript Ouptut from all Transactions:

```
2024-05-22T21:25:43.845Z Log: Fork Start
2024-05-22T21:25:43.847Z Log: Fork: Finish
2024-05-22T21:25:50.940Z Log: Fork: onCompleteJson, 200
2024-05-22T21:25:50.941Z Log: Fork: onCompleteXml, 200

2024-05-22T21:25:43.845Z Log: Fork Start
2024-05-22T21:25:43.847Z Log: Fork: Finish
2024-05-22T21:25:50.940Z Log: Fork: onCompleteJson, 200
2024-05-22T21:25:50.941Z Log: Fork: onCompleteXml, 200

2024-05-22T21:25:50.944Z Log: Join: Start
2024-05-22T21:25:50.948Z Log: Join: Finish
```


### To delete the proxy

```
REV=$(apigeecli envs deployments get --env=$ENV --org=$ORG |jq -r ".deployments[]|select(.apiProxy==\"$API\")".revision)

apigeecli apis undeploy --name $API --env $ENV --rev $REV --org $ORG

apigeecli apis --org=$ORG delete --name $API
```
