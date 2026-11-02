import { z } from "zod";

export const signUpCredentialsStepSchema = z.object({
  email: z
    .string()
    .min(1, "Informe seu e-mail.")
    .pipe(z.email({ pattern: z.regexes.html5Email, error: "Informe um e-mail válido." })),
  password: z.string().min(1, "Informe sua senha."),
  nickname: z.string(),
});

export const signUpSchema = signUpCredentialsStepSchema.extend({
  nickname: z.string().refine((value) => value.trim().length > 0, "Informe seu apelido."),
});

export type SignUpFormValues = z.infer<typeof signUpSchema>;
