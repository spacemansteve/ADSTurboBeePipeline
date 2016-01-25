#!/bin/bash

# this script will replace all occurences of 'ADSWorker' in the current
# folder with the new name

function search_replace() {
	folder=${3:-`pwd`}
	read -p "Recursive '$1' -> '$2' in $folder? [y]:" answer
  if [ "${answer:-y}" == "y" ]; then
    echo "find $folder -type f -print0 | xargs -0 sed -i \"s/$1/$2/g\""
		find $folder -type f -print0 | xargs -0 sed -i "s/$1/$2/g"
  fi
}

newname=`basename $1`

read -p "Replace ADSWorker with '$newname'? [y]:" answer
if [ "${answer:-y}" == "y" ]; then
	search_replace(ADSWorker $newname ./ADSWorker)
	search_replace(ADSWorker $newname ./alembic)
	search_replace(ADSWorker $newname ./manifests)
	search_replace(ADSWorker $newname './*.ini')
	search_replace(ADSWorker $newname './*.md')
	search_replace(ADSWorker $newname './*.txt')
	search_replace(ADSWorker $newname './*.py')
	search_replace(ADSWorker $newname './Vagrantfile')
	
	mv ADSWorker $newname
fi

virtualenv python
source python/bin/activate

pip install -r requirements.txt
pip install -r dev-requirements.txt