function logsReadPermissions() {
    return [
        {
            "DownstreamPathTemplate": "/api/v1/permissions-logs",
            "UpstreamPathTemplate": "/api/v1/permissions-logs",
            "UpstreamHttpMethod": [
                "Get"
            ],
            "DownstreamScheme": "http",
            "DownstreamHostAndPorts": [
                {
                    "Host": "sonatribe-permissions-api",
                    "Port": 80,
                }
            ],
            "LoadBalancerOptions": {
                "Type": "LeastConnection"
            }
        },
        {
            "DownstreamPathTemplate": "/api/v1/permissions-logs/{everything}",
            "UpstreamPathTemplate": "/api/v1/permissions-logs/{everything}",
            "UpstreamHttpMethod": [
                "Get"
            ],
            "DownstreamScheme": "http",
            "DownstreamHostAndPorts": [
                {
                    "Host": "sonatribe-permissions-api",
                    "Port": 80,
                }
            ],
            "LoadBalancerOptions": {
                "Type": "LeastConnection"
            }
        }]
}

module.exports = {
    logsReadPermissions,
}
