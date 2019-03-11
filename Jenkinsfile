pipeline {
  agent any
  environment {
    CF_ORG = "'Revature Training'"
  }
  stages {
    stage('Determine Context') {
        steps {
          script {
            result = sh(script: "git log -1 | grep -c '\\[debug\\]'", returnStatus: true)
            if(result == 0 ) {
              sh 'echo running debug build'
              env.DEBUG_BLD=1
            } else {
              sh 'echo not running debug build'
            }
          }
        }
    }
    stage('CLI Login'){
      when {
        anyOf{
          branch 'master'
          branch 'development'
          environment name: 'DEBUG_BLD', value: '1'
        }
      }
      steps {
        sh "echo Login to cli tools && /opt/login.sh"
      }
    }
    stage('App Dependencies') {
      steps {
        sh "npm install"
      }
    }
    stage('Quality Check') {
      parallel {
        stage('Unit Tests') {
          steps {
            sh "npm run test"
          }
        }
        stage('Code Scan') {
          steps {
            sh 'echo "run ng lint"'
          }
        }
      }
    }
    stage('Build') {
      when {
        anyOf{
          branch 'master'
          branch 'development'
          environment name: 'DEBUG_BLD', value: '1'
        }
      }
      steps {
        script {
          if(env.BRANCH_NAME == 'master') {
            env.ENV = "prod"
          } else {
            env.ENV = "local-server"
          }
        }
        sh "echo run ng build"
        sh "ng build --environment=prod"
      }
    }
    stage('Container Build') {
      when {
        anyOf{
          branch 'master'
          branch 'development'
          environment name: 'DEBUG_BLD', value: '1'
        }
      }
      steps {
        sh '''DK_U=$(cat /opt/dk_auth | cut -d\':\' -f1)
echo "run docker build"
docker image build -t $DK_U/assignforce .'''
      }
    }
    stage('docker Push') {
      when {
        anyOf{
          branch 'master'
          branch 'development'
          environment name: 'DEBUG_BLD', value: '1'
        }
      }
      steps {
        sh '''DK_U=$(cat /opt/dk_auth | cut -d\':\' -f1)
echo "push"
docker push $DK_U/assignforce:latest
echo "remove local image"
docker rmi $DK_U/assignforce:latest'''
      }
    }
    stage('CF Push') {
      when {
        anyOf{
          branch 'master'
          branch 'development'
          environment name: 'DEBUG_BLD', value: '1'
        }
      }
      steps {
        script {
          if(env.BRANCH_NAME == 'master') {
            env.SPACE = "production"
          } else {
            env.space = "development"
          }
          env.CF_DOCKER_PASSWORD=readFile("/run/secrets/CF_DOCKER_PASSWORD").trim()
        }
        sh "cf target -o $CF_ORG -s $SPACE"
        sh "cf push"

      }
    }
    stage('Clean') {
      steps {
        cleanWs(cleanWhenAborted: true, cleanWhenFailure: true, cleanWhenNotBuilt: true, cleanWhenSuccess: true, cleanWhenUnstable: true, deleteDirs: true)
      }
    }
  }
}
