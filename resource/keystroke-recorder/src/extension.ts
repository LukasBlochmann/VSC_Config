import * as vscode from 'vscode';

let isRecording = false;
let keystrokes: string[] = [];

export function activate(context: vscode.ExtensionContext) {
    const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    statusBarItem.text = "$(keyboard) Start Recording";
    statusBarItem.command = "keystrokeRecorder.toggle";
    statusBarItem.show();
    
    const toggleRecording = vscode.commands.registerCommand('keystrokeRecorder.toggle', () => {
        isRecording = !isRecording;
        
        if (isRecording) {
            keystrokes = []; // Reset buffer
            vscode.window.showInformationMessage('Keystroke recording started!');
            statusBarItem.text = "$(record) Recording...";
        } else {
            const copiedText = keystrokes.join('');
            vscode.env.clipboard.writeText(copiedText);
            vscode.window.showInformationMessage(`Recording stopped! Copied: ${copiedText}`);
            statusBarItem.text = "$(keyboard) Start Recording";
        }
    });

    const keyListener = vscode.workspace.onDidChangeTextDocument(event => {
        if (isRecording) {
            for (const change of event.contentChanges) {
                keystrokes.push(change.text);
            }
        }
    });

    context.subscriptions.push(toggleRecording, keyListener, statusBarItem);
}

export function deactivate() {}
