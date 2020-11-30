import * as fs from 'fs';
export default class proxyListFile {
    public static data: Array<string>;
    public static update() {
        this.data = fs.readFileSync('./proxies.txt').toString().split('\n');
    }
}