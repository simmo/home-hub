export function PropTypeError(message) {
    this.message = message
    this.stack = ''
}

PropTypeError.prototype = Error.prototype

export default function createChainableTypeChecker(validate) {
    function checkType(isRequired, props, propName, componentName) {
        if (props[propName] == null) { // eslint-disable-line eqeqeq
            if (isRequired) {
                if (props[propName] === null) {
                    return new PropTypeError(
                        `The prop \`${propName}\` is marked as required ` +
                        `in \`${componentName}\`, but its value is \`null\`.`
                    )
                }

                return new PropTypeError(
                    `The prop \`${propName}\` is marked as required in ` +
                    `\`${componentName}\`, but its value is \`undefined\`.`
                )
            }

            return null
        } else {
            return validate(props, propName, componentName)
        }
    }

    const chainedCheckType = checkType.bind(null, false)
    chainedCheckType.isRequired = checkType.bind(null, true)

    return chainedCheckType
}
