import { greatestCommonDivisor } from "./math.function";

interface SequenceLike {
    seq: number;
    seqBase: number;
}

export function getNextSequence(list: SequenceLike[]): SequenceLike {
    let currentMaxIndex = 0;

    list.forEach(element => {
        const { seq, seqBase } = element;

        if (seqBase == 0) {
            return;
        }

        currentMaxIndex = Math.max(currentMaxIndex, seq / seqBase);
    });

    return { seq: parseInt('' + (currentMaxIndex + 1)), seqBase: 1 };
}

export function getUpSequence(list: SequenceLike[], currentSeqence: SequenceLike): SequenceLike {
    const mapped = list.map(element => {
        const { seq, seqBase } = element;
        if (seqBase == 0) {
            throw 'Sequence Base cannot be 0';
        }
        return { ...element, product: seq / seqBase };
    });

    if (currentSeqence.seqBase == 0) {
        throw 'Sequence Base cannot be 0';
    }
    const targetProduct = currentSeqence.seq / currentSeqence.seqBase;
    mapped.sort((a, b) => a.product - b.product);

    let currentIndex = -1;
    mapped.forEach((value, i) => {
        const { product } = value;
        if (targetProduct == product) {
            currentIndex = i;
        }
    });

    if (currentIndex == -1) {
        throw 'Sequence Not Found';
    }

    if (currentIndex == 0) {
        return currentSeqence;
    } else if (currentIndex == 1) {
        const { seq, seqBase, product } = mapped[0];
        if (product > 1) {
            return { seq: parseInt('' + (product - 1)) + 1, seqBase: 1};
        } else {
            return { seq: seq, seqBase: seqBase + 1 };
        }
    } else {
        const { seq: seqA, seqBase: seqBaseA } = mapped[currentIndex - 2];
        const { seq: seqB, seqBase: seqBaseB } = mapped[currentIndex - 1];

        const targetSeq = seqA + seqB;
        const targetSeqBase = seqBaseA + seqBaseB;
        const divisor = greatestCommonDivisor(targetSeq, targetSeqBase);

        return { seq: targetSeq / divisor, seqBase: targetSeqBase / divisor };
    }
}

export function getDownSequence(list: SequenceLike[], currentSeqence: SequenceLike): SequenceLike {
    const mapped = list.map(element => {
        const { seq, seqBase } = element;
        if (seqBase == 0) {
            throw 'Sequence Base cannot be 0';
        }
        return { ...element, product: seq / seqBase };
    });

    if (currentSeqence.seqBase == 0) {
        throw 'Sequence Base cannot be 0';
    }
    const targetProduct = currentSeqence.seq / currentSeqence.seqBase;
    mapped.sort((a, b) => a.product - b.product);
    
    let currentIndex = -1;
    mapped.forEach((value, i) => {
        const { product } = value;
        if (targetProduct == product) {
            currentIndex = i;
        }
    });

    if (currentIndex == -1) {
        throw 'Sequence Not Found';
    }

    if (currentIndex == mapped.length - 1) {
        return currentSeqence;
    } else if (currentIndex == mapped.length - 2) {
        return getNextSequence(list);
    } else {
        const { seq: seqA, seqBase: seqBaseA } = mapped[currentIndex + 1];
        const { seq: seqB, seqBase: seqBaseB } = mapped[currentIndex + 2];

        const targetSeq = seqA + seqB;
        const targetSeqBase = seqBaseA + seqBaseB;
        const divisor = greatestCommonDivisor(targetSeq, targetSeqBase);

        return { seq: targetSeq / divisor, seqBase: targetSeqBase / divisor };
    }
}

export function sortBySequence({ seq: seqA, seqBase: seqBaseA }: SequenceLike, { seq: seqB, seqBase: seqBaseB }: SequenceLike) {
    const productA = seqA / seqBaseA;
    const productB = seqB / seqBaseB;
    return productA - productB;
}