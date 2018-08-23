#!/bin/bash
# chkconfig: 2345 20 80
# description: Jer's Sparrow Initiator

# Source function library.
. /home/freshpeeps/sparrow/bin

start() {
    node SparrowManager &
}

stop() {
    # $(( pointer )) gets value associated with pointer
    PID= node SparrowHunter
    kill -9 $((PID))
    echo Sparrow has been stopped.
}


# $1 points to first arg, $2 points to second, etc;
case "$1" in 
    start)
       start
       ;;
    stop)
       stop
       ;;
    restart)
       stop
       start
       ;;
    status)
       ;;
    *)
       echo "Usage: $0 {start|stop|status|restart}"
esac

exit 0 