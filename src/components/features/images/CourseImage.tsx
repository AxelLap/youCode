type CourseImageProps = {
  image: string | undefined;
};

export const CourseImage = ({ image }: CourseImageProps) => {
  if (image) {
    return (
      <img
        src={image}
        alt="course illustration image"
        className="w-[40%] h-full p-0 m-0 rounded-s-lg object-cover"
      />
    );
  } else {
    return (
      <img
        src="/placeholder.webp"
        alt="placeHolderImage"
        className="w-[40%] h-full p-0 m-0 rounded-s-lg object-cover"
      />
    );
  }
};
