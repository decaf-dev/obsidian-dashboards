import LinkModal from "src/obsidian/link-modal";
import FileModal from "src/obsidian/modal/file-modal";
import IconButton from "../icon-button/icon-button";
import { TFile } from "obsidian";
import CodeBlockModal from "src/obsidian/code-block-modal";

interface Props {
	onCodeBlockModalSave: (value: string) => void;
	onLinkModalSave: (value: string) => void;
	onFileModalSave: (value: TFile) => void;
}

export default function EmptyContainerContent({
	onCodeBlockModalSave,
	onLinkModalSave,
	onFileModalSave,
}: Props) {
	return (
		<>
			<IconButton
				tooltip="Add file"
				iconId="sticky-note"
				onClick={() => new FileModal(app, onFileModalSave).open()}
			/>
			<IconButton
				tooltip="Add code block"
				iconId="code"
				onClick={() =>
					new CodeBlockModal(app, onCodeBlockModalSave).open()
				}
			/>
			<IconButton
				tooltip="Add link"
				iconId="link"
				onClick={() => new LinkModal(app, onLinkModalSave).open()}
			/>
		</>
	);
}
