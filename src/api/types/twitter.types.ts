interface TwitterError {
  code: number
  message: string
}

export interface PostTweetResponse {
  errors?: TwitterError[]
  data?: PostTweetData
}

interface PostTweetData {
  id: string
  text: string
}

export interface UploadMediaResponse {
  errors?: TwitterError[]
  data?: UploadMediaData
}

interface UploadMediaData {
  media_id: number
  media_id_string: string
  size: number
  expires_after_secs: number
  image: Image
}

type Image = { image_type: string; w: number; h: number }
