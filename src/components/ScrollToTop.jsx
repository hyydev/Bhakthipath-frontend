import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSmoothScroll } from "../app/SmoothScrollProvider";

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const { scrollTo } = useSmoothScroll();

  useEffect(() => {
    scrollTo(0, { immediate: true });
  }, [pathname, scrollTo]);

  return null;
}
