export const globalConfig = {
    /* 阻止页面滚动 */
    lockScroll() {
        const body = document.body;
        const scrollTop =
            document.documentElement.scrollTop || window.pageYOffset || body.scrollTop;

        // 存储原 style
        const { position, width, height, top, left } = body.style;
        const snapshoot = {
            position,
            width,
            height,
            top,
            left,
        };

        Object.assign(body.style, {
            position: 'fixed',
            width: '100%',
            height: `${parseFloat(getComputedStyle(body).height) - 1}px`, // 6PLUS IOS 12 遇到问题，不设置一个小于屏幕的高度，页面上 fixed 元素会错位？
            top: `${-scrollTop}px`,
            left: '0',
        });

        return () => {
            Object.assign(body.style, snapshoot);
            document.documentElement.scrollTop = scrollTop;
            window.scrollTo(0, scrollTop);
        };
    },
};

export const mergeGlobalConfig = (mergedConfig: Partial<typeof globalConfig>) => {
    Object.assign(globalConfig, mergedConfig);
};
