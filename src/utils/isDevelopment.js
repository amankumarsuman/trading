const useDevelopment = () => {
  return !process.env.NODE_ENV || process.env.NODE_ENV === "development";
};

export default useDevelopment;
