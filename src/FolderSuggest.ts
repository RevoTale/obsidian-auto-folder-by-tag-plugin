import {AbstractInputSuggest, App} from "obsidian";

export default class FolderSuggest extends AbstractInputSuggest<string> {
	content: Set<string>;

	constructor(private inputEl: HTMLInputElement, content: Set<string>, private onSelectCb: (value: string) => void, app: App) {
		super(app, inputEl);
		this.content = content;
	}

	getSuggestions(inputStr: string): string[] {
		const lowerCaseInputStr = inputStr.toLocaleLowerCase();
		return [...this.content].filter((content) =>
			content.toLocaleLowerCase().contains(lowerCaseInputStr)
		);
	}

	renderSuggestion(content: string, el: HTMLElement): void {
		el.setText(content);
	}

	selectSuggestion(content: string, evt: MouseEvent | KeyboardEvent): void {
		this.onSelectCb(content);
		this.inputEl.value = "";
		this.inputEl.blur()
		this.close();
	}
}
