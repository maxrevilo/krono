#!/bin/sh

BASEDIR=$(dirname ${BASH_SOURCE[0]})
export NODE_V='0.10.30'

echo 'Downloading NodeJS '$NODE_V'...'
sh $BASEDIR/modules/install_node.sh

echo 'Activating Enviroment'
source $BASEDIR/activate.sh

echo 'Downloading NPM Packages...'
npm install
