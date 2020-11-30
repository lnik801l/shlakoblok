import cBypass from './cBypass';
import proxyList, { ProxyData } from './proxyList';
import proxyListFile from './proxyListFile';
import query from "./query";

export default class main {
    public static v3_key = '6LeNiPAZAAAAAJv_GqhfZO642pc-L8ArG0wAK60I';
    public static v2_key = '6LdO1vEZAAAAALfvylmSJ80Sm2saW0Yov7sG1PhV';
    public static counter = 0;

    public static proxyUrl(p: ProxyData): string {
        return `${p.https ? 'https://' : 'http://'}${p.ip}:${p.port}`;
    }

    public static randProxy(): string {
        let g = "http://" + proxyListFile.data[Math.floor(Math.random() * proxyListFile.data.length)];
        console.log(g);
        return g;
    }

    public static async main() {
        //await proxyList.update();
        proxyListFile.update();

        let gg = new query();
        await gg.vote();
        //let gg1 = await cBypass.v3(this.v3_key, 'https://russiantastes.ru/nominees/2504061/');
    }
}