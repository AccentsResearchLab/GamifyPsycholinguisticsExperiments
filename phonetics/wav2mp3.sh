#!/bin/bash
for f in *.wav; do ffmpeg -y -i "$f" "${f%}.ogg"; done

