import request from 'request';

export interface ProxyData {
    ip: string,
    port: number,
    protocol: string,
    anonymity: number,
    https: boolean,
    country: string,
    city: string
}

export default class proxyList {
    private static url = 'https://panel.farmproxy.ru/api/v1/proxies.json?protocols=http&api_key=89ic0f4535h9wpozkdu6mzpeth5tyd9ma9jmxjee';
    public static async get(): Promise<Array<ProxyData>> {
        return new Promise<Array<ProxyData>>((resolve, rej) => {
            request.get(this.url, {}, (err, res) => {
                if (err) return rej(err);
                return resolve(JSON.parse(res.body as string) as Array<ProxyData>);
            });
        });

    }
}