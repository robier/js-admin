import Entity from "./Entity";
import Router from "./Router";


interface RepositoryInterface {
    persist: () => Promise<Entity>
}



class Ajax {

    protected _router: Router;

    constructor(router: Router){
        this._router = router;
    }
    call(type: string, url: string) {
        this._router.
    }


}


export class Repository implements RepositoryInterface {
    persist(entity: Entity): Promise<Entity> {
        if (entity.isMarked()) {
            return this.destroy(entity);
        }
        if (entity.exists()) {
            return this.update(entity);
        }

        return this.create(entity);
    }
}

export default Repository;