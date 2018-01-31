pipeline {
  agent any
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
  }
}