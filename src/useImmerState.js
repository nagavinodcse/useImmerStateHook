import { useState, useMemo } from 'react';
import produce from 'immer';

function useImmerState(initialState) {
  const [state, setState] = useState(initialState);

  const produceWithSetState = useMemo(
    () => (updater, triggerFunction) => {
      setState((prevState) => {
        const nextState = produce(prevState, updater);

        if (nextState !== prevState) {
          setState(nextState);
          if (typeof triggerFunction === 'function') {
            triggerFunction(nextState);
          }
        }

        return prevState;
      });
    },
    [setState]
  );

  return [state, produceWithSetState];
}

export default useImmerState;
