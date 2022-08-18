export const simplifyArgumentsInputSchema = {
    type: 'object',
    properties: {
        body: {
            type: 'object',
            properties: {
                x: {
                    type: 'number',
                },
                y: {
                    type: 'number',
                },
                z: {
                    type: 'number',
                },
            },
            required: ['x', 'y', 'z'],
        },
    },
    required: ['body'],
};
