#!/bin/bash
# NOTE : Quote it else use array to avoid problems #
FILES="./json/*"
for f in $FILES
do
  # echo "Processing $f file..."
  # take action on each file. $f store current file name
  # jq '.download,.upload,.ping,.timestamp' $f >> ./speedtest.txt
  jq 'keys'  '{download: .download, upload: .upload, ping: .ping, timestamp: .timestamp}' "$f" >> ./testing.txt
  jq  '{download: .download, upload: .upload, ping: .ping, timestamp: .timestamp}' "$f" >> ./testing.txt
  jq  '{download: .download, upload: .upload, ping: .ping, timestamp: .timestamp}' "$f" >> ./testing.txt
  jq  '{download: .download, upload: .upload, ping: .ping, timestamp: .timestamp}' "$f" >> ./testing.txt
  jq  '{download: .download, upload: .upload, ping: .ping, timestamp: .timestamp}' "$f" >> ./testing.txt
  jq  '{download: .download, upload: .upload, ping: .ping, timestamp: .timestamp}' "$f" >> ./testing.txt
  jq  '{download: .download, upload: .upload, ping: .ping, timestamp: .timestamp}' "$f" >> ./testing.txt
  jq  '{download: .download, upload: .upload, ping: .ping, timestamp: .timestamp}' "$f" >> ./testing.txt
done
