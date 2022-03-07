import React from 'react'
import {
  DefsLinearGradient,
  countdownCircleTimerProps,
  countdownCircleTimerDefaultProps,
} from '../../../shared'
import { useCountdown } from '../hooks'

const CountdownCircleTimer = ({
  size,
  strokeWidth,
  trailStrokeWidth,
  trailColor,
  duration,
  isPlaying,
  colors,
  strokeLinecap,
  children: Children,
  isLinearGradient,
  gradientUniqueKey,
  onComplete,
  ariaLabel,
  renderAriaTime,
  initialRemainingTime,
  rotation,
}) => {
  const {
    path,
    pathLength,
    stroke,
    strokeDashoffset,
    gradientId,
    styles,
    timeProps,
  } = useCountdown({
    isPlaying,
    size,
    // https://github.com/vydimitrov/react-countdown-circle-timer/pull/82#issuecomment-774961578
    // Find the larger strokeWidth and calculate the path.
    strokeWidth: Math.max(strokeWidth, trailStrokeWidth ?? 0),
    duration,
    initialRemainingTime,
    colors,
    isLinearGradient,
    gradientUniqueKey,
    onComplete,
    rotation,
  })

  return (
    <div style={styles.wrapperStyle} aria-label={ariaLabel}>
      <svg width={size} height={size} xmlns="http://www.w3.org/2000/svg">
        {isLinearGradient && (
          <DefsLinearGradient colors={colors} gradientId={gradientId} />
        )}
        <path
          d={path}
          fill="none"
          stroke={trailColor}
          strokeWidth={trailStrokeWidth ?? strokeWidth}
        />
        <path
          d={path}
          fill="none"
          stroke={isLinearGradient ? `url(#${gradientId})` : stroke}
          strokeLinecap={strokeLinecap}
          strokeWidth={strokeWidth}
          strokeDasharray={pathLength}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>
      {Children !== null && (
        <div aria-hidden="true" style={{ ...styles.timeStyle, color: stroke }}>
          <Children {...timeProps}/>
          {/* {React.isValidElement(children)
            ? React.cloneElement(React.Children.only(children), timeProps)
            : children(timeProps)} */}
        </div>
      )}
      {typeof renderAriaTime === 'function' && (
        <div role="timer" aria-live="assertive" style={styles.visuallyHidden}>
          {renderAriaTime(timeProps)}
        </div>
      )}
    </div>
  )
}

CountdownCircleTimer.propTypes = countdownCircleTimerProps
CountdownCircleTimer.defaultProps = countdownCircleTimerDefaultProps
CountdownCircleTimer.displayName = 'CountdownCircleTimer'

export { CountdownCircleTimer }
