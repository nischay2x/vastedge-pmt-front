export const formatDate = (params) => {
    return params.value ? `${params.value}`.slice(0, 10) : "N/A"
}

export const formatCurrency = (params) => {
    return params.value ? `₹ ${params.value}` : "N/A"
} 