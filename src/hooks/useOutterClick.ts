import { useOutterClickType } from '@types';
import { useEffect } from 'react';
/**
 * Detects if a click event occurs outside a parent
 * @param {React.Ref} ref - the ref of the parent node
 * @param {function(): any} callback - callback for when the click event occurs outside the ref
 * @returns {void}
 */
const useOutterClick: useOutterClickType = (ref, callback) => {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    const handleClickOutside = (event: MouseEvent) => {
      if (!ref.current?.contains(event.target)) {
        callback(event);
      }
    };

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
};

export default useOutterClick;
