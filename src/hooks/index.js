import { useContext as reactUseContext, useState, useRef, useEffect, useLayoutEffect } from 'react'
import { ContextConsumer } from '../provider'
import { isAFunction } from '../utils'

const useContext = (context = ContextConsumer) => reactUseContext(context)

const usePrevious = value => {
  let ref = useRef()

  useEffect(() => {
    ref.current = value
  })

  return ref.current
}

const useSelector = (mapStateToProps, isEqual) => {
  const { state } = useContext()

  const [selector, setSelector] = useState(mapStateToProps(state))

  const previousSelector = usePrevious(selector)

  useLayoutEffect(() => {
    if (previousSelector) {
      const nextSelector = mapStateToProps(state)
      const shouldUpdate = !isEqual(nextSelector, previousSelector)
      if (shouldUpdate) {
        setSelector(nextSelector)
      }
    }
  }, [state])

  return selector
}

const useDispatch = () => useContext().dispatch

export { useSelector, useDispatch, useContext, usePrevious }
