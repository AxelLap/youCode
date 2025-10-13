"use client";

import { useState } from "react";

type CourseImageProps = {
  url?: string;
};

export const ImageCourse = ({ url }: CourseImageProps) => {
  const [imgSrc, setImgSrc] = useState(url || "/placeholder.webp");

  return (
    <img
      alt="course illustration"
      src={imgSrc}
      width={400}
      height={200}
      className="w-[45%] h-[100%] rounded-l-md object-cover"
      onError={() => setImgSrc("/placeholder.webp")}
    />
  );
};
