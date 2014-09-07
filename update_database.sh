#!/usr/bin/env bash

# to run in background enter the following command:
# ./update_database.sh > out.txt 2>&1 &

while true
do
	curl "http://www.herder.co/updatedatabase";
	sleep 900;
done
