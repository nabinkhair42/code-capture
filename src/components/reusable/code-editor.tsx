"use client";

import { useEffect, useRef, useState } from "react";
import { Editor } from "@monaco-editor/react";
import { themes } from "@/lib/themes";

interface CodeEditorProps {
  code: string;
  setCode: (code: string) => void;
  theme: string;
  language: string;
  background: string;
  fontSize: number;
  lineHeight: number;
  padding: number;
  showLineNumbers: boolean;
}

export function CodeEditor({
  code,
  setCode,
  theme,
  language,
  background,
  fontSize,
  lineHeight,
  padding,
  showLineNumbers,
}: CodeEditorProps) {
  const editorRef = useRef<any>(null);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.updateOptions({
        cursorStyle: "line",
        cursorBlinking: "blink",
        renderLineHighlight: "all",
        selectOnLineNumbers: true,
      });
    }
  }, []);

  const getMonacoTheme = () => {
    const themeObj = themes.find((t) => t.value === theme);
    return themeObj ? themeObj.value : "vs-dark";
  };

  return (
    <div
      style={{
        background,
        padding: `${padding}px`,
        borderRadius: "0.5rem",
        overflow: "hidden",
      }}
      className="editor-container flex items-center justify-center"
    >
      <Editor
        defaultLanguage="javascript"
        height={"50vh"}
        width={"100%"}
        language={language}
        value={code}
        theme={getMonacoTheme()}
        onChange={(value) => setCode(value || "")}
        options={{
          fontSize,
          lineHeight,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          wordWrap: "on",
          wrappingStrategy: "advanced",
          lineNumbers: showLineNumbers ? "on" : "off",
          folding: false,
          glyphMargin: true,
          lineDecorationsWidth: showLineNumbers ? 40 : 0,
          lineNumbersMinChars: showLineNumbers ? 3 : 0,
          cursorStyle: "line",
          cursorBlinking: "expand",
          renderLineHighlight: "line",
          selectOnLineNumbers: false,
          automaticLayout: true,
          padding: {
            top: 10,
            bottom: 10,
          },
          roundedSelection: true,
        }}
        onMount={(editor) => {
          editor.updateOptions({
            cursorStyle: "line",
            cursorBlinking: "blink",
            renderLineHighlight: "all",
            selectOnLineNumbers: true,
          });
        }}
      />
    </div>
  );
}
