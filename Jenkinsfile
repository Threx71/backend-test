pipeline {
    agent any
    stages{
        stage("compilado"){
            agent {
                docker {
                    label 'contenedores'
                    image 'node:22-alpine'
                    reuseNode true
                }
            }
            stages{
                stage("dependencias"){
                    steps{
                        sh 'npm install'
                    }
                }
                stage("prueba con coverage"){
                    steps{
                        sh 'npm run test'
                    }
                }
                stage("build"){
                    steps{
                        sh 'npm run build'
                    }
                }
            }
        }
        stage("Calidad"){
            agent {
                docker {
                    label 'contenedores'
                    image 'sonarsource/sonar-scanner-cli'
                    args '--network=devops-infra_default'
                    reuseNode true
                }
            }
            stages{
                stage("sonarqube"){
                    steps{
                        withSonarQubeEnv('sonarqube') {
                            sh 'sonar-scanner'
                        }
                    }
                }
                stage("esperar quality gate"){
                    steps{
                        script{
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
        stage("nexus"){
           steps{
                script {
                    docker.withRegistry("http://localhost:8082", "registry"){
                        sh 'docker build -t backend-test .'
                        sh 'docker tag backend-test:latest localhost:8082/backend-test:latest'
                        sh 'docker push localhost:8082/backend-test:latest'
                        sh 'docker tag backend-test:latest localhost:8082/backend-test:${BUILD_NUMBER}'
                        sh 'docker push localhost:8082/backend-test:${BUILD_NUMBER}'
                    }
                }
           } 
        }
    }
}