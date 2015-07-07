#!/bin/bash
spm install $1@$2
cd spm_modules/$1/$2/
spm-sea --with-deps -O ../../../cmd/

# ./bin/cmd.sh jquery 1.11.2