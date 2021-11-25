/* 三阶贝塞尔曲线 */
export class CubicBezier {
    public controlPoints: number[] = [];

    public coords: Array<Array<number>> = [];

    public constructor(x1: number, y1: number, x2: number, y2: number) {
        const precision = 100;
        this.controlPoints = [x1, y1, x2, y2];
        this.coords = this.getCoordsArray(precision);
    }

    public getCoord(t: number) {
        if (t > 1 || t < 0) return;

        const _t = 1 - t;
        const [x1, y1, x2, y2] = this.controlPoints;
        const coefficient1 = 3 * t * Math.pow(_t, 2);
        const coefficient2 = 3 * _t * Math.pow(t, 2);
        const coefficient3 = Math.pow(t, 3);
        const px = coefficient1 * x1 + coefficient2 * x2 + coefficient3;
        const py = coefficient1 * y1 + coefficient2 * y2 + coefficient3;
        // 结果只保留三位有效数字
        return [parseFloat(px.toFixed(3)), parseFloat(py.toFixed(3))];
    }

    public getCoordsArray(precision: number) {
        const step = 1 / (precision + 1);
        const result: Array<Array<number>> = [];
        for (let t = 0; t <= precision + 1; t++) {
            const coord = this.getCoord(t * step);
            coord && result.push(coord);
        }
        this.coords = result;
        return result;
    }

    public getY(x: number) {
        if (x >= 1) return 1;
        if (x <= 0) return 0;
        let startX = 0;
        for (let i = 0; i < this.coords.length; i++) {
            if (this.coords[i][0] >= x) {
                startX = i;
                break;
            }
        }
        const axis1 = this.coords[startX];
        const axis2 = this.coords[startX - 1];
        const k = (axis2[1] - axis1[1]) / (axis2[0] - axis1[0]);
        const b = axis1[1] - k * axis1[0];
        // 结果也只保留三位有效数字
        // return parseFloat((k * x + b).toFixed(3));
        return k * x + b;
    }
}

export function getBezierParams(bezier: string) {
    return bezier
        .slice(13, -1)
        .split(',')
        .map(i => +i) as [number, number, number, number];
}
