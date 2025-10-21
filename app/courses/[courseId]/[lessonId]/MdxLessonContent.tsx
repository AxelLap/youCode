import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrism from "rehype-prism-plus";

type MdxLessonContentProps = {
  markdown: string;
};

// app/page.js
export const MdxLessonContent = (props: MdxLessonContentProps) => {
  return (
    <div className="prose md:w-[80%] w-[95%] m-auto p-2">
      <MDXRemote
        options={{
          mdxOptions: {
            rehypePlugins: [rehypePrism],
          },
        }}
        source={props.markdown}
      />
      ;
    </div>
  );
};
