export namespace TransactionDto {
  export type TransactionResponse = Record<string, Transaction>;
  interface Transaction {
    id: string;
    amount: number;
    unique_code: number;
    status: 'PENDING' | 'SUCCESS';
    sender_bank: string;
    account_number: string;
    beneficiary_name: string;
    beneficiary_bank: string;
    remark: string;
    created_at: string;
    completed_at: string;
    fee: number;
  }
}
