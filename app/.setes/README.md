#setes:dependencies
this package contains all the needed dependencies for tha application.

##how to run

###You need [bower-installer](https://github.com/blittle/bower-installer)

All you need to do is basically run it, and then delete the bower_components directory

TODO:
- [ ] Do that but from a bash script. One single step.

####From their README
>Bower installer provides an easy way for the main files to be installed or moved to one or more locations. Simply add to
your bower.json an `install` key and `path` attribute:
```javascript
{
  "name" : "test",
  "version": "0.1",
  "dependencies" : {
    "backbone" : "latest"
  },
  "install" : {
    "path" : "some/path"
  }
}
```
Install bower-installer by executing
```bash
npm install -g bower-installer
```
From the terminal in the same directory as your bower.json file, enter:
```bash
bower-installer
```
After executing this, `backbone.js` will exist under `some/path` relative to the location of your
bower.json file.
