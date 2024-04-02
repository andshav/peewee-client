export function debounce(func: (...args: unknown[]) => void, waitMilliseconds: number): (...args: unknown[]) => void {
    let timeout: ReturnType<typeof setTimeout> | null = null;

    // eslint-disable-next-line func-names
    return function (...args: unknown[]): void {
      const perform = () => {
        timeout = null;
        func(...args);
      };

      if (timeout !== null) {
        clearTimeout(timeout);
      }

      timeout = setTimeout(perform, waitMilliseconds);
    };
  }
