const UPSTREAM_BASE = (Netlify.env.get('UPSTREAM_DOMAIN') || '').replace(/\/$/, '')

const NOT_NEEDED_HEADERS = new Set([
    'host', 'connection', 'keep-alive',
    'proxy-authenticate', 'proxy-authorization',
    'te', 'trailer', 'transfer-encoding', 'upgrade', 'forwarded',
    'x-forwarded-host', 'x-forwarded-proto', 'x-forwarded-port'
])

export default async function handler(request) {
    if (!UPSTREAM_BASE) {
        return new Response('UPSTREAM_DOMAIN env is not set', {status: 400})
    }
    
    try {
        const url = new URL(request.url)
        const upstreamUrl = UPSTREAM_BASE + url.pathname + url.search
        
        const headers = new Headers()
        let clientRealIp = null
        
        for (const [key, value] of request.headers) {
            const k = key.toLowerCase()
            
            if (NOT_NEEDED_HEADERS.has(k)) {
                continue
            }
            
            if (k === 'x-real-ip') {
                clientRealIp = value
                continue
            }
            
            if (k.startsWith('x-netlify-')) {
                continue
            }
            
            if (k.startsWith('x-nf-')) {
                continue
            }
            
            if (k === 'x-forwarded-for') {
                if (!clientRealIp) {
                    clientRealIp = value
                }
                continue
            }
            headers.set(k, value)
        }
        
        if (clientRealIp) {
            headers.set('x-forwarded-for', clientRealIp)
        }
        
        const method = request.method
        const needsBody = method !== 'GET' && method !== 'HEAD'
        
        const options = {
            method,
            headers,
            redirect: 'manual'
        }
        
        if (needsBody) {
            options.body = request.body
        }
        
        const upstream = await fetch(upstreamUrl, options)
        const responseHeaders = new Headers()
        
        for (const [k, v] of upstream.headers) {
            if (k.toLowerCase() === 'transfer-encoding') {
                continue
            }
            responseHeaders.set(k, value)
        }
        
        return new Response(upstream.body, {
            status: upstream.status,
            headers: responseHeaders
        })
    }
    catch (error) {
        return new Response('R-Failed', {status: 502})
    }
}
