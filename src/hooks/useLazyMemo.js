import { useRef } from 'react'

const DEFAULT_VALUE = null

/**
 * This function is used to overcome this potential issue of the useMemo:
 * You may rely on useMemo as a performance optimization, not as a semantic guarantee.
 * In the future, React may choose to “forget” some previously memoized values
 * and recalculate them on next render, e.g. to free memory for offscreen components.
 * Write your code so that it still works without useMemo — and then add it to optimize performance.
 * (For rare cases when a value must never be recomputed, you can lazily initialize a ref.)
 * {@link https://reactjs.org/docs/hooks-faq.html#how-to-create-expensive-objects-lazily ReactDocs}
 * @param {function(): *} initializer - the callback function that will only be ran once
 * @returns {*} - a lazily loaded value
 * */
export const useLazyMemo = initializer => {
  const ref = useRef(DEFAULT_VALUE)

  const getObservable = () => {
    const observer = ref.current
    if (observer !== DEFAULT_VALUE) {
      return observer
    }

    const newObserver = initializer()
    ref.current = newObserver
    return newObserver
  }

  return getObservable()
}

export default useLazyMemo
