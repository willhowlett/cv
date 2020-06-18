import React, { useState, useEffect } from 'react'
import Measure from 'react-measure'
import debounce from 'debounce'
import classNames from 'classnames'

export const List = ({
  children,
}) => {

  const [scrollable, setScrollable] = useState(false);

  const [scrolled, setScrolled] = useState(false);

  const [clientReady, setClientReady] = useState(false);

  useEffect(() => setClientReady(true), []);

  const checkScroll = (measure, contentRect) => {
    measure();
    setScrolled(contentRect.scroll.left > ((contentRect.scroll.width - contentRect.client.width) / 2) ? true : false)
  }

  const className = classNames(
    scrollable && 'scrollable',
    scrolled && 'scrolled'
  )

  if (!clientReady) {
    return (
      <ul>
        {children}
      </ul>
    )
  }

  return (
    <Measure
      client
      scroll
      onResize={(contentRect) => setScrollable(contentRect.client.width < contentRect.scroll.width ? true : false)}
    >
      {({ measure, measureRef, contentRect }) =>
        <React.Fragment>
          <ul
            ref={measureRef}
            className={className}
            onScroll={scrollable
              ? () => debounce(checkScroll(measure, contentRect))
              : null
            }
          >
            {children}
          </ul>
          {scrollable &&
            <span>scroll me</span>
          }
        </React.Fragment>
      }
    </Measure>
  )
}