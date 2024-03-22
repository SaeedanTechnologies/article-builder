import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ScrollToTopOnRouteChange() {
  const history = useNavigate();

  useEffect(() => {
    // Scroll to the top of the page when the route changes
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });

    return () => {
      // Clean up the listener when the component unmounts
      unlisten();
    };
  }, [history]);

  return null; // This component doesn't render anything in the DOM
}

export default ScrollToTopOnRouteChange;
