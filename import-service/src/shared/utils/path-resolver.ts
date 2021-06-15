const pathResolver = (context: string): string => {
  return `${context.split(process.cwd())[1].substring(1).replace(/\\/g, '/')}`;
};

export default pathResolver;
