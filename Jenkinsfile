pipeline {
  agent any
  triggers { githubPush() }

  environment {
    AWS_REGION     = 'ap-south-1'
    ECR_REGISTRY   = '977099027862.dkr.ecr.ap-south-1.amazonaws.com'   // <- registry only
    ECR_REPOSITORY = 'lambda-hello-world'
    IMAGE_TAG      = 'latest'
    IMAGE_URI      = "${ECR_REGISTRY}/${ECR_REPOSITORY}:${IMAGE_TAG}"
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm                      // workspace already has repo; no manual clone
        sh 'git rev-parse --short HEAD || true'
      }
    }

    stage('Docker build') {
      steps {
        sh 'sudo usermod -aG docker ubuntu && newgrp docker'
        sh 'docker build -t ${ECR_REPOSITORY}:${IMAGE_TAG} .'
      }
    }

    stage('ECR Login') {
      steps {
        sh """
          aws --version
          aws ecr get-login-password --region ${AWS_REGION} \
            | docker login --username AWS --password-stdin ${ECR_REGISTRY}
        """
      }
    }

    stage('Tag & Push') {
      steps {
        sh """
          docker tag ${ECR_REPOSITORY}:${IMAGE_TAG} ${IMAGE_URI}
          docker push ${IMAGE_URI}
        """
      }
    }
  }

  post {
    always { cleanWs() }
  }
}
