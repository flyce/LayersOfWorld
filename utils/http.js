import { config } from "../config/env";
import { promisic } from "./util";

class Http {
    static async request({url, data, method = 'GET'}) {
        const res = await promisic(wx.request)({
            url: `${config.apiBaseUrl}${url}`,
            data,
            method,
            header: {
                Authorization: ''
            }
        });
        return res.data;
    }
}

export { Http };