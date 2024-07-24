import Box from "./box";

interface EmptyStateProps {
  message: string;
}


const EmptyState = (props: EmptyStateProps) => {
  const { message } = props;

  return (
    <Box>
      <h2 className="text-4xl">👀</h2>
      <p className="text-lg opacity-60">{message}
      </p>
    </Box>
  );
}

export default EmptyState;