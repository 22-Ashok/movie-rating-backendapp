const {z} = require("zod")

const loginSchema = z.object({
    email:z.email(),
    password:z.string().min(5).max(14).regex(/[a-z]/).regex(/[A-Z]/).regex(/[0-9]/).regex(/[^a-zA-Z0-9]/)
});

const signUpSchema = z.object({
    name:z.string().min(3).max(20).trim(),
    email:z.email(),
    password:z.string().min(5).max(14).regex(/[a-z]/).regex(/[A-Z]/).regex(/[0-9]/).regex(/[^a-zA-Z0-9]/),
    role:z.enum(["user", "admin"])
})

module.exports = {loginSchema, signUpSchema}