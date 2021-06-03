export abstract class Filter {
    private static _filter: string = '';
    private static _valid: boolean;

    static to(address: string) {
        this._filter += `({to} == '${address}')`;
        this._valid = true;
        return this;
    }

    static from(address: string) {
        this._filter += `({from} == '${address}')`;
        this._valid = true;
        return this;
    }

    static method(methodId: string) {
        this._filter += `({methodId} == '${methodId}')`;
        this._valid = true;
        return this;
    }

    static and() {
        this._filter += ` AND `;
        this._valid = false;
        return this;
    }

    static or() {
        this._filter += ` OR `;
        this._valid = false;
        return this;
    }

    static build() {
        if (!this._valid) throw new Error('Invalid filter');
        return this._filter;
    }
}