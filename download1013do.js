const fs = require('fs-extra')
const path = require('path')
const fetch = require('node-fetch')
const Queue = require('better-queue')

const MAX_ZOOM = 18

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
  fetch(params.url)
    .then(checkStatus)
    .then(res => {
      writeQueue.push({path: params.path, res: res})
      cb(null, params.url)
    })
    .catch(e => {
      const msg = `${params.url}: ${e}`
      console.error(msg)
      cb(msg, params.url)
    })
}, {
  concurrent: 2,
  maxRetries: 10,
  retryDelay: 5000
})

const writeQueue = new Queue(async (params, cb) => {
  console.log(params.path)
  const dir = path.dirname(params.path)
  if (!fs.existsSync(dir)) {
    fs.mkdirsSync(dir)
  }
  const ws = fs.createWriteStream(params.path)
  params.res.body.pipe(ws)
  params.res.body.on('end', () => {
    cb(null, params.path)
  })
}, {
  maxRetries: 10,
  retryDelay: 5000
})

const push = async (z, x, y) => {
  tileQueue.push({
    url: 
      `https://maps.gsi.go.jp/xyz/20191012typhoon19_tokigawa_1013do/${z}/${x}/${y}.png`,
    path:
      `docs/zxy/20191012typhoon19_tokigawa_1013do/${z}/${x}/${y}.png`
  })
}

const jumpInto = (z, x, y) => {
  push(z, x, y)
  if (z == MAX_ZOOM) return
  for (let dx of [0, 1]) {
    for (let dy of [0, 1]) {
      jumpInto(z + 1, x * 2 + dx, y * 2 + dy)
    }
  }
}

jumpInto(11, 1817, 804)

