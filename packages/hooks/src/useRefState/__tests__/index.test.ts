import useRefState from "../index";
import { renderHook, act } from "@testing-library/react-hooks";

describe("useRefState", () => {
  it("should be defined", () => {
    expect(useRefState).toBeDefined();
  });

  const setUp = (initialValue: any) =>
    renderHook(() => {
      const [state, ref, setState] = useRefState(initialValue);
      return {
        state,
        ref,
        setState,
      } as const;
    });

  it("should support initialValue", () => {
    const value = {
      hello: "world",
    };
    const hook = setUp(value);
    expect(hook.result.current.state).toBe(value);
    expect(hook.result.current.ref.current).toBe(value);
  });

  it("should support update", () => {
    const hook = setUp(0);
    act(() => {
      hook.result.current.setState(5);
    });
    expect(hook.result.current.state).toBe(5);
    expect(hook.result.current.ref.current).toBe(5);
  });

  it("should support update function", () => {
    const hook = setUp(0);
    act(() => {
      hook.result.current.setState((prev: number) => {
        return prev + 5;
      });
    });
    expect(hook.result.current.state).toBe(5);
    expect(hook.result.current.ref.current).toBe(5);
  });

  it("should ref value right", () => {
    const hook = setUp(0);
    act(() => {
      hook.result.current.setState(5);
      hook.result.current.setState(hook.result.current.ref.current + 1);
    });
    expect(hook.result.current.state).toBe(6);
    expect(hook.result.current.ref.current).toBe(6);
  });
});
