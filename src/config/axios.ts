import axios from 'axios'
import type { AxiosError, AxiosRequestHeaders } from 'axios'

type IRequest = {
  url: string
  method: 'GET' | 'POST'
  params?: RequestData
  data?: RequestData
  headers?: AxiosRequestHeaders
}
type RequestData = Record<string, unknown>

interface IResponse<TResponse> {
  data: TResponse
  error: AxiosError<{ error: string }> | string | null
}

export async function AxiosRequest<TResponse>(request: IRequest): Promise<IResponse<TResponse>> {
  try {
    const { data } = await axios.request<TResponse>(request)
    return { data, error: null }
  } catch (error) {
    if (axios.isAxiosError(error)) return { error: error.response?.data, data: null }
    if (error instanceof Error) return { error: error.message, data: null }
  }
  return { error: 'Unknown error', data: null }
}
