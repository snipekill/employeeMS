class CustomLibrary {
    constructor() {

    }
    validation_wrapper(validation_object) {
        return validation_object.errors.map(
            ({ stack, property: parameter, argument }) => ({
                parameter: parameter.split('instance.').join(''),
                // parameter: argument,
                msg: stack.split('instance.').join(''),
            }),
        )
    }

    wrap(fn) { return (...args) => fn(...args).catch(args[2]) };
}

module.exports = new CustomLibrary();