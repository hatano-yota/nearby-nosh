import Image, { ImageProps } from 'next/image';

type Props = ImageProps & {
  alt: string;
  divProps?: React.HTMLAttributes<HTMLDivElement>;
};

const CommonImage = (props: Props): JSX.Element => {
  const { divProps, alt, ...imageProps } = props;

  return (
    <div {...divProps}>
      <Image {...imageProps} alt={alt} />
    </div>
  );
};

export default CommonImage;
