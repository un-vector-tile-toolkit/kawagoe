FROM unvt/v6:latest

RUN git clone git@github.com:un-vector-tile-toolkit/kawagoe &&\
  git clone git@github.com:mapbox/mapbox-gl-js &&\
  cd mapbox-gl-js &&\
  yarn &&\
  yarn build-prod-min &&\
  yarn build-css &&\
  cd ../kawagoe &&\
  yarn

