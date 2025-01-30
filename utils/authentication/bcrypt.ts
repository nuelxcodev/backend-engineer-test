import bcrypt from 'bcryptjs'

export function HashData(data: string) {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(data, salt)
}

export function compareHashedData(hashed: string, compare_with: string) {
    return bcrypt.compareSync(compare_with, hashed)
}