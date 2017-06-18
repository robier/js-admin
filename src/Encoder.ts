import {Entity} from "./Entity";


class Encoder {

    toJsonApi(entity: Entity): string
    {
        let data = {data: {attributes:{}}, type: entity.type()};

        if(entity.exists()){
            data['id'] = entity.id();
        }

        entity.dirty().keys()

        return JSON.stringify(data);
    }

}