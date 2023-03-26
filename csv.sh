#!/bin/bash

set -euo pipefail

files="./json/*.json"
headers=false

# Blank out the file so no duplicate data
true > ./speedtest.csv

for f in $files
do
  if [ "$headers" = false ]; then
    # Get wanted keys (don't need any of the nested keys in my case)
    cat < "$f" | jq -r 'del(.server,.client,.share) | keys_unsorted | join(",")' >> ./speedtest.csv
    headers=true
  fi
  # Get values for each key and turn into a comma-separated list
  cat < "$f" | jq -r 'del(.server,.client) | . | join(",")' >> ./speedtest.csv
done