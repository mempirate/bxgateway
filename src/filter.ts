export class Filter {
    private _filter: string = '';
    private _valid: boolean = false;

    to(address: string) {
        this._filter += `({to} == '${address}')`;
        this._valid = true;
        return this;
    }

    from(address: string) {
        this._filter += `({from} == '${address}')`;
        this._valid = true;
        return this;
    }

    method(methodId: string) {
        this._filter += `({methodId} == '${methodId}')`;
        this._valid = true;
        return this;
    }

    get and() {
        this._filter += ` AND `;
        this._valid = false;
        return this;
    }

    get or() {
        this._filter += ` OR `;
        this._valid = false;
        return this;
    }

    build() {
        if (!this._valid) throw new Error('Invalid filter');
        return this._filter;
    }
}