const { Pool } = require("pg")
require("dotenv").config()

const isDevEnv = process.env.NODE_ENV === 'development'

const poolSettings = {
    connectionString: process.env.DATABASE_URL
}

if (isDevEnv) poolSettings.ssl = { rejectUnauthorized: false }

const pool = new Pool(poolSettings)

module.exports = isDevEnv ? {
    async query(text, params) {
        try {
            const res = await pool.query(text, params)
            console.log('executed query', { text })
            return res
        } catch (error) {
            console.error('error in query', { text })
            throw error
        }
    }
} : pool
