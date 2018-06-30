#!/bin/bash

rm -rf /tmp/dist 
cp -r dist /tmp 
pushd /tmp/dist
git init
git add *
git commit -m 'release'
git remote add -t gh-pages -m gh-pages origin git@github.com:antoine-aumjaud/api-gui.git
git fetch origin gh-pages
git checkout gh-pages
git reset master --hard
git push --force origin gh-pages
popd