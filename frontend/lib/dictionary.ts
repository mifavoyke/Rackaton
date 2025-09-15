import enCommon from '@/public/locales/en/common.json'
import csCommon from '@/public/locales/cs/common.json'

export function getDictionary(locale: string) {
  switch (locale) {
    case 'cs':
      return csCommon
    default:
      return enCommon
  }
}