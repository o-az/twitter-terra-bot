import { postTweet, fetchTop100Coingecko } from '@/api'
import { currency, currencyCompact } from '@/utils'
import type { CoinData } from './api/types'

const getRecords = (records: CoinData[]): CoinData[] => {
  const symbols = ['ust', 'luna']
  const output = []
  for (let record = 0; record < records.length; record++) {
    const value = records[record]
    const oneAbove = records[record + 1]
    const oneBelow = records[record - 1]
    if (symbols.includes(value.symbol)) {
      output.push(oneBelow, value, oneAbove)
    }
  }
  return output
}

const marketCapAlign = (v: number) => (`${v}`.length === 1 ? `${v}  ` : v)
const symbolAlign = (s: string) => (s.length === 3 ? `${s}   ` : s)

const constructedTweet = (records: CoinData[]): string => {
  let output = ''
  records.map((record: CoinData, idx: number) => {
    output +=
      `${marketCapAlign(record.market_cap_rank)} $${symbolAlign(record.symbol.toUpperCase())}  ${currency(
        record.current_price
      )}  ${currencyCompact(record.market_cap)}\n` + `${idx === 2 ? '\n' : ''}`
  })
  return output
}

const tyeet = async () => {
  try {
    const { data: records } = await fetchTop100Coingecko()
    const tweetableRecords = getRecords(records)
    const tweet = constructedTweet(tweetableRecords)
    console.log(tweet)
    return await postTweet({ text: tweet })
  } catch (error) {
    console.error(error)
  }
  return false
}

const tyeetPeriodically = () => {
  tyeet().then(console.log).catch(console.error)
  setTimeout(tyeetPeriodically, 1000 * 60 * 60 * 4) // 4 hours
}

tyeetPeriodically()
