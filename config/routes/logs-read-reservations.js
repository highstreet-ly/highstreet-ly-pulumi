function logsReadReservations() {
    return [
        {
            "DownstreamPathTemplate": "/api/v1/reservations-logs",
            "UpstreamPathTemplate": "/api/v1/reservations-logs",
            "UpstreamHttpMethod": [
                "Get"
            ],
            "DownstreamScheme": "http",
            "DownstreamHostAndPorts": [
                {
                    "Host": "sonatribe-ticketreservations-api",
                    "Port": 80,
                }
            ],
            "LoadBalancerOptions": {
                "Type": "LeastConnection"
            }
        },
        {
            "DownstreamPathTemplate": "/api/v1/reservations-logs/{everything}",
            "UpstreamPathTemplate": "/api/v1/reservations-logs/{everything}",
            "UpstreamHttpMethod": [
                "Get"
            ],
            "DownstreamScheme": "http",
            "DownstreamHostAndPorts": [
                {
                    "Host": "sonatribe-ticketreservations-api",
                    "Port": 80,
                }
            ],
            "LoadBalancerOptions": {
                "Type": "LeastConnection"
            }
        }]
}

module.exports = {
    logsReadReservations,
}
