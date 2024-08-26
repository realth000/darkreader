export type matrix5x5 = [
    [number, number, number, number, number],
    [number, number, number, number, number],
    [number, number, number, number, number],
    [number, number, number, number, number],
    [number, number, number, number, number]
];

export type matrix5x1 = [
    [number],
    [number],
    [number],
    [number],
    [number]
];

export type matrix = matrix5x5 | matrix5x1;

export function scale(x: number, inLow: number, inHigh: number, outLow: number, outHigh: number): number {
    return (x - inLow) * (outHigh - outLow) / (inHigh - inLow) + outLow;
}

export function clamp(x: number, min: number, max: number): number {
    return Math.min(max, Math.max(min, x));
}

// Note: the caller is responsible for ensuring that matrix dimensions make sense
export function multiplyMatrices<M extends matrix>(m1: matrix5x5, m2: matrix5x5 | matrix5x1): M {
    const result: number[][] = [];
    // 1. m1.length是行数
    for (let i = 0, len = m1.length; i < len; i++) {
        result[i] = [];
        // 2. m2[0].length是列数
        for (let j = 0, len2 = m2[0].length; j < len2; j++) {
            let sum = 0;
            // 3. m1[0].length是列数
            for (let k = 0, len3 = m1[0].length; k < len3; k++) {
                sum += m1[i][k] * m2[k][j];
            }
            result[i][j] = sum;
        }
    }
    // 计算过程：
    // result[0][0] = m1[0][0] * m2[0][0] +
    //                m1[0][1] * m2[1][0] +
    //                m1[0][2] * m2[2][0] +
    //                ...
    // result[0][1] = m1[0][0] * m2[0][1] +
    //                m1[0][1] * m2[1][1] +
    //                m1[0][2] * m2[2][1] +
    //                ...
    // 是矩阵乘法
    return result as M;
}
