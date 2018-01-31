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
      sh "printenv"
    }
  }
}