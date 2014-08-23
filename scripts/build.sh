rm -rf apps/www

cd krono
ember build --environment=production

cp -rf dist/. ../apps/www/