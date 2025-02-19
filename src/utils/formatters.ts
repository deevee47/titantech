// utils/formatters.ts

export const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString();
  };
  
  export const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };