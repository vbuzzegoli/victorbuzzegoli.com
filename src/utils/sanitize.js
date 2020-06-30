export const sanitize = str => typeof str !== 'string' ? str : str.replace(/<[^>]*>/g, '') // prevent basic XSS
