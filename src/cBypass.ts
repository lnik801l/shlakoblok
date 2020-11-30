import request from 'request';

export default class cBypass {
    private static api = 'http://rucaptcha.com/in.php';
    private static apiKey = 'ec4374eb017deb4c3a834115c4fdd4bd';
    public static async v2(proxyIp: string, key: string) {
        let query = cBypass.api;
        query += `?key=${cBypass.apiKey}&method=userrecaptcha&googlekey=${key}&proxy=${proxyIp}&pageurl=russiantastes.ru`;
        request.get(query, {}, (_err, res) => {
            if ((res.body as string).indexOf('OK|') > -1) {
                console.log((res.body as string).split('OK|')[1]);
            }
        });
    }
    public static async v3(proxyId: string, key: string, pageurl: string) {
        try {
            let query = this.api;
            query += `?key=${key}&method=userrecaptcha&version=v3&action=submit&min_score=0.5&googlekey=${key}&pageurl=${pageurl}`;
            request.get(query, {
                proxy: proxyId
            }, (err, res) => {
                if (err) return console.error(err);
                console.log(res.body);
                let str = res.body as string;
                if (str.indexOf('OK|') > -1) {
                    console.log(str.split('OK|')[1]);
                }
            })
        } catch (err) {

        }

    }
}