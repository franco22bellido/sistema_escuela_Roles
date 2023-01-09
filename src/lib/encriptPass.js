import bcrypt from 'bcryptjs';

export const encriptPassword = async (password)=>{
    const saltos = await bcrypt.genSalt(10);
    const passwordEncript = await bcrypt.hash(password, saltos);
    return passwordEncript
}

export const comparePass = async (password, passwordEncript)=>{
    const comparacion = await bcrypt.compare(password,passwordEncript);
    return comparacion;
}