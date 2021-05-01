import { print } from './main';

test('Sample Test', () => {
    console.log = jest.fn();
    print('hello');
    expect(console.log).toHaveBeenCalledWith('hello');
});