import {env} from '../env'

export function objectToQuerystring (obj) {
  return Object.keys(obj).reduce(function (str, key, i) {
    let delimiter, val
    delimiter = (i === 0) ? '?' : '&'
    key = encodeURIComponent(key)
    val = encodeURIComponent(obj[key])
    return [str, delimiter, key, '=', val].join('')
  }, '')
}

export function imgSrc(savefile) {
  return `${env.resource}/fileUpDownload/download.do?p_savefile=${savefile}&p_realfile=liven&p_type=mime`
}