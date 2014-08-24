cd $(dirname $0)

heroku apps:create krono-market
sh setup.sh
sh deploy.sh