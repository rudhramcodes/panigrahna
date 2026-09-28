import { useEffect } from 'react';

/**
 * Toggle for Inspect Element & Right-Click protection:
 * - true  => Inspect element and right click are DISABLED
 * - false => Inspect element and right click are ENABLED
 *
 * You can toggle this directly here (set true or false)
 * or via .env using VITE_DISABLE_INSPECT=true / false
 */
export const DISABLE_INSPECT = false;

export function useImageProtection() {
  useEffect(() => {
    // If DISABLE_INSPECT is false, inspect element and right-click remain enabled
    if (!DISABLE_INSPECT && import.meta.env.VITE_DISABLE_INSPECT !== 'true') {
      return;
    }

    const handleContextMenu = (e) => e.preventDefault();

    const handleKeyDown = (e) => {
      // F12
      if (e.key === 'F12') {
        e.preventDefault();
        return;
      }
      // Ctrl/Cmd+Shift+I/J/C - DevTools shortcuts
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && ['I', 'J', 'C'].includes(e.key.toUpperCase())) {
        e.preventDefault();
        return;
      }
      // Ctrl/Cmd+U - View Source
      if ((e.ctrlKey || e.metaKey) && e.key.toUpperCase() === 'U') {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
}
