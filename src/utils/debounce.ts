const debounce = <T extends (...args: Parameters<T>) => void>(
  fn: T,
  wait: number,
) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<typeof fn>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(fn, wait, ...args);
  };
};

export default debounce;
