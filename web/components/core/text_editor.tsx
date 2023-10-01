import React from "react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { TextInput } from "./text_input";

interface TextEditorProps {
  value: string;
  onEditorChange: (value: string) => void;
  onTitleChange: (value: string) => void;
  titleId: string;
  titleLabel: string;
  titlePlaceHolder: string;
}

export default function TextEditor({
  value,
  onEditorChange,
  titleId,
  titleLabel,
  titlePlaceHolder,
  onTitleChange,
}: TextEditorProps) {
  return (
    <div className="flex flex-col h-64">
      <div className="mb-3">
        <TextInput id="title" type="text" label={titleLabel} placeholder={titlePlaceHolder} />
      </div>

      <div className="flex-grow">
        <CKEditor
          editor={ClassicEditor}
          data={value}
          onChange={(event, editor) => {
            const data = editor.getData();
            onEditorChange(data);
          }}
        />
      </div>
    </div>
  );
}
