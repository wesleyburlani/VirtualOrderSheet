export const currencyFormatter = value => (
  parseFloat(value || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
)

export const currencyParser = value => (
  parseFloat(value.replace(/[^\d]/g, '')) / 100.0
)