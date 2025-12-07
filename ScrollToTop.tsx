
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // The import paths are correct for v6. If you encounter 'Module has no exported member' errors, please ensure `react-router-dom` and `@types/react-router-dom` are installed and up-to-date (v6 or later).

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;