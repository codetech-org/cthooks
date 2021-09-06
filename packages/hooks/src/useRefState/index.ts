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
    ref.current = typeof value === 'function' ? value(ref.current) : value;
    setState(value);
  }, []);
  return [{ state, ref }, setStateProxy];
}

export default useRefState;
