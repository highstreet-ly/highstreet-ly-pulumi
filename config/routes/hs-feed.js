function hsFeedRead(ns) {
    return [
        {
            "DownstreamPathTemplate": "/",
            "UpstreamPathTemplate": "/api/v1/hs-feed",
            "UpstreamHttpMethod": [
                "Get"
            ],
            "DownstreamScheme": "http",
            "DownstreamHostAndPorts": [
                {
                    "Host": "hs-feeds",
                    "Port": 80,
                }
            ],
            "LoadBalancerOptions": {
                "Type": "LeastConnection"
            }
        },
        {
            "DownstreamPathTemplate": "/{everything}",
            "UpstreamPathTemplate": "/api/v1/hs-feed/{everything}",
            "UpstreamHttpMethod": [
                "Get"
            ],
            "DownstreamScheme": "http",
            "DownstreamHostAndPorts": [
                {
                    "Host": "hs-feeds",
                    "Port": 80,
                }
            ],
            "LoadBalancerOptions": {
                "Type": "LeastConnection"
            }
        }]
}

module.exports = {
     hsFeedRead
}