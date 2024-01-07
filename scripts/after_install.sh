#!/bin/bash
echo 'run after_install.sh: ' >> /home/ubuntu/my-app/LibraryClubFrontEnd/deploy.log

echo 'cd /home/ubuntu/my-app/LibraryClubFrontEnd' >> /home/ubuntu/my-app/LibraryClubFrontEnd/deploy.log
cd /home/ubuntu/my-app/LibraryClubFrontEnd >> /home/ubuntu/my-app/LibraryClubFrontEnd/deploy.log

echo 'npm install' >> /home/ubuntu/my-app/LibraryClubFrontEnd/deploy.log 
npm install >> /home/ubuntu/my-app/LibraryClubFrontEnd/deploy.log
npm deploy >> /home/ubuntu/my-app/LibraryClubFrontEnd/deploy.log