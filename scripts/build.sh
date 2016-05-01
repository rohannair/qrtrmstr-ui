#!/bin/bash -e

ARTIFACT_FILE=$1

if [ x == x$ARTIFACT_FILE ]
then
  echo Usage: $0 artifact_file
  echo e.g. $0 qrtrmstr-ui-2016-05-01_02:16:11-081f50931d7326ce94c1ccc9152c26f10a902825.tar.bz2
  exit 1
fi

umask 0002

export PATH=/usr/local/bin:$PATH
ARTIFACT_DIR=/opt/artifacts
LATEST_FILE=qrtrmstr-ui-latest
FILES_TO_INCLUDE="index.html public/"
FILES_TO_DELETE="node_modules public"

npm cache clean
npm install
npm run test

npm run build

ARTIFACT_FILE=qrtrmstr-ui-$(date +%Y-%m-%d_%H:%M:%S)-${GIT_COMMIT}.tar.bz2
ARTIFACT_PATH=${ARTIFACT_DIR}/${ARTIFACT_FILE}

# Pack and copy the artifact somewhere
tar -cjvf ${ARTIFACT_PATH} ${FILES_TO_INCLUDE}

# Tell deployment system what the latest artifact is:
LATEST_FILE_TMP=$(mktemp)
echo ${ARTIFACT_FILE} > ${LATEST_FILE_TMP}
chmod ugo+r ${LATEST_FILE_TMP}
mv ${LATEST_FILE_TMP} ${ARTIFACT_DIR}/${LATEST_FILE}

rm -rf ${FILES_TO_DELETE}
