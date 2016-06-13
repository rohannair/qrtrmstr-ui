npm run build
CACHE_REV=$(cat stats.json)
cp index.html ./public/
sed -i 's/public\/app/app\.'"${CACHE_REV}"'/g' public/index.html
echo "Done revs"
