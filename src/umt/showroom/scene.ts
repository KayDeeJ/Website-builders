/*
 * 3D light sculpture for the home hero: the site's own car icon (#car in the sprite) drawn in
 * glowing coral lines, both sides joined by roof and sill lines, with wheels as rings. The lines
 * draw themselves on, then the car turns gently above a faint mirrored reflection and drifting
 * light dust. Loaded on demand; renders only while the hero is on screen.
 */
import * as THREE from 'three'
import gsap from 'gsap'

const S = 0.04 // icon units (120 x 32) to scene units
const W = 1.8 // car width
const V = (x: number, y: number, z = 0) => new THREE.Vector3((x - 60) * S, (32 - y) * S, z)

/** The icon's outline as a 3D path at depth z. */
function outline(z: number) {
  const p = new THREE.CurvePath<THREE.Vector3>()
  const L = (a: [number, number], b: [number, number]) => p.add(new THREE.LineCurve3(V(...a, z), V(...b, z)))
  const Q = (a: [number, number], c: [number, number], b: [number, number]) =>
    p.add(new THREE.QuadraticBezierCurve3(V(...a, z), V(...c, z), V(...b, z)))
  Q([2, 32], [2, 24], [10, 22])
  L([10, 22], [28, 17])
  L([28, 17], [42, 6])
  Q([42, 6], [46, 3], [52, 3])
  L([52, 3], [80, 3])
  Q([80, 3], [86, 3], [90, 7])
  L([90, 7], [102, 17])
  L([102, 17], [112, 20])
  Q([112, 20], [118, 22], [118, 30])
  L([118, 30], [118, 32])
  L([118, 32], [101, 32])
  L([83, 32], [37, 32]) // sill between the wheel arches
  L([19, 32], [2, 32])
  return p
}

function windows(z: number) {
  const pts = [[31, 16.2], [43.5, 7.2], [52.5, 5.4], [64, 5.4], [64, 16.2], [31, 16.2]] as const
  const pts2 = [[68, 16.2], [68, 5.4], [79.5, 5.4], [88.2, 8.4], [99.5, 16.2], [68, 16.2]] as const
  return [pts, pts2].map((ps) => {
    const c = new THREE.CurvePath<THREE.Vector3>()
    for (let i = 0; i < ps.length - 1; i++) c.add(new THREE.LineCurve3(V(ps[i][0], ps[i][1], z), V(ps[i + 1][0], ps[i + 1][1], z)))
    return c
  })
}

type Line = { mesh: THREE.Mesh; total: number }

export function mount(host: HTMLElement, onFail: () => void, waitForIntro: boolean) {
  let renderer: THREE.WebGLRenderer
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
  } catch {
    onFail()
    return () => {}
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75))
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.domElement.className = 'showroom-canvas'
  host.appendChild(renderer.domElement)

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100)
  const camHome = new THREE.Vector3(0, 1.1, 8.6)
  camera.position.set(0, 1.6, 11)

  const coral = new THREE.Color('#FF5D5D')
  const core = new THREE.MeshBasicMaterial({ color: '#FFB3A6', toneMapped: false })
  const glowMat = new THREE.MeshBasicMaterial({ color: coral, transparent: true, opacity: 0.28, toneMapped: false, depthWrite: false })
  const haloMat = new THREE.MeshBasicMaterial({ color: coral, transparent: true, opacity: 0.08, toneMapped: false, depthWrite: false })

  const car = new THREE.Group()
  const lines: Line[] = []
  const tube = (path: THREE.Curve<THREE.Vector3>, r: number, segs: number) => {
    const add = (radius: number, mat: THREE.Material) => {
      const g = new THREE.TubeGeometry(path, segs, radius, 10, false)
      const m = new THREE.Mesh(g, mat)
      car.add(m)
      lines.push({ mesh: m, total: g.index ? g.index.count : 0 })
    }
    add(r, core)
    add(r * 3.2, glowMat)
    add(r * 7, haloMat)
  }
  for (const z of [-W / 2, W / 2]) {
    tube(outline(z), 0.018, 400)
    windows(z).forEach((w) => tube(w, 0.011, 120))
  }
  // Roof, bonnet, boot and sill lines joining the two sides
  for (const [x, y] of [[52, 3], [80, 3], [42, 6], [90, 7], [28, 17], [102, 17], [10, 22], [112, 20], [2, 32], [118, 32]] as const)
    tube(new THREE.LineCurve3(V(x, y, -W / 2), V(x, y, W / 2)), 0.012, 8)

  // Wheels: rings on both sides, with a coral hub
  const hubMat = new THREE.MeshBasicMaterial({ color: '#FFE3DC', toneMapped: false })
  const wheels: THREE.Group[] = []
  for (const wx of [28, 92])
    for (const z of [-W / 2, W / 2]) {
      const w = new THREE.Group()
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.016, 10, 72), core)
      const ringGlow = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.06, 10, 72), glowMat)
      const inner = new THREE.Mesh(new THREE.TorusGeometry(0.17, 0.008, 8, 48), glowMat)
      const hub = new THREE.Mesh(new THREE.CircleGeometry(0.04, 24), hubMat)
      w.add(ring, ringGlow, inner, hub)
      w.position.copy(V(wx, 32, z))
      car.add(w)
      wheels.push(w)
    }

  const floorY = V(0, 32).y - 0.31
  car.position.y = -floorY - 0.2
  scene.add(car)

  // Faint mirrored reflection
  const mirror = car.clone(true)
  mirror.scale.y = -1
  mirror.position.y = 2 * (floorY + car.position.y) - car.position.y
  mirror.traverse((o) => {
    const m = o as THREE.Mesh
    if (m.material) {
      const mat = (m.material as THREE.MeshBasicMaterial).clone()
      mat.transparent = true
      mat.opacity = (mat.opacity ?? 1) * 0.16
      mat.depthWrite = false
      m.material = mat
    }
  })
  scene.add(mirror)

  // Horizon light and drifting dust
  const horizon = new THREE.Mesh(
    new THREE.PlaneGeometry(14, 0.012),
    new THREE.MeshBasicMaterial({ color: coral, transparent: true, opacity: 0.5, toneMapped: false }),
  )
  horizon.position.y = floorY + car.position.y
  horizon.position.z = -0.5
  scene.add(horizon)
  const dustN = 160
  const dustPos = new Float32Array(dustN * 3)
  for (let i = 0; i < dustN; i++) {
    dustPos[i * 3] = (Math.random() - 0.5) * 12
    dustPos[i * 3 + 1] = Math.random() * 3.2 - 0.6
    dustPos[i * 3 + 2] = (Math.random() - 0.5) * 6
  }
  const dustGeo = new THREE.BufferGeometry()
  dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3))
  const dust = new THREE.Points(dustGeo, new THREE.PointsMaterial({ color: '#FF9A8A', size: 0.035, transparent: true, opacity: 0.55, depthWrite: false }))
  scene.add(dust)

  // Theme: on light grounds the line is a deeper coral and the glow is lighter, so it stays crisp
  const mirrorMats: THREE.MeshBasicMaterial[] = []
  mirror.traverse((o) => {
    const m = (o as THREE.Mesh).material as THREE.MeshBasicMaterial | undefined
    if (m) mirrorMats.push(m)
  })
  const base = mirrorMats.map((m) => m.opacity)
  const applyTheme = () => {
    const light = document.documentElement.getAttribute('data-theme') === 'light'
    core.color.set(light ? '#E54848' : '#FFB3A6')
    glowMat.opacity = light ? 0.14 : 0.28
    haloMat.opacity = light ? 0.025 : 0.08
    hubMat.color.set(light ? '#C02E2E' : '#FFE3DC')
    ;(dust.material as THREE.PointsMaterial).color.set(light ? '#E54848' : '#FF9A8A')
    mirrorMats.forEach((m, i) => (m.opacity = base[i] * (light ? 0.55 : 1)))
  }
  applyTheme()
  const themeWatch = new MutationObserver(applyTheme)
  themeWatch.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

  // Size
  const resize = () => {
    const w = host.clientWidth
    const h = host.clientHeight
    if (!w || !h) return
    renderer.setSize(w, h, false)
    camera.aspect = w / h
    camera.fov = w < 700 ? 40 : 30
    camera.updateProjectionMatrix()
  }
  const ro = new ResizeObserver(resize)
  ro.observe(host)
  resize()

  // Pointer leans the camera
  const lean = { x: 0, y: 0 }
  const onMove = (e: PointerEvent) => {
    lean.x = (e.clientX / window.innerWidth - 0.5) * 2
    lean.y = (e.clientY / window.innerHeight - 0.5) * 2
  }
  window.addEventListener('pointermove', onMove, { passive: true })

  // Entrance: the lines draw themselves on while the camera glides in
  const draw = { p: 0 }
  const setDraw = () => {
    for (const l of lines) l.mesh.geometry.setDrawRange(0, Math.floor((l.total * draw.p) / 3) * 3)
    wheels.forEach((w) => w.scale.setScalar(Math.max(0.001, gsap.utils.clamp(0, 1, (draw.p - 0.55) / 0.45))))
    mirror.visible = draw.p > 0.6
  }
  setDraw()
  let started = false
  const enter = () => {
    started = true
    gsap.to(draw, { p: 1, duration: 2.4, ease: 'power2.inOut', onUpdate: setDraw })
    gsap.to(camera.position, { x: camHome.x, y: camHome.y, z: camHome.z, duration: 2.8, ease: 'expo.out' })
  }
  if (waitForIntro) window.addEventListener('umt:introdone', enter, { once: true })
  else enter()

  // Render only while visible
  let onScreen = true
  const io = new IntersectionObserver(([e]) => (onScreen = e.isIntersecting), { threshold: 0 })
  io.observe(host)
  const view = host.closest('.view')
  const clock = new THREE.Clock()
  const look = new THREE.Vector3(0, 0.55, 0)
  let raf = 0
  let t = 0
  const tick = () => {
    raf = requestAnimationFrame(tick)
    const dt = Math.min(clock.getDelta(), 0.05)
    if (!started || !onScreen || document.hidden || view?.hasAttribute('hidden')) return
    t += dt
    const yaw = -0.55 + Math.sin(t * 0.22) * 0.38
    car.rotation.y = yaw
    mirror.rotation.y = yaw
    wheels.forEach((w) => (w.rotation.z -= dt * 0.5))
    dust.rotation.y += dt * 0.02
    const tx = camHome.x + lean.x * 0.6
    const ty = camHome.y - lean.y * 0.22
    camera.position.x += (tx - camera.position.x) * 0.04
    camera.position.y += (ty - camera.position.y) * 0.04
    camera.lookAt(look)
    renderer.render(scene, camera)
  }
  tick()

  return () => {
    cancelAnimationFrame(raf)
    ro.disconnect()
    io.disconnect()
    themeWatch.disconnect()
    window.removeEventListener('pointermove', onMove)
    window.removeEventListener('umt:introdone', enter)
    scene.traverse((o) => {
      const m = o as THREE.Mesh
      m.geometry?.dispose?.()
      const mat = m.material as THREE.Material | THREE.Material[] | undefined
      if (Array.isArray(mat)) mat.forEach((x) => x.dispose())
      else mat?.dispose?.()
    })
    renderer.dispose()
    renderer.domElement.remove()
  }
}
