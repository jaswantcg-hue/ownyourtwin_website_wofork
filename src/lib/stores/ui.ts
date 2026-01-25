/**
 * UI Store
 * Manages global UI state like modals, toasts, and navigation
 */

import { writable, derived, type Readable } from 'svelte/store';
import type { ToastNotification, ModalState } from '$lib/types';

// -------------------------------------------------------------------
// Types
// -------------------------------------------------------------------

interface UIState {
  theme: 'light' | 'dark' | 'auto';
  sidebarOpen: boolean;
  mobileMenuOpen: boolean;
  toasts: ToastNotification[];
  modal: ModalState;
  isPageLoading: boolean;
  activeTab: string;
}

interface UIStore extends Readable<UIState> {
  setTheme: (theme: 'light' | 'dark' | 'auto') => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  toggleMobileMenu: () => void;
  setMobileMenuOpen: (open: boolean) => void;
  showToast: (toast: Omit<ToastNotification, 'id'>) => void;
  dismissToast: (id: string) => void;
  clearAllToasts: () => void;
  openModal: (options: Omit<ModalState, 'isOpen'>) => void;
  closeModal: () => void;
  setPageLoading: (loading: boolean) => void;
  setActiveTab: (tab: string) => void;
}

// -------------------------------------------------------------------
// Initial State
// -------------------------------------------------------------------

const initialState: UIState = {
  theme: 'dark',
  sidebarOpen: true,
  mobileMenuOpen: false,
  toasts: [],
  modal: { isOpen: false },
  isPageLoading: false,
  activeTab: 'chat',
};

// -------------------------------------------------------------------
// Store Implementation
// -------------------------------------------------------------------

function createUIStore(): UIStore {
  const { subscribe, set, update } = writable<UIState>(initialState);

  // Auto-dismiss toast after duration
  const scheduleToastDismiss = (id: string, duration: number) => {
    setTimeout(() => {
      update(state => ({
        ...state,
        toasts: state.toasts.filter(t => t.id !== id),
      }));
    }, duration);
  };

  return {
    subscribe,

    /**
     * Set the application theme
     */
    setTheme(theme: 'light' | 'dark' | 'auto'): void {
      update(state => ({ ...state, theme }));

      // Apply theme to document
      if (typeof document !== 'undefined') {
        const root = document.documentElement;
        if (theme === 'dark') {
          root.classList.add('dark');
        } else if (theme === 'light') {
          root.classList.remove('dark');
        } else {
          // Auto - check system preference
          const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          root.classList.toggle('dark', prefersDark);
        }
      }
    },

    /**
     * Toggle sidebar visibility
     */
    toggleSidebar(): void {
      update(state => ({ ...state, sidebarOpen: !state.sidebarOpen }));
    },

    /**
     * Set sidebar open state directly
     */
    setSidebarOpen(open: boolean): void {
      update(state => ({ ...state, sidebarOpen: open }));
    },

    /**
     * Toggle mobile menu
     */
    toggleMobileMenu(): void {
      update(state => ({ ...state, mobileMenuOpen: !state.mobileMenuOpen }));
    },

    /**
     * Set mobile menu open state directly
     */
    setMobileMenuOpen(open: boolean): void {
      update(state => ({ ...state, mobileMenuOpen: open }));
    },

    /**
     * Show a toast notification
     */
    showToast(toast: Omit<ToastNotification, 'id'>): void {
      const id = `toast_${Date.now()}_${Math.random().toString(36).slice(2)}`;
      const duration = toast.duration ?? 5000;

      const newToast: ToastNotification = {
        id,
        ...toast,
        duration,
        dismissible: toast.dismissible ?? true,
      };

      update(state => ({
        ...state,
        toasts: [...state.toasts, newToast],
      }));

      // Schedule auto-dismiss
      scheduleToastDismiss(id, duration);
    },

    /**
     * Dismiss a specific toast
     */
    dismissToast(id: string): void {
      update(state => ({
        ...state,
        toasts: state.toasts.filter(t => t.id !== id),
      }));
    },

    /**
     * Clear all toasts
     */
    clearAllToasts(): void {
      update(state => ({ ...state, toasts: [] }));
    },

    /**
     * Open a modal dialog
     */
    openModal(options: Omit<ModalState, 'isOpen'>): void {
      update(state => ({
        ...state,
        modal: { isOpen: true, ...options },
      }));
    },

    /**
     * Close the modal dialog
     */
    closeModal(): void {
      update(state => ({
        ...state,
        modal: { isOpen: false },
      }));
    },

    /**
     * Set page loading state
     */
    setPageLoading(loading: boolean): void {
      update(state => ({ ...state, isPageLoading: loading }));
    },

    /**
     * Set the active navigation tab
     */
    setActiveTab(tab: string): void {
      update(state => ({ ...state, activeTab: tab }));
    },
  };
}

// -------------------------------------------------------------------
// Exports
// -------------------------------------------------------------------

export const uiStore = createUIStore();

// Derived stores
export const currentTheme = derived(
  uiStore,
  $ui => $ui.theme
);

export const isSidebarOpen = derived(
  uiStore,
  $ui => $ui.sidebarOpen
);

export const activeToasts = derived(
  uiStore,
  $ui => $ui.toasts
);

export const isModalOpen = derived(
  uiStore,
  $ui => $ui.modal.isOpen
);

export const pageLoading = derived(
  uiStore,
  $ui => $ui.isPageLoading
);

// -------------------------------------------------------------------
// Toast Helper Functions
// -------------------------------------------------------------------

/**
 * Show a success toast
 */
export function showSuccess(title: string, message?: string): void {
  uiStore.showToast({ type: 'success', title, message });
}

/**
 * Show an error toast
 */
export function showError(title: string, message?: string): void {
  uiStore.showToast({ type: 'error', title, message, duration: 7000 });
}

/**
 * Show a warning toast
 */
export function showWarning(title: string, message?: string): void {
  uiStore.showToast({ type: 'warning', title, message });
}

/**
 * Show an info toast
 */
export function showInfo(title: string, message?: string): void {
  uiStore.showToast({ type: 'info', title, message });
}
