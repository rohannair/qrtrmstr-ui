#!/bin/bash -e

umask 0002
export PATH=/usr/local/bin:$PATH

PROJECT=qrtrmstr-ui
ARTIFACT_DIR=/opt/artifacts
LATEST_FILE=${PROJECT}-latest
PUBLIC_DIR=public/
FILES_TO_DELETE="node_modules public"

usage () {
  echo "Usage: $0 options (-bt) -a artifact_file -h for help";
  echo "E.g. $0 -b -t -a ${PROJECT}-2016-05-01_02:16:11-081f50931d7326ce94c1ccc9152c26f10a902825.tar.bz2"
  echo
}

if ( ! getopts "bta:h" opt )
then
  usage
  exit 1;
fi

TEST=no
BUILD=no
while getopts "bta:h" opt; do
  case $opt in
    b) BUILD=yes;;
    t) TEST=yes;;
    a) ARTIFACT_FILE=$OPTARG;;
    h) usage ; exit 0 ;;
  esac
done

if [ x$ARTIFACT_FILE == x ]
then
  usage
  exit 2
fi

npm cache clean
npm install

if [ x$BUILD == xyes ]
then
  npm run test
else
  echo
  echo "We were told to skip testing this project."
  echo
fi

if [ x$BUILD == xyes ]
then
  npm run build
  CACHE_REV=$(cat stats.json)
  cp index.html ./public/
  sed -i 's/\/public\/app/app\.'"${CACHE_REV}"'/g' ./public/index.html
else
  echo
  echo "We were told to skip building this project."
  echo
fi

ARTIFACT_PATH=${ARTIFACT_DIR}/${ARTIFACT_FILE}

# Pack PUBLIC_DIR and copy the artifact somewhere
echo
echo "Creating artifact at ${ARTIFACT_PATH}, including everything inside ${PUBLIC_DIR} there"
cd ${PUBLIC_DIR}
tar cjf ${ARTIFACT_PATH}

# Keep a record of what the latest artifact is:
echo
echo "Depositing latest artifact name into ${ARTIFACT_DIR}/${LATEST_FILE}"
LATEST_FILE_TMP=$(mktemp)
echo ${ARTIFACT_FILE} > ${LATEST_FILE_TMP}
chmod ugo+r ${LATEST_FILE_TMP}
mv ${LATEST_FILE_TMP} ${ARTIFACT_DIR}/${LATEST_FILE}

# Clean up FILES_TO_DELETE
echo
echo "Cleaning up ${FILES_TO_DELETE}"
rm -rf ${FILES_TO_DELETE}
