# !/usr/bin/python
import os, sys
from glob import glob
from shutil import copyfile

def modifyIndexJsx(file, name):
  wr = open(file, 'w')
  templ = """
  import %s from './%s'
  export default %s""" % (name, name, name)
  wr.write(templ)

for root, dir, files in os.walk(".."):
  path = root.split('/')
  for file in files:
      if file == 'index.jsx':
        componentName = path[4]
        oldName = root + '/' + file
        newname = root + '/' + componentName + '.jsx'

        copyfile(oldName, newname)
        modifyIndexJsx(oldName, componentName)
