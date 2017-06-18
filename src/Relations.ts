import Entity from './Entity';

interface RelationsInterface {
    [key: string]: Relation
}

export class Collection {

    protected _collection: RelationsInterface[];
    protected _parent: Entity;

    constructor(parent: Entity, relations: RelationsInterface[] = []) {
        this._collection = relations;
        this._parent = parent;
    }

    parent(): Entity {
        return this._parent;
    }

    empty(): boolean {
        return this.count() === 0;
    }

    has(name: string): boolean {
        return typeof this._collection[name] !== 'undefined';
    }

    get(name: string): Relation {
        if (!this.has(name)) {
            throw 'Relation does not exist!';
        }

        return this._collection[name];
    }

    add(name: string, relation: Relation): this {
        this._collection[name] = relation;
        return this;
    }

    all(): RelationsInterface[] {
        return this._collection;
    }

    count(): number {
        return this._collection.length;
    }

    remove(name: string): this {
        if (!this.has(name)) {
            throw 'Relation does not exist';
        }

        delete this._collection[name];

        return this;
    }
}

export class Relation {
    protected _entities: Entity | null | Entity[];
    protected _parent: Entity;

    constructor(parent: Entity, entities: Entity | Entity[] | null = null) {
        this._entities = entities;
        this._parent = parent;
    }

    parent(): Entity {
        return this._parent;
    }

    isMany(): boolean {
        return Array.isArray(this._entities);
    }
}