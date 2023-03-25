#!/bin/bash

set -euo pipefail

FILES="./json/*.json"

# Blank out the file so no duplicate data
true > ./testing.txt

for f in $FILES
do
  cat < "$f" | jq -r 'keys[] as $k | "\($k): \(.[$k])"' >> ./testing.txt
done

echo "all done :)"