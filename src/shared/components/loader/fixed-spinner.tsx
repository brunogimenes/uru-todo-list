import Spinner from "./spinner";

type FixedSpinnerProps = {
  show: boolean;
};

const FixedSpinner = ({ show }: FixedSpinnerProps) => {
  if (!show) {
    return null;
  }

  return (
    <div className="fixed left-0 top-0 w-full h-full bg-gray-300 bg-opacity-50 z-50 flex items-center justify-center">
      <Spinner />
    </div>
  )
};

export default FixedSpinner;