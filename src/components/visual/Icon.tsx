interface IconProps {
  src: string;
  size?: number;
  width?: number;
  className?: string;
}

const Icon = ({ src, size = 32, className = "" }: IconProps) => {
  return <img src={src} width={size} height={size} className={className} />;
};

export default Icon;
