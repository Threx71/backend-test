pipeline {
    agent any
    stages{

        stage("Instalando dependencias"){
            agent{
                docker{
                    image 'node:22-alpine'
                    resuseNode TRUE
                }
            }
            steps{
                sh 'npm install'
            }
        }
        stage("Build"){
            steps{
                sh 'npm run build'
            }

        }
    }
}