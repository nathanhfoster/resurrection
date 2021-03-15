import { useEffect } from 'react'
import { connect } from '../../store'
import { isAFunction } from '../utils'
import './types'

const isQuotaExceeded = e => {
  let quotaExceeded = false
  if (e) {
    if (e.code) {
      switch (e.code) {
        case 22:
          quotaExceeded = true
          break
        case 1014:
          // Firefox
          if (e.name == 'NS_ERROR_DOM_QUOTA_REACHED') {
            quotaExceeded = true
          }
          break
        default:
          break
      }
    } else if (e.number == -2147024882) {
      // Internet Explorer 8
      quotaExceeded = true
    }
  }
  return quotaExceeded
}

const mapStateToProps = state => ({ state })

const Persistor = ({ persistKey = 'ReduxState', debounce = 400, whenQuotaExceeds, state }) => {
  // persist storage if persistConfig exists
  useEffect(() => {
    if (persistKey) {
      // const filteredState = Object.keys(state).reduce((newState, key) => {
      //     if (
      //         (blackList?.length > 0 && blackList.includes(key)) ||
      //         (whiteList?.length > 0 && !whiteList.includes(key))
      //     ) {
      //         delete newState[key];
      //     }
      //     return newState;
      // }, state);

      const persistDebounce = setTimeout(() => {
        let stringifiedState = JSON.stringify(state)
        try {
          localStorage.setItem(persistKey, stringifiedState)
        } catch (e) {
          if (isQuotaExceeded(e) && isAFunction(whenQuotaExceeds)) {
            localStorage.setItem(persistKey, JSON.stringify(whenQuotaExceeds(state)))
          }
        }
      }, debounce)

      return () => {
        clearTimeout(persistDebounce)
      }
    }
  }, [state, persistKey])

  return null
}

export default connect(mapStateToProps)(Persistor)
