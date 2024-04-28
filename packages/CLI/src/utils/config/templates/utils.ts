export const data = `export const listBoxItemsListGen =
(items: string[]) => items.map((item: string, index) => ({ id: index.toString(), name: item }));
`;

export const ui = `import { useEffect, useState } from "react";

export const useIsDocumentHidden = () => {
  const [isDocumentHidden, setIsDocumentHidden] = useState(false);

  useEffect(() => {
    const callback = () => setIsDocumentHidden(document.hidden);
    document.addEventListener('visibilitychange', callback);
    return () => window.removeEventListener('visibilitychange', callback);
  }, []);

  return isDocumentHidden;
};
`;