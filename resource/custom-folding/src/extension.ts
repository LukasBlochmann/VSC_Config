import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    let foldingProvider: vscode.FoldingRangeProvider = {
        provideFoldingRanges(document, context, token) {
            let ranges: vscode.FoldingRange[] = [];
            let start: number | null = null;
            
            for (let i = 0; i < document.lineCount; i++) {
                let line = document.lineAt(i).text;
                if (line.includes('#FOLD')) {
                    start = i;
                } else if (line.includes('#ENDFOLD') && start !== null) {
                    ranges.push(new vscode.FoldingRange(start, i, vscode.FoldingRangeKind.Region));
                    start = null;
                }
            }
            return ranges;
        }
    };

    context.subscriptions.push(vscode.languages.registerFoldingRangeProvider({ scheme: 'file', language: '*' }, foldingProvider));
}

export function deactivate() {}
