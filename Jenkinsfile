pipeline {
    agent any
    stages {
        stage("Instalando dependencias") {
            agent {
                docker {
                    image 'node:22-alpine'
                    args '--network devops-infra_default'
                    reuseNode true
                }
            }
            stages {
                stage("npm") {
                    steps {
                        sh 'npm install'
                    }
                }
                stage("Build") {
                    steps {
                        sh 'npm run build'
                    }
                }
                stage("test") {
                    steps {
                        sh 'npm run test'
                    }
                }
            }
        }
        stage("Control de calidad") {
            agent {
                docker {
                    image 'sonarsource/sonar-scanner-cli'
                    args '--network devops-infra_default'
                    reuseNode true
                }
            }
            steps {
                withSonarQubeEnv('sonarqube') {
            sh 'sonar-scanner'
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

