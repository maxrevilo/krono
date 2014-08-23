cd $(dirname $0)

heroku apps:create krono-server
sh setup.sh
sh deploy.sh