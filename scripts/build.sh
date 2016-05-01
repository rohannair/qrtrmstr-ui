#!/bin/bash -e

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

sudo /opt/ops/scripts/deploy.sh qrtrmstr-ui ${ARTIFACT_FILE}
