"use client";
// InitializedMDXEditor.tsx
import {
  BoldItalicUnderlineToggles,
  headingsPlugin,
  markdownShortcutPlugin,
  MDXEditor,
  quotePlugin,
  toolbarPlugin,
  UndoRedo,
  type MDXEditorProps,
} from "@mdxeditor/editor";
import styles from "./mdx-editor.module.css";

// Only import this to the next file
export default function InitializedMDXEditor({ ...props }: MDXEditorProps) {
  return (
    <MDXEditor
      className={styles.theme}
      contentEditableClassName="prose dark:prose-invert !text-foreground p-1 mt-5 rounded-lg bg-background"
      plugins={[
        headingsPlugin(),
        quotePlugin(),
        markdownShortcutPlugin(),
        toolbarPlugin({
          toolbarContents: () => (
            <div className="flex gap-2">
              <UndoRedo />
              <BoldItalicUnderlineToggles />
            </div>
          ),
        }),
      ]}
      {...props}
    />
  );
}
