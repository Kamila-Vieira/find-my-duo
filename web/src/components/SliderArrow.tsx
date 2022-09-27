interface SliderArrowProps {
  disabled: boolean;
  left?: boolean;
  onClick: (e: any) => void;
}

export function SliderArrow({ disabled, left, onClick }: SliderArrowProps) {
  return (
    <svg
      onClick={onClick}
      className={`${left ? "left-0" : "right-0"} ${
        disabled ? "opacity-80" : "cursor-pointer"
      } w-7 h-7 absolute top-1/2 -translate-y-1/2`}
      width="19"
      height="34"
      viewBox="0 0 19 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d={left ? "M17 32L2 17L17 2" : "M2 2L17 17L2 32"}
        stroke="#A1A1AA"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
