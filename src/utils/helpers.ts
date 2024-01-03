/**
 * Получить все <style> элементы с аттрибутом "data-vite-dev-id"
 * (Нужно для правильного отображения стилей в shadowDOM в development mode).
 */
export const getViteDevStyleElements = (): HTMLStyleElement[] => {
    const styleElements = document.querySelectorAll('style');

    const filteredElements = Array.from(styleElements).filter((el) => {
        const viteDevId = el.getAttribute('data-vite-dev-id');

        if (viteDevId) {
            return true;
        }

        return false;
    })

    return filteredElements
};
