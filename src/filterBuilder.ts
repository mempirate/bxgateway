export abstract class Filter {
    private static _filter: string = '';

    static to(address: string) {
        this._filter += `({to} == '${address}')`;
        return this;
    }

    static from(address: string) {
        this._filter += `({from} == '${address}')`;
        return this;
    }

    static method(methodId: string) {
        this._filter += `({methodId} == '${methodId}')`;
        return this;
    }

    static and() {
        this._filter += ` AND `;
        return this;
    }

    static or() {
        this._filter += ` OR `;
        return this;
    }

    static build() {
        return this._filter;
    }
}