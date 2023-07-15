import LinkModal from "src/obsidian/codeblock-modal";
import FileModal from "src/obsidian/file-modal";
import IconButton from "./icon-button";
import { TFile } from "obsidian";
import CodeblockModal from "src/obsidian/codeblock-modal";

interface Props {
	onCodeblockModalSave: (value: string) => void;
	onLinkModalSave: (value: string) => void;
	onFileModalSave: (value: TFile) => void;
}

export default function EmptyContainerContent({
	onCodeblockModalSave,
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
				tooltip="Add codeblock"
				iconId="code"
				onClick={() =>
					new CodeblockModal(app, onCodeblockModalSave).open()
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
