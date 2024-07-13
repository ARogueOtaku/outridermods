interface IconProps {
  src: string;
  size?: number;
  width?: number;
  className?: string;
  alt?: string;
}

const Icon = ({
  src,
  size = 32,
  className = "",
  alt = "iconimage",
}: IconProps) => {
  return (
    <img src={src} width={size} height={size} className={className} alt={alt} />
  );
};

export default Icon;
