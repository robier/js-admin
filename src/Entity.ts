import {Collection} from './Relations';
import {StringMapInterface} from './interfaces';

/**
 * Collection for Entity attributes
 */
class AttributeMap {
    protected _map;

    constructor(attributes: StringMapInterface = {}) {
        this._map = attributes;
    }

    has(name: string): boolean {
        return typeof this._map[name] !== 'undefined';
    }

    get(name: string): string | undefined {
        if (this.has(name)) {
            return this._map[name];
        }

        return undefined;
    }

    keys(): string[] {
        return Object.keys(this._map);
    }

    empty(): boolean {
        return this.count() === 0;
    }

    set(name: string, value: string | number): this {
        this._map[name] = value;

        return this;
    }

    remove(name: string): this {
        if (this.has(name)) {
            delete this._map[name];
        }

        return this;
    }

    count(): number {
        return this.keys().length;
    }

    all(): StringMapInterface {
        return this._map;
    }
}

/**
 * Calculates dirty state of one entity between original and current attributes.
 */
class Dirty {
    protected _entity: Entity;

    constructor(entity: Entity) {
        this._entity = entity;
    }

    /**
     * Entity getter
     *
     * @returns {Entity}
     */
    entity(): Entity {
        return this._entity;
    }

    /**
     * Check if attribute is dirty
     *
     * @param name
     * @returns {boolean}
     */
    attribute(name: string): boolean {
        return this.entity().original().get(name) !== this.entity().current().get(name);
    }

    /**
     * Check if entity is dirty
     *
     * @returns {boolean}
     */
    check(): boolean {
        return this.keys().length !== 0;
    }

    /**
     * Get list of dirty keys
     *
     * @returns {string[]}
     */
    keys(): string[] {
        return this.entity().keys().filter((keyName) => {
            return this.attribute(keyName);
        });
    }


}

/**
 * Representation of JSON API entity
 */
export class Entity {
    protected _type: string;
    protected _id: string | number | null = null;
    protected _deleted: boolean = false;

    protected _originalAttributes: AttributeMap;
    protected _currentAttributes = new AttributeMap();

    protected _relations: Collection;

    protected _dirty: Dirty;

    /**
     * @param {string} type
     * @param {string|number} id
     * @param {StringMapInterface} attributes
     */
    constructor(type: string, id: string | number | null = null, attributes: StringMapInterface = {}) {
        this._type = type;
        this._id = id;
        this._originalAttributes = new AttributeMap(attributes);
        this._relations = new Collection(this);
        this._dirty = new Dirty(this);
    }

    /**
     * Get original attributes collection
     *
     * @returns {AttributeMap}
     */
    original(): AttributeMap {
        return this._originalAttributes;
    }

    /**
     * Get current values collection
     *
     * @returns {AttributeMap}
     */
    current(): AttributeMap {
        return this._currentAttributes;
    }

    /**
     * Get relations collection
     *
     * @returns {Collection}
     */
    relations(): Collection {
        return this._relations;
    }

    /**
     * Get dirty object
     *
     * @returns {Dirty}
     */
    dirty(): Dirty {
        return this._dirty;
    }

    /**
     * Get keys of current entity
     *
     * @returns {string[]}
     */
    keys(): string[] {
        let keys = this.original().keys();

        this.current().keys().forEach((value) => {
            // we need to take care of duplicate keys
            if (keys.indexOf(value) === -1) {
                keys.push(value);
            }
        });

        return keys;
    }

    /**
     * Get entity type
     *
     * @returns {string}
     */
    type(): string {
        return this._type;
    }

    /**
     * Get entity ID
     *
     * @returns {string|number|null}
     */
    id(): string | number | null {
        return this._id;
    }

    /**
     * Get attribute value. First it tries to get value from current attributes, if nothing found then it tries to get
     * data from original values.
     *
     * @param name
     * @returns {string|number}
     */
    get(name: string): string | number {
        return this.current().get(name) || this.original().get(name);
    }

    /**
     * Set destroy flag
     *
     * @returns {Entity}
     */
    destroy(flag: boolean = true): this {
        this._deleted = flag;

        return this;
    }

    /**
     * Check if Entity is marked for destroying
     *
     * @returns {boolean}
     */
    isMarked(): boolean {
        return this._deleted;
    }

    /**
     * Check if model has ID, ie. check if model exists
     *
     * @returns {boolean}
     */
    exists(): boolean {
        return null !== this.id();
    }

    /**
     * Check if Entity has given attribute
     *
     * @param name
     * @returns {boolean}
     */
    has(name: string): boolean {
        return this.current().has(name) || this.original().has(name);
    }

    /**
     * Set attribute value
     *
     * @param {string} name
     * @param {string|number} value
     * @returns {Entity}
     */
    set(name: string, value: string | number): this {
        this.current().set(name, value);

        return this;
    }

    /**
     * Empty all changed attributes
     *
     * @returns {boolean}
     */
    empty(): boolean {
        return this.current().empty();
    }
}

export default Entity;