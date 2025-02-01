#ROOT# Build Dependencies
npm install -g @vscode/vsce
#CUT#

#ROOT# Build
vsce package
#CUT#

#ROOT# Install
code --install-extension *.vsix
#CUT#