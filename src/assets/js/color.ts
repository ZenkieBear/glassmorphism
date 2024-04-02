type RGB = {
    r: number;
    g: number;
    b: number;
};
type RGBA = {
    r: number;
    g: number;
    b: number;
    a: number;
};
type HSV = {
    h: number;
    s: number;
    v: number;
};
/**
 * Translate HSV to RGB
 * @param {number} h hue
 * @param {number} s saturation
 * @param {number} v value
 */
const hsv2rgb = (h: number, s: number, v: number): RGB => {
    // 正解
    let [r, g, b] = [0, 0, 0];
    s /= 100.0;
    v /= 100.0;
    h /= 60; // area
    let i = Math.floor(h); // integer
    let f = h - i; // redundant
    // situations
    let [p1, p2, p3] = [
        v * (1 - s), // 饱和度颜色
        v * (1 - s * f), // 差饱和度颜色
        v * (1 - s * (1 - f)),
    ]; // 过度饱和度颜色
    switch (i) {
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
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255),
    };
};

/**
 * Trans string to rgb object
 * @param str RGB string, e.g. "rgb(255, 255, 255)" or "rgba(255, 255, 255, .9)"
 */
const str2rgb = (str: string) => {
    let valueStr: string = str.substring(
        str.indexOf('(') + 1,
        str.lastIndexOf(')'),
    );
    let numStr: Array<string> = valueStr.split(',');
    let nums: Array<number> = numStr.map((s) => {
        return Number.parseInt(s.trim());
    });
    let result: RGB = { r: nums[0], g: nums[1], b: nums[2] };
    return result;
};

/**
 * Trans string to rgba object
 * @param str RGB string, e.g. "rgb(255, 255, 255)" or "rgba(255, 255, 255, .9)"
 */
const str2rgba = (str: string) => {
    let valueStr: string = str.substring(
        str.indexOf('(') + 1,
        str.lastIndexOf(')'),
    );
    let numStr: Array<string> = valueStr.split(',');
    let nums: Array<number> = numStr.map((s) => {
        return Number.parseFloat(s.trim());
    });
    let result: RGBA = {
        r: Math.round(nums[0]),
        g: Math.round(nums[1]),
        b: Math.round(nums[2]),
        a: nums[3],
    };
    return result;
};

const rgb2hsv = (r: number, g: number, b: number) => {
    // count percentage
    r /= 255;
    g /= 255;
    b /= 255;
    const [max, min] = [Math.max(r, g, b), Math.min(r, g, b)];
    const range = max - min;
    let v = max;
    let s = v === 0 ? 0 : range / v;
    let h = 0;
    switch (v) {
        case r:
            h = (60 * (g - b)) / range;
            break;
        case g:
            h = 120 + (60 * (b - r)) / range;
            break;
        case b:
            h = 240 + (60 * (r - g)) / range;
            break;
    }
    range === 0 && (h = 0);
    h < 0 && (h += 360);
    s *= 100;
    v *= 100;
    return { h, s, v } as HSV;
};

export { hsv2rgb, str2rgb, str2rgba, rgb2hsv };
export { RGB };
