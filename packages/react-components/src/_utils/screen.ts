/**
 * @description is fullscreen
 */
export function getIsFs() {
    const windowWidth = window.screen.width;
    const windowHeight = window.screen.height;

    const isiOSFullScreen =
        [
            {
                w: 375, // X
                h: 812,
            },
            {
                w: 414, // XR
                h: 896,
            },
            {
                w: 390, // 12pro
                h: 844,
            },
            {
                w: 428, // 12pro max
                h: 926,
            },
        ].findIndex(item => item.w === windowWidth && item.h === windowHeight) > -1;
    const isA = windowHeight / windowWidth > 1.96;
    return isiOSFullScreen || isA;
}

export const isFs = getIsFs();
