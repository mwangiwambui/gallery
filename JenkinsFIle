pipeline {
    agent any
    
    tools {nodejs "node"}
    
    stages {
        stage('Start') {
            steps {
                echo 'Build is starting'
            }
        }
        stage('Clone github repository') {
            steps {
                git url: 'https://github.com/mwangiwambui/gallery.git', branch: 'master'
            }
        }
        stage('Get latest commit') {
            steps {
                sh '''
                   export COMMIT=$(git log --oneline | awk '{print $1}' | head -n 1)
                   echo $COMMIT
                   '''
            }
        }
        stage('Install dependencies') {
            steps {
                sh '''
                   npm install
                   '''
            }
        }
        
        stage('Test') {
            steps {
                sh '''
                   npm test
                   '''
            }
        }
        
        stage('Deploy') {
            steps {
                withCredentials([string(credentialsId: 'renderToken', variable: 'RENDER_CREDENTIALS' )]){
                sh 'curl -X POST https://api.render.com/deploy/${RENDER_CREDENTIALS}&ref=$COMMIT'
                }      
            }
        }
        
        stage('End') {
            steps {
                echo 'Build is finished'
            }
        }
    }
    
    post{
            failure{
                slackSend(color: "danger", message: "${custom_msg()}")
            }
            success{
                slackSend(color: "good", message: "Build ${env.BUILD_NUMBER} of ${env.JOB_NAME} Succeeded.")
            }
        }
}

def custom_msg()
{
  def JENKINS_URL= "localhost:8000"
  def JOB_NAME = env.JOB_NAME
  def BUILD_ID= env.BUILD_ID
  def JENKINS_LOG= " FAILED: Job [${env.JOB_NAME}] Logs path: ${JENKINS_URL}/job/${JOB_NAME}/${BUILD_ID}/consoleText"
  return JENKINS_LOG
}