/* SOURCE: https://github.com/gregberge/react-merge-refs/issues/5#issuecomment-643341631 */
/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from 'react';

export default function useMergedRefs (refs) {
  return useCallback(current => {
    refs.forEach(ref => {
      if (typeof ref === 'function') {
        ref(current);
      } else if (ref && !Object.isFrozen(ref)) {
        ref.current = current;
      }
    });
  }, refs);
}