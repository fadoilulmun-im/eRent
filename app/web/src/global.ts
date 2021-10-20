import { format as formatFNS, parseISO } from 'date-fns'
import * as locales from 'date-fns/locale';

export const globalVar = {}

export const formatSeparatorDec = (value: any, decimal?: number) => {
    if (decimal || decimal === 0) value = Number(value).toFixed(decimal)
    return parseFloat((value || 0).toString().replace(/,/g, ''))
      .toLocaleString('en')
      .replace(/,/gi, ',')
  }

export const dateFormat = (
  d: Date,
) => {
  let month = '' + (d.getMonth() + 1),
  day = '' + d.getDate(),
  year = d.getFullYear();

if (month.length < 2) 
  month = '0' + month;
if (day.length < 2) 
  day = '0' + day;

return [year, month, day].join('-');
}

export const fileUpload = async (
  file: File,
  path: string = '',
) => {
  if (!file) {
    return null
  }
  const formData = new FormData()
  formData.append('file', file, file.name)
  const res = await fetch(path, {
    method: 'POST',
    body: formData,
  })
  const r = await res.json()
  if (r?.status === 'ok') {
    return r;
  }
}

export const numberWithCommas = (x: string)=>{
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}