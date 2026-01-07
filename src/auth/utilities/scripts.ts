import * as bcrypt from 'bcrypt';

async function hashPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);
    return hash
}

async function verifyHashPassword(passwordUser: string, passwordDB: string): Promise<boolean> {
    const isMatch = await bcrypt.compare(passwordUser, passwordDB);
    return isMatch
}


export { hashPassword, verifyHashPassword }