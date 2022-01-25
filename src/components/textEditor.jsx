import React, { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState,convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html'



export default function TextEditor({fn}) {
  
    const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  
  
  useEffect(() => {
    fn(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  }, [editorState]);
  return (
    <div>
      <h1>Article</h1>
      
      <div style={{ border: "1px solid black", padding: '2px', minHeight: '400px' }}>
        <Editor
          editorState={editorState}
          onEditorStateChange={setEditorState}
        />
      </div>
    </div>
  );
}