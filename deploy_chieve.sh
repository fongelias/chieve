#!/bin/bash
#Restarts, commits, and deploys heroku app

#Store commit message as a variable
echo -n "Enter commit message > "
read text

#Shut down remote server
heroku ps:scale web=0

#Commit all changes
git commit -a -m "$text"

#Push commit to heroku master
git push heroku master -f

#Start up remote server
heroku ps:scale web=1
