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
        sh "mocha -v || npm i -g mocha && mocha"
      }
    }
  }
}