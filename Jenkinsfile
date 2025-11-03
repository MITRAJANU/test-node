pipeline {
  agent any

  options {
    timeout(time: 30, unit: 'MINUTES')
    skipDefaultCheckout(true)
  }

  environment {
    AWS_REGION     = 'ap-south-1'
    ECR_ACCOUNT    = '977099027862'
    ECR_REGISTRY   = "${ECR_ACCOUNT}.dkr.ecr.${AWS_REGION}.amazonaws.com"
    ECR_REPOSITORY = 'lambda-hello-world'
    IMAGE_TAG      = 'latest'
    IMAGE_URI      = "${ECR_REGISTRY}/${ECR_REPOSITORY}:${IMAGE_TAG}"
  }

  stages {
    stage('Prepare Docker Permissions') {
      steps {
        sh '''
          echo "[INFO] Fixing Docker permissions..."
          if ! groups $USER | grep -q docker; then
            echo "[INFO] Adding $USER to docker group"
            sudo usermod -aG docker $USER || true
            sudo systemctl restart docker || true
            echo "[INFO] Restarting agent session..."
          fi
          # ensure the docker socket is accessible for this session
          sudo chmod 666 /var/run/docker.sock || true
          docker info || (echo "[ERROR] Docker not accessible even after fix" && exit 1)
        '''
      }
    }

    stage('Checkout') {
      steps {
        checkout([$class: 'GitSCM',
          branches: [[name: '*/gh-pages']],
          userRemoteConfigs: [[url: 'https://github.com/MITRAJANU/test-node.git']]
        ])
      }
    }
    stage('ECR Login') {
      steps {
        sh """
          aws ecr get-login-password --region ${AWS_REGION} | \
          docker login --username AWS --password-stdin ${ECR_REGISTRY}
        """
      }
    }

    stage('Docker Build') {
      steps {
        sh "docker build -t ${ECR_REPOSITORY}:${IMAGE_TAG} ."
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
    always {
      cleanWs()
    }
  }
}
