cd src/sql
echo 'Removing old tables...'
sudo -u postgres psql < drop_tables.sql
echo 'Tables removed!'
echo '----------------------'
echo 'Creating tables..'
sudo -u postgres psql < create_tables.sql
echo 'Tables created!'
echo '----------------------'
echo 'Adding test data..'
sudo -u postgres psql < insert_test_data.sql
echo 'Test data added!'
echo '----------------------'
cd ../..
echo 'Starting server..'
npm run watch