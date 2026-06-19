import type {MeasurementUnit} from '../types'
const singular:Record<MeasurementUnit,string>={ml:'ml',g:'g',piece:'piece',leaf:'leaf',dash:'dash',barspoon:'barspoon',top:'top'}
const plural:Record<MeasurementUnit,string>={...singular,piece:'pieces',leaf:'leaves',dash:'dashes',barspoon:'barspoons'}
export const formatMetricQuantity=(quantity:number,unit:MeasurementUnit)=>`${Number.isInteger(quantity)?quantity:Number(quantity.toFixed(2))} ${quantity===1?singular[unit]:plural[unit]}`
export const millilitresToOunces=(ml:number)=>Math.round((ml/29.5735)*100)/100
