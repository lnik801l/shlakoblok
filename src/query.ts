import request from 'request';
import { JSDOM } from 'jsdom';
import main from './main';
import proxyList from './proxyList';
import cBypass from './cBypass';

interface stagedQuery {
    id: number,
    type: 'v3' | 'v2',
    sessid: string,
    token: string,
    token_v3?: string
}

export default class query {
    private id = 2504061;
    private uri = 'https://russiantastes.ru/nominees/2504061';
    private uriPlus = '/local/ajax/vote2';
    private proxy: string;

    constructor() {
        this.proxy = main.randProxy();
    }

    public async vote() {
        try {
            await request.get(this.uri, {
                proxy: this.proxy
            }, async (err, res) => {
                if (err) {
                    return console.log(err);
                    //this.proxy = main.randProxy();
                    //return this.vote();
                }
                let jsdom = new JSDOM(res.body);
                let sessId = (jsdom.window.document.getElementById('sessid') as HTMLInputElement).value;
                let v3_token = await cBypass.v3(this.proxy, main.v3_key, this.uri);
                await this.stage2(sessId, v3_token);
            });
        } catch (err) {
            this.proxy = main.randProxy();
            this.vote();
        }

    }
    private async stage2(session: string, v3_key: string) {
        return new Promise<void>(async (resolve, reject) => {
            let q: stagedQuery = {
                id: this.id,
                type: 'v3',
                sessid: session,
                token: v3_key
            };
            await request.post(this.uri + this.uriPlus, {
                body: q
            }, (err, res) => {
                if (err) return reject(err);
                console.log(res.body);
                return resolve();
            });
        });
    }

}