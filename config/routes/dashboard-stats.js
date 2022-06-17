function dashboardStatsRead() {
    return [{
        "DownstreamPathTemplate": "/api/v1/dashboard-stats",
        "UpstreamPathTemplate": "/api/v1/dashboard-stats",
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
        },
    },
    {
        "DownstreamPathTemplate": "/api/v1/dashboard-stats/{everything}",
        "UpstreamPathTemplate": "/api/v1/dashboard-stats/{everything}",
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
        },
    },]
}

module.exports = {
    dashboardStatsRead,
}