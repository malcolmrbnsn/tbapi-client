# tbapi-client [![CodeFactor](https://www.codefactor.io/repository/github/robthr/tbapi-client/badge)](https://www.codefactor.io/repository/github/robthr/tbapi-client)

### API Client for [TBAPi](http://github.com/robthr/tbapi)

## Try it Now

    git clone https://github.com/robthr/tbapi-client
    cd tbapi-client
    npm i

Then add a sudo cron job

    sudo crontab -e
    */5 * * * * /home/robinson_cal/tbapi-client/tbapi-update

This runs a shell script every five minutes that runs `app.js`, moves the generated cron output to `/etc/cron.d/tbapi-client` and restarts the cron daemon.

## TODO

-   Run job in crontab without sudo
-   Better node error detection
-   Use [Rollbar](https://rollbar.com/robthr/tbapi/) for error tracking
-   Download sounds instead of playing from URL?
