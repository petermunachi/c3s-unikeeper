import { AxiosRequestHeaders } from "axios"

export default function createHeaders(
  contentType = "application/json",
  accessToken?: string
): AxiosRequestHeaders {
  const headers: AxiosRequestHeaders = {
    "Content-Type": contentType,
    Accept: "*/*",
    "Access-Control-Allow-Headers": "*",
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
  }

  return headers
}
