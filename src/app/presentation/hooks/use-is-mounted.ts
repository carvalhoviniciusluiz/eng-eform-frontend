import { useEffect, useState } from 'react';

// https://github.com/facebook/react/issues/14927#issuecomment-469878110
export function useIsMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return mounted;
}
