function makeDate(timestamp: number): Date;
function makeDate(m: number, d: number, y: number): Date;
function makeDate(mOrTimestamp: number, d?: number, y?: number): Date {
  if (d !== undefined && y !== undefined) {
    return new Date(y, mOrTimestamp, d);
  } else {
    return new Date(mOrTimestamp);
  }
}

makeDate(12345678); // 1970-01-01T03:25:45.678Z
makeDate(3, 5, 2021); // 2021-04-05T03:00:00.000Z
makeDate(1, 3); // Error: No overload expects 2 arguments, but overloads
		// do exist that expect either 1 or 3 arguments.