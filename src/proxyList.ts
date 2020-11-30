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
    public static data: Array<ProxyData>;
    private static url = 'https://panel.farmproxy.ru/api/v1/proxies.json?protocols=http&api_key=89ic0f4535h9wpozkdu6mzpeth5tyd9ma9jmxjee';
    public static async update() {
        return new Promise<void>((resolve, rej) => {
            request.get(this.url, {}, (err, res) => {
                if (err) return rej(err);
                this.data = JSON.parse(res.body as string) as Array<ProxyData>;
                return resolve();
            });
        });
    }
}