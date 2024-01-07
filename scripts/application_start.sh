echo 'Run application_start.sh: ' >> /home/ubuntu/my-app/LibraryClubFrontEnd/deploy.log
# Copy build files to Nginx serving directory
echo 'Copying build files to Nginx directory' >> /home/ubuntu/my-app/LibraryClubFrontEnd/deploy.log
cp -r build/* /var/www/html/theLibraryClub
# Restart Nginx to load new files
echo 'Restarting Nginx' >> /home/ubuntu/my-app/LibraryClubFrontEnd/deploy.log
sudo systemctl restart nginx