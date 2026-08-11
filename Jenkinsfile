pipeline {
    agent any

    environment {
        // Name of your Docker repository/image
        DOCKER_IMAGE    = 'your-dockerhub-username/my-app'
        DOCKER_TAG      = "${BUILD_NUMBER}"
        // Credentials ID configured in Jenkins Credentials Manager
        REGISTRY_CREDS  = 'docker-hub-credentials-id'
    }

    tools {
        // Must match the Node.js tool name configured in Jenkins Global Tool Configuration
        nodejs 'NodeJS-18'
    }

    options {
        timeout(time: 1, unit: 'HOURS')
        disableConcurrentBuilds()
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing node modules...'
                sh 'npm ci'
            }
        }

        stage('Lint & Code Quality') {
            steps {
                echo 'Running linter...'
                // Adjust if your package.json has a different script
                sh 'npm run lint --if-present'
            }
        }

        stage('Run Unit Tests') {
            steps {
                echo 'Executing tests...'
                sh 'npm test -- --passWithNoTests'
            }
        }

        stage('Build Artifact') {
            steps {
                echo 'Building frontend/backend assets...'
                sh 'npm run build --if-present'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    echo "Building Docker image: ${DOCKER_IMAGE}:${DOCKER_TAG}"
                    dockerImage = docker.build("${DOCKER_IMAGE}:${DOCKER_TAG}", "-f Dockerfile .")
                    dockerImageTagLatest = docker.build("${DOCKER_IMAGE}:latest", "-f Dockerfile .")
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', "${REGISTRY_CREDS}") {
                        echo "Pushing ${DOCKER_IMAGE}:${DOCKER_TAG} to registry..."
                        dockerImage.push("${DOCKER_TAG}")
                        dockerImage.push("latest")
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying application...'
                // Example: Deploying locally via Docker Compose or SSH to server
                // sh 'docker-compose up -d --build'
                sh 'echo "Application deployed successfully!"'
            }
        }
    }

    post {
        always {
            echo 'Cleaning up workspace...'
            cleanWs()
        }
        success {
            echo "Pipeline succeeded for build ${BUILD_NUMBER}"
        }
        failure {
            echo "Pipeline failed for build ${BUILD_NUMBER}"
        }
    }
}
