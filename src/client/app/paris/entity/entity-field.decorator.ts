import {DataEntityType} from "./data-entity.base";
import {Field} from "./entity-field";
import {entitiesService} from "../services/entities.service";
import {entityFieldsService} from "../services/entity-fields.service";

export function EntityField(fieldConfig:Field):PropertyDecorator {
	return function (entityPrototype: DataEntityType, propertyKey: string | symbol) {
		let propertyConstructor:DataEntityType = Reflect.getMetadata("design:type", entityPrototype, propertyKey);

		let fieldConfigCopy:Field = Object.assign({}, fieldConfig);
		if (!fieldConfigCopy.id)
			fieldConfigCopy.id = String(propertyKey);

		fieldConfigCopy.type = fieldConfig.genericType || propertyConstructor;
		fieldConfigCopy.isArray = propertyConstructor === Array;
		entityFieldsService.addField(entityPrototype, fieldConfigCopy);
	}
}
