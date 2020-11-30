import request from 'request';
import { JSDOM } from 'jsdom';
import main from './main';
import cBypass from './cBypass';

interface stagedQuery {
    id: number,
    type: 'v3' | 'v2',
    sessid: string,
    token: string,
    token_v3?: string
}

interface stagedResult {
    status: 'success' | 'v2'
}

export default class query {
    private id = 2504061;
    private uri = 'https://russiantastes.ru';
    private uriPlus = '/nominees/2504061'
    private uriPlusPlus = '/local/ajax/vote2/';
    private proxy: string;

    constructor() {
        //this.proxy = `http://XKw9zD:GD6Xqv@193.187.144.248:8000`;
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
                let v3_token = await cBypass.v3(this.proxy, main.v3_key, this.uri + this.uriPlus + this.uriPlusPlus);
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
            await request.post(this.uri + this.uriPlusPlus, {
                body: JSON.stringify(q),
                headers: {
                    'Content-Type': 'application/json'
                }
            }, async (err, res) => {
                if (err) return reject(err);
                console.log(res.body);
                let resp = JSON.parse(res.body) as stagedResult;
                if (resp.status == 'success') {
                    main.counter++
                    return resolve();
                } else {
                    q.token_v3 = q.token;
                    q.token = await cBypass.v2(this.proxy, main.v2_key);
                    q.type = 'v2';
                    request.post(this.uri + this.uriPlusPlus, {
                        body: JSON.stringify(q),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }, (err, res) => {
                        if (err) return reject(err);
                        let resp = JSON.parse(res.body) as stagedResult;
                        if (resp.status == 'success') {
                            main.counter++
                            return resolve();
                        }
                        return reject();
                    });
                }
                return resolve();
            });
        });
    }

}