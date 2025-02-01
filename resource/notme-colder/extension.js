const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    let foldingProvider = {
        provideFoldingRanges(document, _, token) {
            let ranges = [];
            let start = null;

            for (let i = 0; i < document.lineCount; i++) {
                let line = document.lineAt(i).text;
                if (line.includes('#FOLD#') ||
                    line.includes('#ROOT') ||
                    line.includes('#A#')) {
                    start = i;
                } else if ((line.includes('#ENDFOLD#') ||
                            line.includes('#CUT#') ||
                            line.includes('#O#'))
                            && start !== null) {
                    ranges.push(new vscode.FoldingRange(start, i, vscode.FoldingRangeKind.Region));
                    start = null;
                }
            }
            return ranges;
        }
    };

    context.subscriptions.push(
        vscode.languages.registerFoldingRangeProvider(
            { scheme: 'file', language: '*' }, 
            foldingProvider
        )
    );

    console.log("Colder by notME Activated!");
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};