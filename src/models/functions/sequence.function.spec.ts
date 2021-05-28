import { getDownSequence, getNextSequence, getUpSequence } from './sequence.function';

test("Get Next Sequnce Function 1", () => {
    const testCase = [
        { seq: 1, seqBase: 1 },
        { seq: 2, seqBase: 1 },
        { seq: 3, seqBase: 1 },
        { seq: 4, seqBase: 1 },
        { seq: 5, seqBase: 1 },
        { seq: 6, seqBase: 1 },
        { seq: 7, seqBase: 1 },
    ];
    const result = getNextSequence(testCase);
    expect(result).toMatchObject({ seq: 8, seqBase: 1 });
});

test("Get Next Sequnce Function 2", () => {
    const testCase = [
        { seq: 1, seqBase: 1 },
        { seq: 2, seqBase: 1 },
        { seq: 8, seqBase: 3 },
        { seq: 3, seqBase: 1 },
        { seq: 5, seqBase: 10 },
        { seq: 82, seqBase: 20 },
    ];
    const result = getNextSequence(testCase);
    expect(result).toMatchObject({ seq: 5, seqBase: 1 });
});

test("Get Next Sequnce Function 3", () => {
    const testCase = [];
    const result = getNextSequence(testCase);
    expect(result).toMatchObject({ seq: 1, seqBase: 1 });
});

test("Get Up Sequence Function 1", () => {
    const testCase = [
        { seq: 1, seqBase: 1 },
        { seq: 2, seqBase: 1 },
        { seq: 8, seqBase: 3 },
        { seq: 3, seqBase: 1 },
        { seq: 5, seqBase: 10 },
        { seq: 82, seqBase: 20 },
    ]
    const testTarget = { seq: 3, seqBase: 1 };
    const result = getUpSequence(testCase, testTarget);
    expect(result).toMatchObject({ seq: 5, seqBase: 2 });
});

test("Get Up Sequence Function 2", () => {
    const testCase = [
        { seq: 1, seqBase: 1 },
        { seq: 2, seqBase: 1 },
        { seq: 8, seqBase: 3 },
        { seq: 3, seqBase: 1 },
        { seq: 1, seqBase: 2 },
        { seq: 82, seqBase: 20 },
    ]
    const testTarget = { seq: 1, seqBase: 1 };
    const result = getUpSequence(testCase, testTarget);
    expect(result).toMatchObject({ seq: 1, seqBase: 3 });
});

test("Get Up Sequence Function 3", () => {
    const testCase = [
        { seq: 1, seqBase: 1 }, // 1
        { seq: 2, seqBase: 1 }, // 2
        { seq: 7, seqBase: 3 }, // 2.2
        { seq: 3, seqBase: 1 }, // 3
        { seq: 5, seqBase: 10 }, // 0.5
        { seq: 41, seqBase: 10 }, // 4.1
    ]
    const testTarget = { seq: 41, seqBase: 10 };
    const result = getUpSequence(testCase, testTarget);
    expect(result).toMatchObject({ seq: 5, seqBase: 2 });
});

test("Get Down Sequence Function 1", () => {
    const testCase = [
        { seq: 1, seqBase: 1 },
        { seq: 2, seqBase: 1 },
        { seq: 8, seqBase: 3 },
        { seq: 3, seqBase: 1 },
        { seq: 5, seqBase: 10 },
        { seq: 41, seqBase: 10 },
    ]
    const testTarget = { seq: 3, seqBase: 1 };
    const result = getDownSequence(testCase, testTarget);
    expect(result).toMatchObject({ seq: 5, seqBase: 1 });
});

test("Get Down Sequence Function 2", () => {
    const testCase = [
        { seq: 1, seqBase: 1 },
        { seq: 2, seqBase: 1 },
        { seq: 8, seqBase: 3 },
        { seq: 3, seqBase: 1 },
        { seq: 5, seqBase: 10 },
        { seq: 41, seqBase: 10 },
    ]
    const testTarget = { seq: 41, seqBase: 10 };
    const result = getDownSequence(testCase, testTarget);
    expect(result).toMatchObject({ seq: 41, seqBase: 10 });
});

test("Get Down Sequence Function 3", () => {
    const testCase = [
        { seq: 1, seqBase: 1 },
        { seq: 2, seqBase: 1 },
        { seq: 8, seqBase: 3 },
        { seq: 3, seqBase: 1 },
        { seq: 1, seqBase: 2 },
        { seq: 41, seqBase: 10 },
    ]
    const testTarget = { seq: 1, seqBase: 2 };
    const result = getDownSequence(testCase, testTarget);
    expect(result).toMatchObject({ seq: 3, seqBase: 2 });
});