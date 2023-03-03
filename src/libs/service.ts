export interface UdMeta {
  domain: string
  namehash: string
  owner: string
  reverse: boolean
  tokenId: string
}

export async function domains(addresses: string[]) {
  const resp = await fetch(
    'https://resolve.unstoppabledomains.com/reverse/query',
    {
      method: 'POST',
      body: JSON.stringify({
        addresses
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer cc857e76-df8f-4cfb-8a93-ebad02b66722'
      }
    }
  )
  const data: { data: { meta: UdMeta }[] } = await resp.json()
  return data
}
