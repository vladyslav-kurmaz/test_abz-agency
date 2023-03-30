import { Component } from "react";

class Service extends Component {
    _apiBase = 'https://frontend-test-assignment-api.abz.agency/'
    _page = 1
    _count = 6

    onRequest = async (url, set = null) => {
        const res = await fetch(url, set)
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`)
        }

        return await res.json();    
    }

    getUsers = async (page = this._page, count = this._count) => {
        const res = await this.onRequest(`${this._apiBase}api/v1/users?page=${page}&count=${count}`)
        return res
    }

    getToken = async () => {
        const res = await this.onRequest(`${this._apiBase}api/v1/token`);
        return res
    }

    getPosition = async () => {
        const res = await this.onRequest(`${this._apiBase}api/v1/positions`);
        return res
    }

    postUser = async (formData) => {
        const token = await this.getToken();

        const res = await this.onRequest(`${this._apiBase}api/v1/users`, {method: 'POST', body: formData, headers: { 'Token': token.token,}, });
        return await res
    }

}

export default Service;