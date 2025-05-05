
import { toast } from "@/hooks/use-toast";

// Processing fee percentage
const PROCESSING_FEE_PERCENTAGE = 10;
const ADMIN_USERNAME = "508"; // The admin's username who receives the processing fees

export interface PaymentResult {
  success: boolean;
  transactionId?: string;
  error?: string;
}

// Store payments in localStorage for demo
const getStoredPayments = () => {
  try {
    const stored = localStorage.getItem('payments');
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading payments:', error);
    return [];
  }
};

const savePayments = (payments: any[]) => {
  try {
    localStorage.setItem('payments', JSON.stringify(payments));
  } catch (error) {
    console.error('Error saving payments:', error);
  }
};

export const processPayment = async (amount: number, recipientAddress: string): Promise<PaymentResult> => {
  try {
    // Check if running in Farcaster environment
    if (typeof window === "undefined" || !window.farcaster) {
      return {
        success: false,
        error: "Not running in Farcaster environment"
      };
    }

    // Calculate fee amount
    const feeAmount = (amount * PROCESSING_FEE_PERCENTAGE) / 100;
    const recipientAmount = amount - feeAmount;
    
    console.log(`Processing payment: $${amount} total, $${recipientAmount} to recipient, $${feeAmount} fee to @${ADMIN_USERNAME}`);
    
    // In a production app, this would use the Farcaster wallet API
    // For this demo, we'll simulate a successful payment
    const transactionId = `tx_${Math.random().toString(36).substring(2, 15)}`;
    
    const paymentDetails = {
      id: transactionId,
      amount,
      recipientAmount,
      feeAmount,
      recipientAddress,
      feeRecipient: ADMIN_USERNAME,
      timestamp: new Date().toISOString()
    };
    
    // Store the payment in localStorage
    const payments = getStoredPayments();
    payments.push(paymentDetails);
    savePayments(payments);
    
    toast({
      title: "Payment successful",
      description: `$${recipientAmount} sent (including $${feeAmount} processing fee)`,
    });
    
    return {
      success: true,
      transactionId
    };
  } catch (error) {
    console.error("Payment error:", error);
    return {
      success: false,
      error: "Payment processing failed"
    };
  }
};

export const requestWithdrawal = async (amount: number, withdrawAddress: string): Promise<PaymentResult> => {
  try {
    // Calculate fee
    const feeAmount = (amount * PROCESSING_FEE_PERCENTAGE) / 100;
    const withdrawAmount = amount - feeAmount;
    
    console.log(`Processing withdrawal: $${amount} total, $${withdrawAmount} to user, $${feeAmount} fee to @${ADMIN_USERNAME}`);
    
    // In a production app, this would use the Farcaster wallet API
    // For this demo, we'll simulate a successful withdrawal
    const transactionId = `wtx_${Math.random().toString(36).substring(2, 15)}`;
    
    const withdrawalDetails = {
      id: transactionId,
      amount,
      withdrawAmount,
      feeAmount,
      withdrawAddress,
      feeRecipient: ADMIN_USERNAME,
      timestamp: new Date().toISOString()
    };
    
    // Store the withdrawal in localStorage
    const withdrawals = localStorage.getItem('withdrawals') ? 
      JSON.parse(localStorage.getItem('withdrawals') || '[]') : [];
    withdrawals.push(withdrawalDetails);
    localStorage.setItem('withdrawals', JSON.stringify(withdrawals));
    
    toast({
      title: "Withdrawal initiated",
      description: `$${withdrawAmount} will be sent to your account (after $${feeAmount} processing fee)`
    });
    
    return {
      success: true,
      transactionId
    };
  } catch (error) {
    console.error("Withdrawal error:", error);
    return {
      success: false,
      error: "Withdrawal processing failed"
    };
  }
};

export const getUserBalance = (userId: number): number => {
  // In a production app, this would come from your database
  // For this demo, we'll calculate from stored payments
  try {
    const payments = getStoredPayments();
    const userPayments = payments.filter((payment: any) => 
      payment.recipientAddress === userId.toString() || 
      payment.recipientAddress === `user_${userId}`
    );
    
    const withdrawals = localStorage.getItem('withdrawals') ? 
      JSON.parse(localStorage.getItem('withdrawals') || '[]') : [];
    const userWithdrawals = withdrawals.filter((withdrawal: any) => 
      withdrawal.withdrawAddress === userId.toString() || 
      withdrawal.withdrawAddress === `user_${userId}`
    );
    
    const totalReceived = userPayments.reduce((total: number, payment: any) => total + payment.recipientAmount, 0);
    const totalWithdrawn = userWithdrawals.reduce((total: number, withdrawal: any) => total + withdrawal.amount, 0);
    
    return totalReceived - totalWithdrawn;
  } catch (error) {
    console.error("Error calculating user balance:", error);
    return 0;
  }
};
