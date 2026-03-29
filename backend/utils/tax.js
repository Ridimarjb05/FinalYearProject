/**
 * Pure utility function to calculate VAT.
 * Uses Math.round to ensure financial accuracy.
 */
const calculateVAT = (subtotal, vatRate = 13) => {
    // Round to 2 decimal places properly
    const vatAmount = Math.round((Number(subtotal) * Number(vatRate))) / 100;
    const netTotal = Number(subtotal) + vatAmount;
    
    return {
        vatAmount: Number(vatAmount.toFixed(2)),
        netTotal: Number(netTotal.toFixed(2))
    };
};

module.exports = {
    calculateVAT
};
