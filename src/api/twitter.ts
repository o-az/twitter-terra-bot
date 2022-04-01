import crypto from 'crypto'
import OAuth from 'oauth-1.0a'
import { AxiosRequest } from '@/config'
import { TWITTER as TWITTER_KEYS } from '@/config'
import type { PostTweetResponse } from './types'

const { consumer_key, consumer_secret, access_token_key, access_token_secret } = TWITTER_KEYS

const oauth = new OAuth({
  consumer: { key: consumer_key, secret: consumer_secret },
  signature_method: 'HMAC-SHA1',
  hash_function: (baseString: string, key: string) =>
    crypto.createHmac('sha1', key).update(baseString).digest('base64'),
})

export async function postTweet({ text }: { text: string }) {
  const url = `https://api.twitter.com/2/tweets`
  const OAuthTokens = { key: access_token_key, secret: access_token_secret }
  const auth = oauth.toHeader(oauth.authorize({ url: url, method: 'POST' }, OAuthTokens))
  const headers = { Authorization: auth.Authorization }
  return await AxiosRequest<PostTweetResponse>({ url, data: { text }, headers, method: 'POST' })
}
