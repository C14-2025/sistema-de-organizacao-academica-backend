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
    stage('Test') {
      environment {
        DATABASE_URL = "mysql://root:password@127.0.0.1:3306/test_db"
      }
      steps {
        script {
          isUnix() ?
            sh('npm test') : bat('npm test')
        }
      }
    }

    stage('Format check (if present)') {
      steps {
        script {
          def cmd = 'npm run format:check --if-present'
          def status = isUnix()
            ? sh(script: cmd, returnStatus: true)
            : bat(script: cmd, returnStatus: true)
    
          if (status != 0) {
            echo "⚠️ Prettier encontrou arquivos fora do padrão (status=${status}). Continuando o pipeline..."
            currentBuild.result = 'UNSTABLE' 
          }
        }
      }
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
