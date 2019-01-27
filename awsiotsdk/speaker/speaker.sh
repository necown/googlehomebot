#!/bin/sh

#引数のチェック
if [ $# -ne 1 ]; then
  echo "invalid argument.";
  exit 1;
fi

#一時ファイルを保存するディレクトリ
TMPDIR=./
TMPFILE=${TMPDIR}/tmp.wav

#別ボイス
#-m /usr/share/hts-voice/mei/mei_normal.htsvoice \

echo "$1" | open_jtalk \
-fm 0.8 \
-m /usr/share/hts-voice/htsvoice-tohoku-f01/tohoku-f01-neutral.htsvoice \
-x /var/lib/mecab/dic/open-jtalk/naist-jdic \
-r 0.6 \
-ow $TMPFILE

#再生
aplay --quiet ${TMPFILE}

#一時ファイルを削除
rm ${TMPFILE}

exit 0;
