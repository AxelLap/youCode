"use client";
// InitializedMDXEditor.tsx
import {
  BoldItalicUnderlineToggles,
  ChangeCodeMirrorLanguage,
  codeBlockPlugin,
  codeMirrorPlugin,
  ConditionalContents,
  headingsPlugin,
  InsertCodeBlock,
  markdownShortcutPlugin,
  MDXEditor,
  quotePlugin,
  toolbarPlugin,
  UndoRedo,
  type MDXEditorProps,
} from "@mdxeditor/editor";

// Only import this to the next file
export default function InitializedMDXEditor({ ...props }: MDXEditorProps) {
  return (
    <MDXEditor
      contentEditableClassName="prose dark:prose-invert !text-foreground p-1 rounded-lg bg-background h-fit w-full min-h-[100px]"
      plugins={[
        headingsPlugin(),
        quotePlugin(),
        markdownShortcutPlugin(),
        codeBlockPlugin({ defaultCodeBlockLanguage: "js" }),
        codeMirrorPlugin({
          codeBlockLanguages: { js: "JavaScript", css: "CSS" },
        }),
        toolbarPlugin({
          toolbarContents: () => (
            <div className="flex gap-2">
              <ConditionalContents
                options={[
                  {
                    when: (editor) => editor?.editorType === "codeblock",
                    contents: () => <ChangeCodeMirrorLanguage />,
                  },
                  {
                    fallback: () => (
                      <>
                        <UndoRedo />
                        <BoldItalicUnderlineToggles />
                        <InsertCodeBlock />
                      </>
                    ),
                  },
                ]}
              />
            </div>
          ),
        }),
      ]}
      {...props}
    />
  );
}
