// uses chai-things extension for array asserts
const expect = require('chai')
    .use(require('chai-things'))
    .expect;

// module to test
const propertyProcessor = require('../internal_modules/property-processor');



describe('property-processor module', () => {

    describe('filterHtvCompleteProperties', () => {

        const testProperties = [{
                "address": {
                    "buildingNumber": "28",
                    "lat": -33.912542000000002,
                    "lon": 151.00293199999999,
                    "postcode": "2198",
                    "state": "NSW",
                    "street": "Donington Ave",
                    "suburb": "Georges Hall"
                },
                "propertyTypeId": 3,
                "readyState": "init",
                "reference": "aqsdasd",
                "shortId": "6Laj49N3PiwZ",
                "status": 0,
                "type": "htv",
                "workflow": "pending"
            },
            {
                "address": {
                    "buildingNumber": "Level 6",
                    "postcode": "2060",
                    "state": "NSW",
                    "street": "146 Arthur Street",
                    "suburb": "North Sydney"
                },
                "propertyTypeId": 3,
                "readyState": "init",
                "reference": "asdasd",
                "shortId": "E9eQVYEMkub2",
                "status": 4,
                "type": "htv",
                "valfirm": null,
                "workflow": "completed"
            },
            {
                "address": {
                    "buildingNumber": "25",
                    "postcode": "4000",
                    "state": "QLD",
                    "street": "Mary St",
                    "suburb": "Brisbane"
                },
                "propertyTypeId": 3,
                "readyState": "init",
                "reference": "asdas",
                "shortId": "nQMyWWLBvu4A",
                "status": 1,
                "type": "avm",
                "workflow": "pending"
            },
            {
                "address": {
                    "buildingNumber": "92",
                    "postcode": "2000",
                    "state": "NSW",
                    "street": "Pitt Street",
                    "suburb": "Sydney",
                    "unitNumber": "Suite 1 Level 8"
                },
                "propertyTypeId": 3,
                "readyState": "complete",
                "reference": "asdasd",
                "shortId": "ZM73nE4nKH56",
                "status": 4,
                "type": "avm",
                "workflow": "cancelled"
            },
            {
                "address": {
                    "buildingNumber": "28",
                    "lat": -33.912542000000002,
                    "lon": 151.00293199999999,
                    "postcode": "2198",
                    "state": "NSW",
                    "street": "Donington Ave",
                    "suburb": "Georges Hall"
                },
                "propertyTypeId": 3,
                "readyState": "complete",
                "reference": "asdasdas",
                "shortId": "AQzAB5xMXFNx",
                "status": 3,
                "type": "avm",
                "workflow": "completed"
            },
            {
                "address": {
                    "buildingNumber": "360",
                    "postcode": "3000",
                    "state": "VIC",
                    "street": "Elizabeth St",
                    "suburb": "Melbourne",
                    "unitNumber": "Level 28"
                },
                "propertyTypeId": 3,
                "readyState": "complete",
                "reference": "asdas",
                "shortId": "yebZvgdA7FRk",
                "status": 1,
                "type": "htv",
                "workflow": "completed"
            },
            {
                "address": {
                    "buildingNumber": "153",
                    "postcode": "2229",
                    "state": "NSW",
                    "street": "Denman Avenue",
                    "suburb": "CARINGBAH",
                    "unitNumber": "Suite 7"
                },
                "propertyTypeId": 3,
                "readyState": "complete",
                "reference": "asdas",
                "shortId": "YP7NJVNpVCdr",
                "status": 4,
                "type": "htv",
                "workflow": "cancelled"
            }
        ]

        it('Should only return properties where type is htv', () => {
            const filteredProperties = propertyProcessor.filterHtvCompleteProperties(testProperties)

            expect(filteredProperties).to.be.a('Array');
            expect(filteredProperties).to.all.have.property('type', 'htv');
        });

        it('Should only return properties where workflow is completed', () => {
            const filteredProperties = propertyProcessor.filterHtvCompleteProperties(testProperties)

            expect(filteredProperties).to.be.a('Array');
            expect(filteredProperties).to.all.have.property('workflow', 'completed');
        });

        it('Should throw an error when typeof propertyData is not Array', () => {
            expect(propertyProcessor.filterHtvCompleteProperties.bind({}))
                .to.throw(/^Validation Error:*/, 'Expected to throw "Validation Error');
            expect(propertyProcessor.filterHtvCompleteProperties.bind(10))
                .to.throw(/^Validation Error:*/, 'Expected to throw "Validation Error');
        });

        it('Should throw an error when propertyData is null or undefined', () => {
            expect(propertyProcessor.filterHtvCompleteProperties.bind(null))
                .to.throw(/^Validation Error:*/, 'Expected to throw "Validation Error');
            expect(propertyProcessor.filterHtvCompleteProperties.bind(undefined))
                .to.throw(/^Validation Error:*/, 'Expected to throw "Validation Error');
        });

    });

    describe('concatAddress', () => {

        const testAddresses = [{
                address: {
                    "buildingNumber": "Level 6",
                    "postcode": "2060",
                    "state": "NSW",
                    "street": "146 Arthur Street",
                    "suburb": "North Sydney"
                },
                concatAddress: "Level 6 146 Arthur Street North Sydney NSW 2060"
            },
            {
                address: {
                    "buildingNumber": "25",
                    "postcode": "4000",
                    "state": "QLD",
                    "street": "Mary St",
                    "suburb": "Brisbane"
                },
                concatAddress: "25 Mary St Brisbane QLD 4000"
            },
            {
                address: {
                    "street": "James St",
                    "suburb": "Sydney"
                },
                concatAddress: "James St Sydney"
            },
            {
                address: {
                    "buildingNumber": "360",
                    "postcode": "3000",
                    "state": "VIC",
                    "street": "Elizabeth St",
                    "suburb": "Melbourne",
                    "unitNumber": "Level 28"
                },
                concatAddress: "Level 28 360 Elizabeth St Melbourne VIC 3000"
            },
        ];

        it('Should concatinate address object to string correctly', () => {
            testAddresses.forEach(addr => {
                const concatAddress = propertyProcessor.concatAddress(addr.address);

                expect(concatAddress).to.be.a('String');
                expect(concatAddress).to.equal(addr.concatAddress);
            });
        });

        it('Should concatinate empty address object to empty string', () => {
            const concatAddress = propertyProcessor.concatAddress({});

            expect(concatAddress).to.be.a('String');
            expect(concatAddress).to.equal('');
        });

        it('Should throw an error when typeof propertyData is not an object', () => {
            expect(propertyProcessor.filterHtvCompleteProperties.bind({}))
                .to.throw(/^Validation Error:*/, 'Expected to throw "Validation Error');
            expect(propertyProcessor.filterHtvCompleteProperties.bind(10))
                .to.throw(/^Validation Error:*/, 'Expected to throw "Validation Error');
        });

        it('Should throw an error when typeof propertyData is null', () => {
            expect(propertyProcessor.concatAddress.bind(null))
                .to.throw(/^Validation Error:*/, 'Expected to throw "Validation Error');
            expect(propertyProcessor.concatAddress.bind(undefined))
                .to.throw(/^Validation Error:*/, 'Expected to throw "Validation Error');
        });

    });

});