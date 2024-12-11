pipeline {
    agent any
    environment {
        SONAR_HOST_URL = 'http://sonarqube:9000'
    }
    stages {
        stage("Build") {
            agent {
                docker {
                    label 'contenedores'
                    image 'node:22-alpine'
                    reuseNode true
                }
            }
            stages {
                stage("Install Dependencies") {
                    steps {
                        sh 'npm install'
                    }
                }
                stage("Run Tests") {
                    steps {
                        sh 'npm run test'
                    }
                }
                stage("Build Project") {
                    steps {
                        sh 'npm run build'
                    }
                }
            }
        }
        
        stage("Quality Assurance") {
            agent {
                docker {
                    label 'contenedores'
                    image 'sonarsource/sonar-scanner-cli'
                    args '--network=devops-infra_default'
                    reuseNode true
                }
            }
            stages {
                stage("SonarQube Analysis") {
                    steps {
                        withSonarQubeEnv('sonarqube') {
                            sh """
                                sonar-scanner \
                                -Dsonar.host.url=${SONAR_HOST_URL} \
                                -Dsonar.projectKey=your-project-key \
                                -Dsonar.sources=. \
                                -Dsonar.exclusions=**/node_modules/**,**/*.spec.js \
                                -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info
                            """
                        }
                    }
                }
                
                stage("Quality Gate") {
                    steps {
                        script {
                            timeout(time: 1, unit: 'MINUTES') {
                                def qg = waitForQualityGate()
                                if (qg.status != 'OK') {
                                    error "Pipeline aborted due to quality gate failure: ${qg.status}"
                                }
                            }
                        }
                    }
                }
            }
        }
        
        stage("Delivery") {
           steps {
                script {
                    docker.withRegistry("http://localhost:8082", "registry") {
                        sh 'docker build -t backend-devops .'
                        sh 'docker tag backend-devops:latest localhost:8082/backend-devops:latest'
                        sh 'docker push localhost:8082/backend-devops:latest'
                    }
                }
           } 
        }
    }
}