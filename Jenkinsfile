pipeline {
  agent any
  options { timestamps() }
  tools { nodejs 'Node 20' }   
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
            isUnix() ? sh('npm ci --no-audit --no-fund') : bat('npm ci --no-audit --no-fund')
          } else {
            isUnix() ? sh('npm install --no-audit --no-fund') : bat('npm install --no-audit --no-fund')
          }
        }
      }
    }

    stage('Generate Prisma (if present)') {
      when { expression { fileExists('prisma/schema.prisma') } }
      steps {
        script {
          isUnix() ? sh('npx prisma -v && npx prisma generate')
                   : bat('npx prisma -v && npx prisma generate')
        }
      }
    }

    stage('Lint (if present)') {
      steps { script { isUnix() ? sh('npm run lint --if-present') : bat('npm run lint --if-present') } }
    }

    stage('Format check (if present)') {
      steps { script { isUnix() ? sh('npm run format:check --if-present') : bat('npm run format:check --if-present') } }
    }

    stage('Build (tsup)') {
      steps {
        script {
          isUnix()
            ? sh('echo "PWD: $(pwd)"; ls -la; npm run build --if-present')
            : bat('echo PWD: %cd% && dir && npm run build --if-present')
        }
      }
    }

    stage('Archive artifact') {
      when { expression { fileExists('build') || fileExists('dist') } }
      steps {
        script {
          def path = fileExists('build') ? 'build/**' : 'dist/**'
          archiveArtifacts artifacts: path, fingerprint: true, onlyIfSuccessful: true
        }
      }
    }
  }

  post {
    success { echo '✅ Build finalizado com sucesso.' }
    failure { echo '❌ Falha no build.' }
    always  { cleanWs(deleteDirs: true) }
  }
}
