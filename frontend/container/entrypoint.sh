#!/bin/sh

runStudent() {
    cd /var/c3d/frontend
    npm run dev
}

setupSupervisorLogs() {
    mkdir -p /var/log/supervisor
    chmod 755 /var/log/supervisor
}

startServer() {
    setupSupervisorLogs
    /usr/bin/supervisord -c /etc/supervisor/supervisord.conf
}

logDevServerLaunchStatus() {
    if [ $(ps -e | awk '{print $1}' | grep -E "^$2$" | wc -l) -eq 1 ]
    then
        echo "👍  $1 ($2) dev server launched.";
    else
        echo "⚠️  $1 ($2) dev server failed to launch! ⚠️";
    fi
}

setupDev() {
    cd /var/c3d/frontend
    npm install
}

setupProd() {
    cd /var/c3d/ui
    npm ci --omit=dev
    npm run build -ws
}

# Main execution
setupDev
startServer

# Keep the container running
tail -f /var/log/supervisor/supervisord.log