const hello = process.env.HELLO;

export function print(str: string): void {
    console.log(str);
}

print(hello);