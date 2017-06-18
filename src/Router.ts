export class Router {
    protected _root: string;
    protected _map = {};

    constructor(root: string = '/') {
        this._root = root;
    }

    register(resourceType: string, url: string): this {
        this._map[resourceType] = url;

        return this;
    }

    has(resourceType: string): boolean
    {
        return typeof this._map[resourceType] !== 'undefined';
    }

    get(resourceType: string): string|null
    {
        if(this.has(resourceType)){
            return null;
        }

        return this._root + this._map[resourceType];
    }
}

export default Router;