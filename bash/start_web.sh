#!/bin/sh
if (! ls dist) then
    npm run buildClient
    npm run buildServer
fi

npm run server