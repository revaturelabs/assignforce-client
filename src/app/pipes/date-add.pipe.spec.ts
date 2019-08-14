import {DateAddPipe} from "./date-add.pipe";

describe("DateAddPipe", () => {
  it("create an instance", () => {
    const pipe = new DateAddPipe();
    expect(pipe).toBeTruthy();
  });

  it("should add value, in days, to unix timestamp", () => {
    const pipe = new DateAddPipe();

    const DAY = 24 * 60 * 60 * 1000;

    expect(pipe.transform(0, 1)).toBe(DAY);
    expect(pipe.transform(0, -1)).toBe(-DAY);
    expect(pipe.transform(0, 15)).toBe(15 * DAY);
    expect(pipe.transform(0, -15)).toBe(-15 * DAY);

    expect(pipe.transform(1000000000, 1)).toBe(1000000000 + DAY);
    expect(pipe.transform(1000000000, -1)).toBe(1000000000 - DAY);
    expect(pipe.transform(1000000000, 15)).toBe(1000000000 + 15 * DAY);
    expect(pipe.transform(1000000000, -15)).toBe(1000000000 - 15 * DAY);

    expect(pipe.transform(543210987654, 1)).toBe(543210987654 + DAY);
    expect(pipe.transform(543210987654, -1)).toBe(543210987654 - DAY);
    expect(pipe.transform(543210987654, 15)).toBe(543210987654 + 15 * DAY);
    expect(pipe.transform(543210987654, -15)).toBe(543210987654 - 15 * DAY);
  });
});
