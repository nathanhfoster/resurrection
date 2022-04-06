import { createContext, createElement } from 'react';
import isValidContext from '../isValidContext';

interface testType {
    name: string,
    context: any,
    expected: boolean;
}

type testsType = testType[];

const testValues = [undefined, null, 0, '', NaN, {}, []];

const truthyTests: testsType = testValues.map((e) => ({
    name: `should return true when context is React.createContext(${e})`,
    context: createContext(e),
    expected: true,
}));

const falseyTests: testsType = testValues.map((e) => ({
    name: `should return false when context is ${e}`,
    context: e,
    expected: false,
}));

const reactElementTests: testsType = testValues.map((e: any) => ({
    name: `should return false when context is React.creatElement(${e})`,
    context: createElement(e),
    expected: false,
}));

const Tests = [...truthyTests, ...falseyTests, ...reactElementTests];

describe('isValidContext', () => {
    const runTest = ({ name, context, expected }: testType, testNumber: number) => {
        const testNamePrefix = `Test ${testNumber} - ${name}`;
        return it(testNamePrefix, () => {
            const result = isValidContext(context);
            expect(result).toBe(expected);
        });
    };

    Tests.forEach((testType, i) => runTest(testType, i));
});
