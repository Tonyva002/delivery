import React from 'react'

export default function dateFormatter(timestamp: number): string  {
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const mounth = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + (date.getDate())).slice(-2);
        const hours = ('0' + (date.getHours())).slice(-2);
        const minutes = ('0' + (date.getMinutes())).slice(-2);
  return day + '/' + mounth + '/' + year + ' ' + hours + ':' + minutes;
}
