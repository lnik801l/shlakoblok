import request from 'request';
import { JSDOM } from 'jsdom';

export default class query {
    private uri = 'https://russiantastes.ru/nominees/2504061';
    private uriPlus = '/local/ajax/vote2';
    private proxy: string;

    constructor(proxy: string) {
        this.proxy = proxy;
    }

    public async test() {
        var test = await request.get(this.uri, {}, (_err, res) => {
            let jsdom = new JSDOM(res.body);
            let sessId = (jsdom.window.document.getElementById('sessid') as HTMLInputElement).value;

        });
    }

}