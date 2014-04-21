NoteUp
======

NoteUp is a desktop markdown editor software based upon Node-WebKit and EpicEditor.

# Installation
Download the binaries for your platform as a zip archive [from the release page](https://github.com/cGuille/noteup/releases).

# Build the app

### TL;DR:
```bash
git clone git@github.com:cGuille/noteup.git
cd noteup
npm install
npm install -g grunt-cli
grunt nodewebkit
```

### Explanations:
* Check out the repository (`git clone git@github.com:cGuille/noteup.git`);
* Change to the repository directory (`cd noteup`);
* Install the dependencies (`npm install`);
* Install the build process runner (`npm install -g grunt-cli`);
* Run the build process (`grunt nodewebkit`).

This will create the executable files in the `builds/releases/NoteUp` directory for each platform (`linux32`, `linux64`, `mac`, `win`).
