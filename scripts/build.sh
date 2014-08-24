rm -rf apps/www

cd krono
ember build --environment=production
# ember build

cp -rf dist/. ../apps/www/