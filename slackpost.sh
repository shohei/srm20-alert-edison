TOKEN="xoxp-4912017708-4912017712-22613958018-dd398f0293"
CHANNEL="srm20_2"
MESSAGE="ping message from edison"
NICK="Edison-on-SRM-20"
IS_PRIVATE=0

if [ $# -eq 1 ]; then
  MESSAGE=$1
fi

if [ $IS_PRIVATE -eq 1 ]; then
    API_TYPE=groups
else
    API_TYPE=channels
fi

# channel info

CHANNELS_RESPONSE=$(curl "https://slack.com/api/$API_TYPE.list?token=$TOKEN")
CHANNEL_ID=$(echo $CHANNELS_RESPONSE | jq ".${API_TYPE}[]" | jq "if .name == \"$CHANNEL\" then .id else null end" -M -c -r | grep -v null)

# post message

curl -X POST \
    -F token=$TOKEN \
    -F channel=$CHANNEL_ID \
    -F "text=$MESSAGE" \
    -F username=$NICK \
    https://slack.com/api/chat.postMessage

