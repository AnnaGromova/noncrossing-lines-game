export class IntersectionChecker {
    static checkCrossing(points, edges) {
        const lookedPoints = [];
        const edgesEntries = Object.entries(edges);
        for (const [point, linkedPoints] of edgesEntries) {
            lookedPoints.push(point);
            for (const linkedPoint of linkedPoints) {
                for (const [secondPoint, secondLinkedPoints] of edgesEntries) {
                    if (!lookedPoints.includes(secondPoint) && secondPoint !== linkedPoint) {
                        for (const secondLinkedPoint of secondLinkedPoints) {
                            if (linkedPoint !== secondLinkedPoint &&
                                IntersectionChecker.isCrossingEdges(
                                    {
                                        point: points[point],
                                        linkedPoint: points[linkedPoint],
                                        secondPoint: points[secondPoint],
                                        secondLinkedPoint: points[secondLinkedPoint]
                                    }
                                ))
                                return true;
                        }
                    }
                }
            }
        }

        return false;
    };

    static isCrossingEdges(points) {
        const {x: x1, y: y1} = points.point;
        const {x: x2, y: y2} = points.linkedPoint;
        const {x: x3, y: y3} = points.secondPoint;
        const {x: x4, y: y4} = points.secondLinkedPoint;
        const k1 = (y2 - y1) / (x2 - x1);
        const k2 = (y4 - y3) / (x4 - x3);
        if (Math.abs(k1 - k2) > 0.000009) {
            const b1 = y1 - k1 * x1;
            const b2 = y3 - k2 * x3;
            const crossingX = (b1 - b2) / (k2 - k1);
            const crossingY = k1 * crossingX + b1;
            if (crossingX > Math.min(x1, x2)
                && crossingX < Math.max(x1, x2)
                && crossingY > Math.min(y1, y2)
                && crossingY < Math.max(y1, y2)
                && crossingX > Math.min(x3, x4)
                && crossingX < Math.max(x3, x4)
                && crossingY > Math.min(y3, y4)
                && crossingY < Math.max(y3, y4)) {
                return true;
            }
        }

        return false;
    };
}
