# !/usr/bin/python
import os
# from glob import glob
# from shutil import copyfile

def modifyTests(file, name):
  wr = open(file, 'w')
  templ = """
  import test from 'ava';
  import React from 'react';
  import { shallow } from 'enzyme';

  import %s from './index.jsx';
  const wrapper = shallow(<%s/>);

  test('%s doesn\'t explode', t => {
    t.plan(1);
    t.deepEqual(wrapper.length, 1, 'What should the feature do?');
  });

  """ % (name, name, name)
  wr.write(templ)

excludes = ['/Users/rohan/Workspace/qrtrmstr/ui/node_modules']

for path, dirs, files in os.walk(os.getcwd()):

  for eachpath in excludes:
    if eachpath in path:
      continue
    else:
      for file in files:
        if file.find(".test.js") > 0:
          componentName = path.split('/')[-1]
          modifyTests(path + '/' + file, componentName)

