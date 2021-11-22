import { Dispatch, RefObject, SetStateAction, useCallback, useRef, useState } from 'react';

function useRefState<S = undefined>(): [
  values: { state: S | undefined; ref: RefObject<S | undefined> },
  setter: Dispatch<SetStateAction<S | undefined>>
];
function useRefState<S>(
  initialState: S | (() => S)
): [values: { state: S; ref: RefObject<S> }, setter: Dispatch<SetStateAction<S>>];

function useRefState(initState?: unknown) {
  const [state, setState] = useState(initState);
  const ref = useRef(initState);
  const setStateProxy: typeof setState = useCallback((value) => {
    const handlers: ProxyHandler<any> = {
      apply(target, _thisArg, args) {
        const result = target(...args);
        ref.current = result;
        return result;
      },
    };
    if (typeof value === 'function') {
      setState(new Proxy(value, handlers));
    } else {
      ref.current = value;
      setState(value);
    }
  }, []);
  return [{ state, ref }, setStateProxy];
}

export default useRefState;
