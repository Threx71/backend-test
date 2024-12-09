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
                stage("npm")
                    steps{
                        sh 'npm install'
                    }

                stage("Build"){
                    steps{
                        sh 'npm run build'
                    }
                }
    }}}
}