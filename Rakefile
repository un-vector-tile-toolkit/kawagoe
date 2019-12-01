task :default do
  sh "node downloadBvmap.js"
end

task :build do 
  sh "parse-hocon hocon/style.conf --output docs/style.json"
  sh "gl-style-validate docs/style.json"
  sh "browserify -o docs/bundle.js -t " +
    "[ babelify --presets [ @babel/preset-env ] ] app.js"
end

task :host do
  sh "budo -d docs --host=localhost"
end

task :docker_build do
  sh "docker build -t unvt/kawagoe ."
end

task :mapbox_gl do
  sh "cp ../mapbox-gl-js/dist/mapbox-gl.js docs"
  sh "cp ../mapbox-gl-js/dist/mapbox-gl.js.map docs"
  sh "cp ../mapbox-gl-js/dist/mapbox-gl.css docs"
end

