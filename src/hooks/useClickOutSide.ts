import { useEffect, useRef, useState } from 'react';

export default function useClickOutSide(handleFeature?: React.Dispatch<React.SetStateAction<string | undefined>>) {
  const [show, setShow] = useState(false);
  const nodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutSide(e: MouseEvent) {
      if (nodeRef.current && !nodeRef.current.contains(e.target as Node)) {
        setShow(false);
        if (handleFeature) {
          handleFeature(undefined);
        }
      }
    }

    document.addEventListener('click', handleClickOutSide);
    return () => document.removeEventListener('click', handleClickOutSide);
  }, [handleFeature]);

  return { show, setShow, nodeRef };
}
