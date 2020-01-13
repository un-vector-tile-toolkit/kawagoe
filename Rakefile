desc 'produce vector tiles for landform data'
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

desc 'download GSI Maps Vector tiles'
task :bvmap do
  sh "node downloadBvmap.js"
end

desc 'download disaster orthophoto tiles'
task '1013do' do
  sh "node download1013do.js"
end

desc 'build style.json and bundle.js'
task :build do 
  sh "parse-hocon hocon/style.conf --output docs/style.json"
  sh "gl-style-validate docs/style.json"
  sh "browserify -o docs/bundle.js -t " +
    "[ babelify --presets [ @babel/preset-env ] ] app.js"
end

desc 'host the site'
task :host do
  sh "budo -d docs"
end

desc 'run docker to use unvt/kawagoe'
task :docker do
  sh "docker run -ti --rm -p 9966:9966 unvt/kawagoe"
end

desc 'build unvt/kawagoe'
task :docker_build do
  sh "docker build -t unvt/kawagoe ."
end

desc 'copy files from mapbox-gl-js'
task :mapbox_gl do
  sh "cp ../mapbox-gl-js/dist/mapbox-gl.js docs"
  sh "cp ../mapbox-gl-js/dist/mapbox-gl.js.map docs"
  sh "cp ../mapbox-gl-js/dist/mapbox-gl.css docs"
end

