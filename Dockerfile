FROM unvt/v6:latest

RUN git clone https://github.com/un-vector-tile-toolkit/kawagoe &&\
  cd kawagoe &&\
  yarn

