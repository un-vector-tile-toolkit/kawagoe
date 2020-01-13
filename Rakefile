task :landformclassification1 do
  sh "node downloadLandformclassification1.js > \
    tmp/landformclassification1.geojsons"
  sh "tippecanoe --no-feature-limit --no-tile-size-limit --force \
    --hilbert --read-parallel \
    --output=tmp/landformclassification1.mbtiles \
    tmp/landformclassification1.geojsons"
  sh "tile-join --force \
    --output-to-directory=docs/zxy/experimental_landformclassification1 \
    --no-tile-compression --no-tile-size-limit \
    tmp/landformclassification1.mbtiles"
end

task :bvmap do
  sh "node downloadBvmap.js"
end

task '1013do' do
  sh "node download1013do.js"
end

task :build do 
  sh "parse-hocon hocon/style.conf --output docs/style.json"
  sh "gl-style-validate docs/style.json"
  sh "browserify -o docs/bundle.js -t " +
    "[ babelify --presets [ @babel/preset-env ] ] app.js"
end

task :host do
  sh "budo -d docs"
end

task :docker do
  sh "docker run -ti --rm -p 9966:9966 unvt/kawagoe"
end

task :docker_build do
  sh "docker build -t unvt/kawagoe ."
end

task :mapbox_gl do
  sh "cp ../mapbox-gl-js/dist/mapbox-gl.js docs"
  sh "cp ../mapbox-gl-js/dist/mapbox-gl.js.map docs"
  sh "cp ../mapbox-gl-js/dist/mapbox-gl.css docs"
end

