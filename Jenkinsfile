pipeline {
    agent any

    environment {
        AWS_REGION = 'ap-south-1' // replace with your AWS region
        ECR_REGISTRY = '977099027862.dkr.ecr.ap-south-1.amazonaws.com/lambda-hello-world' // replace with your ECR registry URI
        ECR_REPOSITORY = 'lambda-hello-world' // your ECR repo name
        IMAGE_TAG = 'latest'
    }

    stages {
        stage('git clone') {
            steps {
                sh 'git clone https://github.com/MITRAJANU/test-node.git .'
            }
        }
        stage('Docker build') {
            steps {
                sh 'docker build -t lambda-hello-world .'
            }
        }
        stage('ECR Login') {
            steps {
                script {
                    // Login to ECR using AWS CLI
                    sh "aws ecr get-login-password --region ${env.AWS_REGION} | " +
                       "docker login --username AWS --password-stdin ${env.ECR_REGISTRY}"
                }
            }
        }
        stage('Tag and Push to ECR') {
            steps {
                script {
                    // Tag Docker image with ECR repo URI
                    sh "docker tag lambda-hello-world:latest ${env.ECR_REGISTRY}:${env.IMAGE_TAG}"
                    // Push image to ECR
                    sh "docker push ${env.ECR_REGISTRY}:${env.IMAGE_TAG}"
                }
            }
        }
    }
    post {
        always {
            cleanWs()
        }
    }
}
