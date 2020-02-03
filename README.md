# kawagoe

[![Join the chat at https://gitter.im/un-vector-tile-toolkit/kawagoe](https://badges.gitter.im/un-vector-tile-toolkit/kawagoe.svg)](https://gitter.im/un-vector-tile-toolkit/kawagoe?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

scenario-based exercise

# Functions of this repository
- To host the Dockerfile for unvt/kawagoe
- gh-pages from the `docs` directory
- running codes for scenario-based exercise, integrated in Rakefile

# First time installation
```zsh
$ yarn
```

# Exercise on Raspberry Pi
```zsh
> rake docker:run
$ rake build:raspi
$ rake host
```

# List of `rake` tasks
```
rake build:localhost  # build style.json for localhost
rake build:pages      # build style.json for gh-pages
rake build:raspi      # build style.json for raspberrypi.local
rake copy:mapbox_gl   # copy files from mapbox-gl-js
rake docker:build     # build unvt/kawagoe on docker
rake docker:run       # run unvt/kawagoe on docker
rake download:1013do  # download disaster orthophoto tiles
rake download:bvmap   # download GSI Maps Vector tiles
rake download:lc      # download landform classification data
rake host             # host the site
rake produce:lc       # produce vector tiles for landform data
rake view:app         # view app.js
rake view:dockerfile  # view Dockerfile
rake view:index       # view index.html
rake view:lc          # view landform classification data
rake view:rakefile    # view Rakefile
rake view:style       # view style.conf
```

# Required external repositories
- gh:mapbox/mapbox-gl-js

