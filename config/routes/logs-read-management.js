function logsReadManagement() {
    return [
        {
            "DownstreamPathTemplate": "/api/v1/management-logs",
            "UpstreamPathTemplate": "/api/v1/management-logs",
            "UpstreamHttpMethod": [
                "Get"
            ],
            "DownstreamScheme": "http",
            "DownstreamHostAndPorts": [
                {
                    "Host": "sonatribe-ticketmanagement-api",
                    "Port": 80,
                }
            ],
            "LoadBalancerOptions": {
                "Type": "LeastConnection"
            }
        },
        {
            "DownstreamPathTemplate": "/api/v1/management-logs/{everything}",
            "UpstreamPathTemplate": "/api/v1/management-logs/{everything}",
            "UpstreamHttpMethod": [
                "Get"
            ],
            "DownstreamScheme": "http",
            "DownstreamHostAndPorts": [
                {
                    "Host": "sonatribe-ticketmanagement-api",
                    "Port": 80,
                }
            ],
            "LoadBalancerOptions": {
                "Type": "LeastConnection"
            }
        }]
}

module.exports = {
    logsReadManagement,
}
