/**
 * Filter list of properties only to those where type is htv and workflow is completed.
 */
module.exports.filterHtvCompleteProperties = function filterHtvCompleteProperties(propertyData) {
    if (!Array.isArray(propertyData)) {
        throw new Error('Validation Error: propertyData is not of Array type');
    }

    return propertyData.filter(prop => prop.type === 'htv' && prop.workflow === 'completed');
}

/**
 * Concatinate Address object to string
 */
module.exports.concatAddress = function concatAddress(address) {
    if (address === null || address === undefined || typeof address !== 'object') {
        throw new Error('Validation Error: address is not of Object type');
    }

    // use array to order object fields, then removes nulls with filter, then uses join to create string
    return [
            address.unitNumber,
            address.buildingNumber,
            address.street,
            address.suburb,
            address.state,
            address.postcode,
        ]
        .filter(i => i)
        .join(' ');

}