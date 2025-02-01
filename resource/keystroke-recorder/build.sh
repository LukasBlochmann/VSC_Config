
# Just for testing without temporary saving
code --extensionDevelopmentPath=./package/


# For temporary usage
npx vsce package
#>> creates a file called: "keystroke-recorder-1.0.0.vsix"

# Install the extension locally
code --install-extension keystroke-recorder-1.0.0.vsix


