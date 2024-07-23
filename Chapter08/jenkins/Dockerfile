FROM jenkins/jenkins:2.469-alpine-jdk21


USER root
RUN apk update && apk add --no-cache git maven nodejs npm

RUN npm install -g apigeelint && apigeelint -V

USER jenkins

COPY --chown=jenkins plugins.txt /usr/share/jenkins/ref/plugins.txt
RUN jenkins-plugin-cli --plugin-file /usr/share/jenkins/ref/plugins.txt --jenkins-version 2.346.3 --latest false
