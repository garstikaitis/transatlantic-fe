import _debounce from "lodash/debounce";

export default function Debounce(delay: number) {
  return (target: any, prop: string) => {
    return {
      configurable: true,
      enumerable: false,
      value: _debounce(target[prop], delay),
    };
  };
}
