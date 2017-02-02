import React, { PropTypes } from 'react'
import Back from 'svg/back'
import ClearDay from 'svg/clear-day'
import ClearNight from 'svg/clear-night'
import Cloudy from 'svg/cloudy'
import Cog from 'svg/cog'
import Fog from 'svg/fog'
import Forward from 'svg/forward'
import LightBulb from 'svg/light-bulb'
import PartlyCloudyDay from 'svg/partly-cloudy-day'
import PartlyCloudyNight from 'svg/partly-cloudy-night'
import Rain from 'svg/rain'
import Sleet from 'svg/sleet'
import SmokeCo from 'svg/smoke-co'
import Snow from 'svg/snow'
import Thermometer from 'svg/thermometer'
import Train from 'svg/train'
import Umbrella from 'svg/umbrella'
import Wifi from 'svg/wifi'
import Wind from 'svg/wind'

import 'styles/components/icon'

const ICON_MAP = {
    'back': <Back />,
    'clear-day': <ClearDay />,
    'clear-night': <ClearNight />,
    'cog': <Cog />,
    'cloudy': <Cloudy />,
    'fog': <Fog />,
    'forward': <Forward />,
    'light-bulb': <LightBulb />,
    'partly-cloudy-day': <PartlyCloudyDay />,
    'partly-cloudy-night': <PartlyCloudyNight />,
    'rain': <Rain />,
    'sleet': <Sleet />,
    'smoke-co': <SmokeCo />,
    'snow': <Snow />,
    'thermometer': <Thermometer />,
    'train': <Train />,
    'umbrella': <Umbrella />,
    'wifi': <Wifi />,
    'wind': <Wind />
}

const IconsAvailable = Object.keys(ICON_MAP)

const Icon = ({ name, text }) =>
    <span className={`icon icon--${name}`}>
        {ICON_MAP[name]}
        {text && <span className="icon__text">{text}</span>}
    </span>

Icon.propTypes = {
    name: PropTypes.string.isRequired,
    text: PropTypes.string
}

export default Icon
export { IconsAvailable }
