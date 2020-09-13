#!/bin/bash

for i in $(seq 69); do mkdir -p $i; curl -# http://phrack.org/archives/tgz/phrack$i.tar.gz | tar xf - -C $i; done
for i in $(seq 69); do node index.js $i $i/*.txt; done
mkdir -p pdfs
mv *.pdf pdfs
