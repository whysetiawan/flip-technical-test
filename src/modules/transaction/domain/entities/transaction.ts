import { z } from 'zod';

const transactionSchema = z.object({
  accountNumber: z.string(),
  amount: z.number(),
  beneficiaryBank: z.string(),
  beneficiaryName: z.string(),
  completedAt: z.string(),
  createdAt: z.string(),
  fee: z.number(),
  id: z.string(),
  remark: z.string(),
  senderBank: z.string(),
  status: z.enum(['PENDING', 'SUCCESS']).or(z.string()),
  uniqueCode: z.number(),
});

export type Transaction = z.infer<typeof transactionSchema>;

const create = (data: Transaction): Transaction => {
  return transactionSchema.parse(data);
};

export default {
  create,
  schema: transactionSchema,
};
