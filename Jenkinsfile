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
          pm2 stop $SUBDOMAIN
          cd $PUBLIC_DIR$SUBDOMAIN/ && git pull || git clone $GIT_URL $PUBLIC_DIR$SUBDOMAIN && cd $PUBLIC_DIR$SUBDOMAIN/
          npm i
          NODE_PATH=. pm2 start index.js --name=$SUBDOMAIN
          pm2 show $SUBDOMAIN
        '''
      }
    }
  }
  post {
    always {
      sh "cd $WORKSPACE"
      deleteDir()
    }
  }
}