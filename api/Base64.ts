const decode = (str: string) => Buffer.from(str, 'base64').toString('ascii')
const encode = (str: string) => Buffer.from(str).toString('base64')

export {
    decode,
    encode
};