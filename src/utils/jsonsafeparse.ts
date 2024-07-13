const JSONSafeParse = <T>(data: string, defaultOutput = {} as T) => {
  try {
    return JSON.parse(data) as T;
  } catch (err) {
    console.error(err);
    return defaultOutput;
  }
};

export default JSONSafeParse;
