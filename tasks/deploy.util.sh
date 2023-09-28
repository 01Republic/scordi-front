
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

function send_slack() {
  source "$(pwd)/.env.local"
  DATA="{\"text\":\"<"'!'"subteam^$SLACK_PRODUCT_SUBTEAM_ID> $1 by <@$SLACK_USER_ID>\"}"
  curl -X POST -H 'Content-type: application/json' --data "$DATA" "$SLACK_DEPLOY_NOTIFICATION_WEBHOOK_URL"
}
