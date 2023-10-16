interface IconScoreProps {
  width?: number;
  height?: number;
}

const IconScore = ({ width = 18, height = 18 }: IconScoreProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 18 18"
      width={width}
      height={height}
    >
      <path d="M9 6.088C9 3.831 10.791 2 13 2s4 1.83 4 4.088c0 1.743-1.46 3.23-1.46 3.23L9 16 2.46 9.318S1 7.83 1 6.088C1 3.831 2.791 2 5 2s4 1.83 4 4.088z"></path>
    </svg>
  );
};

export default IconScore;
