pipeline {
    agent any

    tools {
        nodejs 'Node 20.16.0'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Build Project') {
            steps {
                bat 'npm run build'
            }
        }

        stage('Archive Build') {
            steps {
                archiveArtifacts artifacts: 'build/**', fingerprint: true
            }
        }
    }

    post {
        success {
            echo '✅ Build finalizado com sucesso e artefato salvo.'
        }
        failure {
            echo '❌ Ocorreu uma falha no build.'
        }
    }
}
