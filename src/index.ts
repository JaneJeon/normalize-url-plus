// Literally too much work to make this module universal;
// there are so many subtle differences between node and browser
// that trying to account for both and only using the APIs that are common
// in those environments would be extremely counterproductive.
// For example, while the browser supports AbortController,
// the way you *listen* to the 'abort' event is different!
import { setTimeout } from 'timers/promises'
import pTimeout from 'p-timeout'
import normalizeInit from './strategies/normalize'
import debugInit from './utils/debug'
import type { Options as NormalizeURLOptions } from 'normalize-url'

const debug = debugInit('index')

type OptionsType = {
  normalizeUrlOptions: NormalizeURLOptions
  timeout: number // global timeout
  signal?: InstanceType<typeof AbortSignal> // optional, shut this whole thing down
}

export default ({
  normalizeUrlOptions = {
    stripHash: true,
    removeQueryParameters: [] // No need to strip utm; ClearURLs takes care of that
  },
  timeout = 15000,
  signal
}: OptionsType) => {
  const normalize = normalizeInit(normalizeUrlOptions)

  async function normalizeUrlPlus(url: string) {
    debug('Setting timeouts...')
    const abortController = new AbortController()

    // This makes sure that it can be cancelled by either the parent calling .abort(),
    // or from the timeout naturally expiring.
    setTimeout(timeout, undefined, { signal })
      .then(() => {
        debug('Timeout reached')
        abortController.abort()
      })
      .catch(err => {
        debug('Abort signal from parent')
        throw err
      })

    debug('Normalizing URL %s', url)

    // TODO

    return null
  }

  // This pTimeout is meant to throw early, not necessarily to stop the execution;
  // this is really a way of enforcing a visible timeout (to the user)
  // for code that doesn't support abortController and/or is synchronous!
  return (url: string) => pTimeout(normalizeUrlPlus(url), timeout)
}
