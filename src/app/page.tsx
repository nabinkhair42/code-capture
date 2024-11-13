"use client";
import { useEffect, useRef, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CodeEditor } from "@/components/reusable/code-editor";
import { Toolbar } from "@/components/reusable/toolbar";
import { decodeCode } from "@/lib/utils";
import { BorderBeam } from "@/components/ui/addons/border-bean";
import VersionAnnouncement from "@/components/reusable/version-announcement";

function HomeContent() {
  const searchParams = useSearchParams();
  const [code, setCode] = useState(
    `function greet() {\n  console.log("Introducing Pointer");\n}`
  );
  const [theme, setTheme] = useState("vs-dark");
  const [language, setLanguage] = useState("javascript");
  const [background, setBackground] = useState("#1a1b26");
  const [fontSize, setFontSize] = useState(14);
  const [lineHeight, setLineHeight] = useState(1.5);
  const [padding, setPadding] = useState(32);
  const [showLineNumbers, setShowLineNumbers] = useState(true);
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const encodedCode = searchParams.get("code");
    const lang = searchParams.get("lang");
    const themeParam = searchParams.get("theme");

    if (encodedCode) {
      const decodedCode = decodeCode(encodedCode);
      if (decodedCode) setCode(decodedCode);
    }
    if (lang) setLanguage(lang);
    if (themeParam) setTheme(themeParam);
  }, [searchParams]);

  return (
    <main className="min-h-screen flex items-center flex-col pt-32">
      <div className="flex ">
        <VersionAnnouncement />
      </div>
      <div className="container mx-auto px-4 py-8 ">
        <Toolbar
          theme={theme}
          setTheme={setTheme}
          language={language}
          setLanguage={setLanguage}
          background={background}
          setBackground={setBackground}
          fontSize={fontSize}
          setFontSize={setFontSize}
          lineHeight={lineHeight}
          setLineHeight={setLineHeight}
          padding={padding}
          setPadding={setPadding}
          showLineNumbers={showLineNumbers}
          setShowLineNumbers={setShowLineNumbers}
          code={code}
          editorRef={editorRef}
        />
        <div
          className="mt-8 rounded-lg shadow-xl overflow-hidden relative  w-full mx-auto"
          ref={editorRef}>
          <CodeEditor
            code={code}
            setCode={setCode}
            theme={theme}
            language={language}
            background={background}
            fontSize={fontSize}
            lineHeight={lineHeight}
            padding={padding}
            showLineNumbers={showLineNumbers}
          />
          <BorderBeam />
        </div>
      </div>
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}