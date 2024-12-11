pipeline {
    agent any
    stages{
        stage("Instalando dependencias"){
            agent{
                docker{
                    image 'node:22-alpine'
                    reuseNode true
                }
            }
            stages{
                stage("npm"){
                    steps{
                        sh 'npm install'
                    }
                }
                stage("Build"){
                    steps{
                        sh 'npm run build'
                    }
                }
                stage("test"){
                    steps{
                        sh 'npm run test'
                    }
                }
                stage("subir a nexus"){
                    steps{
                        script{
                            docker.withRegistry("localhost:8082","registry")
                            {
                                sh 'docker build -t backend-test .'
                                sh 'docker tag backend-test:latest localhost:8082/backend-test:latest'
                                sh 'docker push localhost:8082/backend-test:latest'
                            }
                        }
                    }
                }
    }}}
}