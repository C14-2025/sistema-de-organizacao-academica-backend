pipeline {
  agent any

  options {
    timestamps()
  }

  environment { CI = 'true' }

  stages {
    stage('Checkout') { steps { checkout scm } }

    stage('Node & NPM info') {
      steps {
        script {
          isUnix() ? sh('node -v && npm -v') : bat('node -v && npm -v')
        }
      }
    }

    stage('Install deps') {
      steps {
        script {
          if (fileExists('package-lock.json')) {
            isUnix() ? sh('npm ci') : bat('npm ci')
          } else {
            isUnix() ? sh('npm install') : bat('npm install')
          }
        }
      }
    }

    stage('Generate Prisma (if present)') {
      when { expression { fileExists('prisma/schema.prisma') } }
      steps {
        script {
          isUnix() ? sh('npx prisma generate') : bat('npx prisma generate')
        }
      }
    }

    stage('Lint (if present)') {
      steps {
        script {
          isUnix() ? sh('npm run lint --if-present') : bat('npm run lint --if-present')
        }
      }
    }

    stage('Format check (if present)') {
      steps {
        script {
          isUnix() ? sh('npm run format:check --if-present') : bat('npm run format:check --if-present')
        }
      }
    }

    stage('Build (tsup)') {
      steps {
        script {
          isUnix() ? sh('npm run build --if-present') : bat('npm run build --if-present')
        }
      }
    }

    stage('Archive artifact') {
      when { expression { fileExists('build') } }
      steps {
        archiveArtifacts artifacts: 'build/**', fingerprint: true, onlyIfSuccessful: true
      }
    }
  }

  post {
    success { echo '✅ Build finalizado com sucesso.' }
    failure { echo '❌ Falha no build.' }
    always  { cleanWs(deleteDirs: true) }
  }
}
