import { format as formatFNS, parseISO } from 'date-fns'
import * as locales from 'date-fns/locale';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import AsyncCreatableSelect from 'react-select/async-creatable';
export const globalVar = {
  Select,
  CreatableSelect,
  AsyncCreatableSelect
}

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
  file: File | any,
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

export const numberWithCommas = (x: Number) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export const eventBus = {
  on(event, callback) {
    document.addEventListener(event, (e) => callback(e.detail));
  },
  dispatch(event, data) {
    document.dispatchEvent(new CustomEvent(event, { detail: data }));
  },
  remove(event, callback) {
    document.removeEventListener(event, callback);
  },
};

export const padLeadingZeros = (num, size)=>{
  var s = num+"";
  while (s.length < size) s = "0" + s;
  return s;
}

export const getDayName = (id)=>{
  const weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  return weekdays[id];
}
export const getMonthName = (id)=>{
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return monthNames[id];
}   