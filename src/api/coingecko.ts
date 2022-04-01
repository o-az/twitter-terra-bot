import axios from 'axios'
import { AxiosRequest } from '@/config'
import type { CoinPrice, CoinData } from './types'

const URL = 'https://api.coingecko.com/api/v3'

const defaultVS = ['usd', 'btc']

export async function fetchCoingecko<T>({
  vsCurrencies = defaultVS,
  coinIds,
}: {
  vsCurrencies?: string[]
  coinIds: T[]
}) {
  const params = {
    ids: coinIds.join(','),
    vs_currencies: vsCurrencies.join(','),
    include_market_cap: 'true',
    include_24hr_vol: 'true',
    include_24hr_change: 'true',
    include_last_updated_at: 'true',
  }
  const url = `${URL}/simple/price`
  return await AxiosRequest<Record<string, CoinData>>({ url, params, method: 'GET' })
}

export async function fetchTop100Coingecko() {
  const params = {
    page: 1,
    per_page: 20,
    vs_currency: 'usd',
    order: 'market_cap_desc',
    price_change_percentage: '24h',
  }
  const url = `${URL}/coins/markets`
  return await AxiosRequest<Array<CoinData>>({ url, params, method: 'GET' })
}
