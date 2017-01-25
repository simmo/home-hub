import customPropType, { PropTypeError } from 'utilities/prop-types/base'
import moment from 'moment'

export default customPropType((props, propName, componentName) => {
    if (!moment.isMoment(props[propName])) {
        return new PropTypeError(
            `Invalid prop \`${propName}\` of type ` +
            `\`${typeof props[propName]}\` supplied to \`${componentName}\`, expected a moment.`
        )
    }
})
