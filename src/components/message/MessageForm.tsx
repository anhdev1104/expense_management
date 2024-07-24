const MessageForm = ({ error, className }: { error: string | undefined; className?: string }) => {
  return <>{error && <span className={`${className} text-xs ml-3 mt-2 block text-red-500`}>{error}</span>}</>;
};

export default MessageForm;
