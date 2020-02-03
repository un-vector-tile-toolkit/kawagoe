namespace :produce do
  desc 'produce vector tiles for landform data'
  task :lc do
    sh "tippecanoe --no-feature-limit --no-tile-size-limit --force \
      --hilbert --read-parallel \
      --output=tmp/landformclassification1.mbtiles \
      tmp/landformclassification1.geojsons"
    sh "tile-join --force \
      --output-to-directory=docs/zxy/experimental_landformclassification1 \
      --no-tile-compression --no-tile-size-limit \
      tmp/landformclassification1.mbtiles"
  end  
end

namespace :download do
  desc 'download landform classification data'
  task :lc do
    sh "node downloadLandformclassification1.js > \
      tmp/landformclassification1.geojsons"
  end

  desc 'download GSI Maps Vector tiles'
  task :bvmap do
    sh "node downloadBvmap.js"
  end

  desc 'download disaster orthophoto tiles'
  task '1013do' do
    sh "node download1013do.js"
  end
end

namespace :view do
  desc 'view landform classification data'
  task :lc do
    sh "less tmp/landformclassification1.geojsons"
  end

  desc 'view Rakefile'
  task :rakefile do
    sh "less Rakefile"
  end

  desc 'view Dockerfile'
  task :dockerfile do
    sh "less Dockerfile"
  end

  desc 'view style.conf'
  task :style do
    sh "less hocon/style.conf"
  end

  desc 'view index.html'
  task :index do
    sh "less docs/index.html"
  end

  desc 'view app.js'
  task :app do
    sh "less app.js"
  end
end

namespace :build do
  def build(location)
    sh({'LOCATION' => location}, 
      "parse-hocon hocon/style.conf --output docs/style.json")
    sh "gl-style-validate docs/style.json"
    sh "browserify -o docs/bundle.js -t " +
      "[ babelify --presets [ @babel/preset-env ] ] app.js"
  end

  desc 'build style.json for localhost'
  task :localhost do 
    build('http://localhost:9966')
  end

  desc 'build style.json for raspberrypi.local'
  task :raspi do
    build('http://raspberrypi.local:9966')
  end

  desc 'build style.json for gh-pages'
  task :pages do
    build('https://un-vector-tile-toolkit.github.io/kawagoe')
  end
end

desc 'host the site'
task :host do
  sh "budo -d docs"
end

namespace :docker do
  desc 'run unvt/kawagoe on docker'
  task :run do
    sh "docker run -ti --rm -p 9966:9966 unvt/kawagoe"
  end

  desc 'build unvt/kawagoe on docker'
  task :build do
    sh "docker build -t unvt/kawagoe ."
  end
end

namespace :copy do
  desc 'copy files from mapbox-gl-js'
  task :mapbox_gl do
    sh "cp ../mapbox-gl-js/dist/mapbox-gl.js docs"
    sh "cp ../mapbox-gl-js/dist/mapbox-gl.js.map docs"
    sh "cp ../mapbox-gl-js/dist/mapbox-gl.css docs"
  end
end

