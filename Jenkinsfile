pipeline {
    agent any
    stages {
        stage("Instalando dependencias") {
            agent {
                docker {
                    image 'node:22-alpine'
                    reuseNode true
                }
            }
            steps {
                sh 'npm install'
                sh 'npm run build'
                sh 'npm run test'
            }
        }
        stage("Control de calidad") {
            agent {
                docker {
                    image 'sonarsource/sonar-scanner-cli'
                    args '--network=host'
                    reuseNode true
                }
            }
            steps {
                withSonarQubeEnv('sonarqube') {
                    sh 'sonar-scanner'
                }
                timeout(time: 1, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }
        stage("Subir a Nexus") {
            steps {
                script {
                    docker.withRegistry("http://localhost:8082", "registry") {
                        sh 'docker build -t backend-test .'
                        sh 'docker tag backend-test:latest localhost:8082/backend-test:latest'
                        sh 'docker push localhost:8082/backend-test:latest'
                    }
                }
            }
        }
    }
}


