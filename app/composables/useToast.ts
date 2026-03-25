import type { IToast, ToastVariant } from "~/components/AppToast/index.types";

const toasts = ref<IToast[]>([]);

export const useToast = () => {
  const add = (
    message: string,
    options: { title?: string; variant?: ToastVariant; duration?: number } = {}
  ) => {
    const id = crypto.randomUUID();
    const toast: IToast = {
      id,
      message,
      title: options.title,
      variant: options.variant || "info",
      duration: options.duration ?? 5000,
    };

    toasts.value.push(toast);

    if (toast.duration && toast.duration > 0) {
      setTimeout(() => {
        remove(id);
      }, toast.duration);
    }

    return id;
  };

  const remove = (id: string) => {
    const index = toasts.value.findIndex((t) => t.id === id);
    if (index > -1) {
      toasts.value.splice(index, 1);
    }
  };

  const success = (message: string, title?: string) => {
    return add(message, { title, variant: "success" });
  };

  const error = (message: string, title?: string) => {
    return add(message, { title, variant: "danger" });
  };

  const warning = (message: string, title?: string) => {
    return add(message, { title, variant: "warning" });
  };

  const info = (message: string, title?: string) => {
    return add(message, { title, variant: "info" });
  };

  return {
    toasts: readonly(toasts),
    add,
    remove,
    success,
    error,
    warning,
    info,
  };
};
