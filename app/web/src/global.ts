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
  value: any,
  format?: string,
  locale: string = 'id'
) => {
  const inputFormat = format ? format : 'dd MMM yyyy - HH:mm'
  try {
    if (typeof value === 'string') {
      return formatFNS(parseISO(value), inputFormat, {
        locale: (locales as any)[locale],
      })
    } else {
      return formatFNS(value, inputFormat, {
        locale: (locales as any)[locale],
      })
    }
  } catch (e) {
    return ''
  }
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
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}