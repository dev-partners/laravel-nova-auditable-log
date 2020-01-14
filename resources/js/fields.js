export const normaliseFields = fields =>
{
    let indexedFields = {};

    fields.filter(field => field.attribute !== "")
        .forEach(field => {
            if (field.attribute !== "") {
                const {attribute, value, name} = field;
                indexedFields[attribute] = {
                    value,
                    label: name
                };
            }
        });

    // Support nova dependency container
    if (indexedFields.length !== fields.length) {
        const dependencies = fields.filter(field => {
            // dependencies don't have an attribute set
            return field.attribute === "" &&
                // they should have a "dependencies" prop
                typeof field.dependencies !== 'undefined' &&
                // all dependencies should be satisfied
                field.dependencies.length === field.dependencies.filter(dep => dep.satisfied).length
        });

        dependencies.forEach(field => {
            field.fields.forEach(f => {
                const {attribute, value, name} = f;
                indexedFields[attribute] = {
                    value,
                    label: name
                };
            })
        });
    }

    return indexedFields;
}
