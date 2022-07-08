export class Filter {
    private _filter: string = '';
    private _valid: boolean = false;

    build() {
        if (!this._valid) throw new Error('Invalid filter');
        return this._filter;
    }

    to(address: string, eq: boolean = true) {
        if (eq) {
            this._filter += `({to} == '${address}')`;
        } else {
            this._filter += `({to} IN ${address})`;
        }
        this._valid = true;
        return this;
    }

    from(address: string, eq: boolean = true) {
        if (eq) {
            this._filter += `({from} == '${address}')`;
        } else {
            this._filter += `({from} IN ${address})`;
        }
        this._valid = true;
        return this;
    }

    method(methodId: string, eq: boolean = true) {
        if (eq) {
            this._filter += `({method_id} == '${methodId}')`;
        } else {
            this._filter += `({method_id} IN ${methodId})`;
        }
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
}