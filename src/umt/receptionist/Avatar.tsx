import { forwardRef, useId } from 'react'

/**
 * Ruby, the front-desk receptionist: an original illustration (a rounded face with a headset), drawn
 * in the site's coral and plum. Parts carry classes so the motion code can blink, glance and smile.
 */
const Avatar = forwardRef<SVGSVGElement, { size?: number }>(function Avatar({ size = 56 }, ref) {
  const id = useId().replace(/:/g, '')
  const skin = `rx-skin-${id}`
  const hair = `rx-hair-${id}`
  return (
    <svg ref={ref} className="rx-face" viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
      <defs>
        <radialGradient id={skin} cx="38%" cy="32%" r="75%">
          <stop offset="0" stopColor="#FFB4A8" />
          <stop offset=".55" stopColor="#FF7D72" />
          <stop offset="1" stopColor="#E0474F" />
        </radialGradient>
        <linearGradient id={hair} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4A2466" />
          <stop offset="1" stopColor="#2B1640" />
        </linearGradient>
      </defs>
      <g className="rx-head">
        {/* hair behind */}
        <path d="M11 34C9 18 20 8 33 8s23 9 21 26c-1 7-3 13-6 17H17c-3-4-5-10-6-17Z" fill={`url(#${hair})`} />
        {/* face */}
        <ellipse cx="32" cy="35" rx="17" ry="18" fill={`url(#${skin})`} />
        {/* fringe */}
        <path d="M15 31c2-10 9-15 18-15 7 0 13 3 16 9-6 0-13-2-18-6-3 5-9 9-16 12Z" fill={`url(#${hair})`} />
        <g className="rx-eyes">
          <g className="rx-eye rx-eye-l">
            <ellipse cx="25" cy="36" rx="2.6" ry="3.2" fill="#1E1426" />
            <circle className="rx-glint" cx="25.9" cy="34.8" r=".9" fill="#fff" />
          </g>
          <g className="rx-eye rx-eye-r">
            <ellipse cx="39" cy="36" rx="2.6" ry="3.2" fill="#1E1426" />
            <circle className="rx-glint" cx="39.9" cy="34.8" r=".9" fill="#fff" />
          </g>
        </g>
        {/* happy closed eyes, shown when Ruby smiles */}
        <g className="rx-happy" fill="none" stroke="#1E1426" strokeWidth="2" strokeLinecap="round" opacity="0">
          <path d="M22 37q3-3.5 6 0" />
          <path d="M36 37q3-3.5 6 0" />
        </g>
        <ellipse cx="20.5" cy="42" rx="3" ry="1.8" fill="#FF4D6A" opacity=".35" />
        <ellipse cx="43.5" cy="42" rx="3" ry="1.8" fill="#FF4D6A" opacity=".35" />
        <path className="rx-mouth" d="M27 44q5 4 10 0" fill="none" stroke="#1E1426" strokeWidth="2" strokeLinecap="round" />
        {/* headset */}
        <path d="M13 34a19 19 0 0 1 38 0" fill="none" stroke="#1E1426" strokeWidth="2.6" strokeLinecap="round" opacity=".85" />
        <rect x="9.5" y="31" width="6" height="10" rx="3" fill="#1E1426" />
        <rect x="48.5" y="31" width="6" height="10" rx="3" fill="#1E1426" />
        <path d="M12.5 40c0 7 5 10 11 10" fill="none" stroke="#1E1426" strokeWidth="2" strokeLinecap="round" />
        <circle className="rx-mic" cx="25" cy="50" r="2.4" fill="#FF5D5D" />
      </g>
    </svg>
  )
})

export default Avatar
