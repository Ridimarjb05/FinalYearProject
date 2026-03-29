/**
 * Pure utility function to calculate Profit and Loss details.
 */
const calculatePnL = (totalSales, totalCOGS, totalExpenses) => {
    if (totalSales === undefined || totalCOGS === undefined || totalExpenses === undefined) {
        throw new Error("All financial fields are required");
    }
    const grossProfit = Number(totalSales) - Number(totalCOGS);
    const netProfit = grossProfit - Number(totalExpenses);
    
    return {
        grossProfit,
        netProfit
    };
};

module.exports = {
    calculatePnL
};
