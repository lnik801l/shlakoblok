import cBypass from './cBypass';
import proxyList, { ProxyData } from './proxyList';
import query from "./query";

export default class main {
    private static v3_key = '6LeNiPAZAAAAAJv_GqhfZO642pc-L8ArG0wAK60I';
    private static v2_key = '6LdO1vEZAAAAALfvylmSJ80Sm2saW0Yov7sG1PhV';

    public static proxyUrl(p: ProxyData): string {
        return `${p.https ? 'https://' : 'http://'}${p.ip}:${p.port}`;
    }
    public static async main() {
        let p = await proxyList.get();

        let gg = new query(this.proxyUrl(p[0]));
        await gg.test();
        let gg1 = await cBypass.v3(this.proxyUrl(p[1]), this.v3_key, 'https://russiantastes.ru/nominees/2504061/');
    }
}