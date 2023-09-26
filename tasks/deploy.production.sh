#!/usr/bin/env bash
tsc

function send_slack() {
  source "$(pwd)/.env.local"
  DATA="{\"text\":\"<\!subteam^$SLACK_PRODUCT_SUBTEAM_ID> $1 by <@$SLACK_USER_ID>\"}"
  curl -X POST -H 'Content-type: application/json' --data "$DATA" "$SLACK_DEPLOY_NOTIFICATION_WEBHOOK_URL"
}

function start_log() {
  printf "===============\n\n"
  printf "\t%s" "$1"
  printf "\n\n"
  echo "==============="
  echo ""
}

function log() {
  printf "\n\t# %s\n\t%s: \t$ %s\n" "$1" "$2" "$3"
}

function set() {
  log "$1" "SET" "$2"
}

function run() {
  log "$1" "RUN" "$2"
}

start_log "Production Deployment"

SERVER_NAME="payplo"
set "ssh 서버이름 변수를 설정합니다." "SERVER_NAME=$SERVER_NAME"

DIST_DIR="$PWD/.next"
set "빌드결과폴더 변수를 설정합니다." "DIST_DIR=$DIST_DIR"

APP_NAME="front-production"
set "서버내 pm2 앱 이름 변수를 설정합니다." "APP_NAME=$APP_NAME"

run "기존 빌드결과 폴더가 있다면 삭제합니다." "rm -rf $DIST_DIR"
rm -rf "$DIST_DIR"

run "로컬에서 빌드를 실행합니다." "NODE_ENV=production APP_ENV=production yarn build:production"
echo ""
NODE_ENV=production APP_ENV=production yarn build:production

run "서버가 Git repo 를 pull 받습니다." "ssh $SERVER_NAME \"cd ~/$APP_NAME && git pull origin production\""
echo ""
ssh "$SERVER_NAME" "cd ~/$APP_NAME && git pull origin production"

run "서버의 기존 빌드결과 폴더가 있다면 삭제합니다." "ssh $SERVER_NAME \"rm -rf ~/$APP_NAME/.next\""
ssh "$SERVER_NAME" "rm -rf ~/$APP_NAME/.next"

run "로컬의 빌드결과 폴더를 서버에 업로드 합니다. (2-3 분 정도 소요됨)" "scp -r $DIST_DIR $SERVER_NAME:~/$APP_NAME"
echo ""
scp -r "$DIST_DIR" payplo:~/front-production

run "서버의 reboot 스크립트를 실행합니다." "ssh $SERVER_NAME \"bash ~/deploy-production.sh\""
echo ""
ssh "$SERVER_NAME" "bash ~/deploy-production.sh"

#run "서버의 pm2 프로세스를 제거합니다." "ssh payplo \"pm2 delete $APP_NAME\""
#ssh payplo "pm2 delete $APP_NAME"
#
#run "서버의 pm2 프로세스를 생성합니다." "ssh payplo \"NODE_ENV=production APP_ENV=production PORT=3001 pm2 start \"yarn start\" --name $APP_NAME --update-env -w -i max -- start\""
#ssh payplo "NODE_ENV=production APP_ENV=production PORT=3001 pm2 start \"yarn start\" --name $APP_NAME --update-env -w -i max -- start"

printf "\n\n%s" "========================"
printf "\n\t%s\n" "배포완료!"
printf "\n\t\t%s\n" "# 로그를 확인하려면 다음을 실행하세요."
printf "\t\t%s\n" "$ ssh $SERVER_NAME \"pm2 log $APP_NAME\""
echo ""
printf "\n\t\t%s\n" "# 만약 pm2 명령어를 ssh shell 에서 인식하지 못하면, 다음을 순서대로 실행하세요."
printf "\t\t%s\n" "$ ssh $SERVER_NAME"
printf "\t\t%s\n" "$ pm2 log $APP_NAME"
printf "%s\n" "========================"

send_slack "Deploy:Production Success"
