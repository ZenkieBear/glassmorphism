type RGB = {
    r: number,
    g: number,
    b: number;
}
/**
 * HSV 转 RGB
 * @param {number} h 色相
 * @param {number} s 饱和度
 * @param {number} v 明度
 */
const hsv2rgb = (h:number, s: number, v: number): RGB => {
    // 正解
    let [r, g, b] = [0, 0, 0];
    s /= 100.0;
    v /= 100.0;
    h /= 60; // area
    let i = Math.floor(h); // integer
    let f = h - i; // redundant
    // situations
    let [p1, p2, p3] = [v * (1 - s), // 饱和度颜色
        v * (1 - s * f), // 差饱和度颜色
        v * (1 - s * (1 - f))]; // 过度饱和度颜色
    switch(i) {
        case 0:
        case 6:
            [r, g, b] = [v, p3, p1];
            break;
        case 1:
            [r, g, b] = [p2, v, p1];
            break;
        case 2:
            [r, g, b] = [p1, v, p3];
            break;
        case 3:
            [r, g, b] = [p1, p2, v];
            break;
        case 4:
            [r, g, b] = [p3, p1, v];
            break;
        case 5:
            [r, g, b] = [v, p1, p2];
            break;
    }
    return {r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)};
}

export { hsv2rgb };
export { RGB };