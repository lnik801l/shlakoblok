import request from 'request';

export default class cBypass {
    private static api = 'http://rucaptcha.com/in.php';
    private static apiKey = 'ec4374eb017deb4c3a834115c4fdd4bd';
    public static async v2(proxyIp: string, key: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            let query = cBypass.api;
            query += `?key=${cBypass.apiKey}&method=userrecaptcha&googlekey=${key}&proxy=${proxyIp}&pageurl=russiantastes.ru`;
            request.get(query, {}, (err, res) => {
                if (err) return reject(err);
                if ((res.body as string).indexOf('OK|') > -1) {
                    setTimeout(async () => {
                        return resolve((res.body as string).split('OK|')[1]);
                    }, 15000);
                }
                return reject();
            });
        });

    }
    public static async v3(proxyIp: string, key: string, pageurl: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            let query = this.api;
            query += `?key=${cBypass.apiKey}&method=userrecaptcha&proxy=${proxyIp}&version=v3&action=submit&min_score=0.5&googlekey=${key}&pageurl=${pageurl}`;
            request.get(query, {}, (err, res) => {
                if (err) return reject(err);
                let str = res.body as string;
                if (str.indexOf('OK|') > -1) {
                    setTimeout(async () => {
                        var key = await this.get(str.split('OK|')[1]);
                        return resolve(key);
                    }, 15000);
                }
            });
        });
    }
    public static async get(captchaKey: string) {
        return new Promise<string>((resolve, reject) => {
            request.get(`https://rucaptcha.com/res.php?key=${cBypass.apiKey}&action=get&id=${captchaKey}`, {}, (err, res) => {
                if (err) return reject(err);
                resolve((res.body as string).split('OK|')[1]);
            });
        });
    }
}