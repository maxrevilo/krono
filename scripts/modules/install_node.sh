#!/bin/sh
VERSION=${NODE_V}
PREFIX=${2-node}
PLATFORM=$(uname | tr A-Z a-z)
ARCH=x64
case $(uname -p) in
    i686)
        ARCH=x86
    ;;
esac
if [ -e "${PREFIX}" ]; then
    TS=$(date +%Y%m%d-%H%M%S)
    echo "WARNING: Moving existing file at ${PREFIX} to ${PREFIX}-previous-${TS}" 1>&2
    mv "${PREFIX}" "${PREFIX}-previous-${TS}"
fi
mkdir -p "${PREFIX}"
curl --silent \
  "http://nodejs.org/dist/v${VERSION}/node-v${VERSION}-${PLATFORM}-${ARCH}.tar.gz" \
  | tar xzf - --strip-components=1 -C "${PREFIX}"