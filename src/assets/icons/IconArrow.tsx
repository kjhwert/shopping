type IconDirection = "left" | "right";

interface IconArrowProps {
  direction: IconDirection;
  width?: number;
  height?: number;
  color?: string;
}

const getIconDrawn = (direction: IconDirection) => {
  switch (direction) {
    case "left":
      return "M41 80L1 39.917 40.834 0";
    case "right":
      return "M1 0l40 40.083L1.166 80";
  }
};

const IconArrow = ({
  direction,
  width = 11,
  height = 21,
  color = "#000000",
}: IconArrowProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 42 80"
      width={width}
      height={height}
    >
      <path
        d={getIconDrawn(direction)}
        fill="none"
        fillRule="evenodd"
        stroke={color}
        strokeWidth={5}
      ></path>
    </svg>
  );
};

export default IconArrow;
