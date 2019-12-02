const fetch = require('node-fetch')
const Queue = require('better-queue')

const MAX_ZOOM = 14

const checkStatus = (res) => {
  if (res.ok) {
    return res
  } else {
    return Promise.reject(new Error(
      `${res.url}: ${res.status} ${res.statusText}`
    ))
  }
}

const tileQueue = new Queue(async (params, cb) => {
  const url = 'https://maps.gsi.go.jp/xyz/' +
    `${params.t}/${params.z}/${params.x}/${params.y}.${params.e}`
  fetch(url)
    .then(checkStatus)
    .then(res => res.json())
    .then(json => {
      params.features = json.features
      writeQueue.push(params)
      cb(null, params.url)
    })
    .catch(e => {
      const msg = `${url}: ${e}`
      console.error(msg)
      cb(msg, params.url)
    })
}, {
  concurrent: 2,
  maxRetries: 10,
  retryDelay: 5000
})

const writeQueue = new Queue(async (params, cb) => {
  for (f of params.features) {
    f.tippecanoe = {
      layer: 'landformclassification1', 
      minzoom: 12,
      maxzoom: 12
    }
    console.log(JSON.stringify(f))
  }
  cb(null, params)
}, {
  concurrent: 1,
  maxRetries: 10,
  retryDelay: 5000
})

const push = async (z, x, y) => {
  tileQueue.push({
    t: 'experimental_landformclassification1',
    z: z,
    x: x,
    y: y,
    e: 'geojson'
  })
}

const jumpInto = (z, x, y) => {
  if (z == MAX_ZOOM) {
    push(z, x, y)
    return
  }
  for (let dx of [0, 1]) {
    for (let dy of [0, 1]) {
      jumpInto(z + 1, x * 2 + dx, y * 2 + dy)
    }
  }
}

jumpInto(11, 1817, 804)

