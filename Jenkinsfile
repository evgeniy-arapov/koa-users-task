pipeline {
  agent any
  environment {
    SUBDOMAIN = "koa-users-task"
  }
  stages {
    stage("install dependencies") {
      steps {
        sh "npm i"      
      }
    }
    stage("Test") {
      steps {
        sh "mocha --version || npm i -g mocha"
        sh "npm test"
      }
    }
    stage("deploy") {
      steps {
        sh "printenv"
        sh '''
          pm2 stop pm2.json;
          cd $PUBLIC_DIR$SUBDOMAIN/ && git pull || git clone $GIT_URL $PUBLIC_DIR$SUBDOMAIN && cd $PUBLIC_DIR$SUBDOMAIN/
          npm i
          pm2 start pm2.json
        '''
      }
    }
  }
}