function logsReadPayments() {
    return [
        {
            "DownstreamPathTemplate": "/api/v1/payments-logs",
            "UpstreamPathTemplate": "/api/v1/payments-logs",
            "UpstreamHttpMethod": [
                "Get"
            ],
            "DownstreamScheme": "http",
            "DownstreamHostAndPorts": [
                {
                    "Host": "sonatribe-payments-api",
                    "Port": 80,
                }
            ],
            "LoadBalancerOptions": {
                "Type": "LeastConnection"
            }
        },
        {
            "DownstreamPathTemplate": "/api/v1/payments-logs/{everything}",
            "UpstreamPathTemplate": "/api/v1/payments-logs/{everything}",
            "UpstreamHttpMethod": [
                "Get"
            ],
            "DownstreamScheme": "http",
            "DownstreamHostAndPorts": [
                {
                    "Host": "sonatribe-payments-api",
                    "Port": 80,
                }
            ],
            "LoadBalancerOptions": {
                "Type": "LeastConnection"
            }
        }]
}

module.exports = {
    logsReadPayments,
}
