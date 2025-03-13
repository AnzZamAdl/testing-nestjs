pipeline {
    agent any
    
    tools {
        nodejs 'nodejs'
    }

    environment {
        DOCKER_IMAGE = 'testing-nestjs'
        DOCKER_TAG = 'latest'
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/AnzZamAdl/testing-nestjs.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    sh 'npm install'
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    sh 'npm test'
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    sh 'npm run build'
                }
            }
        }

        stage('Docker Build & Push') {
            steps {
                script {
                    withDockerRegistry(credentialsId: 'docker-login') {
                        sh """
                        docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} .
                        """
                    }
                }
            }
        }

        stage('Deploy with Docker') {
            steps {
                script {
                    withDockerRegistry(credentialsId: 'docker-login') {
                        sh """
                        docker stop ${DOCKER_IMAGE} || true
                        docker rm ${DOCKER_IMAGE} || true
                        docker run -d --name ${DOCKER_IMAGE} -p 8081:3000 ${DOCKER_IMAGE}:${DOCKER_TAG}
                        """
                    }
                }
            }
        }
    }
}
