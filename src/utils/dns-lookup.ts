import debugInit from './debug'
import type { dnsLookupType } from '../types'

const debug = debugInit('utils:dns-lookup')

export default function dnsLookupInit(lookup: dnsLookupType) {
  return async function dnsLookup(url: string) {
    debug('Looking up DNS for %s', url)

    // Should throw when the DNS record couldn't be found
    try {
      const { hostname } = new URL(url)
      await lookup(hostname)
      debug('Lookup of host %s successful', hostname)
    } catch (err) {
      debug('Lookup of %s unsuccessful', url)
      throw err
    }
  }
}
