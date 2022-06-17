let serviceAddress = "sonatribe-payments-api" // '192.168.86.21'// 

let servicePort =  80 // 8085


function revenueAllTimeRead() {
    return [
        {
            "DownstreamPathTemplate": "/api/v1/stats",
            "UpstreamPathTemplate": "/api/v1/stats",
            "UpstreamHttpMethod": [
                "Get"
            ],
            "DownstreamScheme": "http",
            "DownstreamHostAndPorts": [
                {
                    "Host": serviceAddress,
                    "Port": servicePort,
                }
            ],
            "LoadBalancerOptions": {
                "Type": "LeastConnection"
            }
        },
        {
            "DownstreamPathTemplate": "/api/v1/stats/{everything}",
            "UpstreamPathTemplate": "/api/v1/stats/{everything}",
            "UpstreamHttpMethod": [
                "Get"
            ],
            "DownstreamScheme": "http",
            "DownstreamHostAndPorts": [
                {
                    "Host": serviceAddress,
                    "Port": servicePort,
                }
            ],
            "LoadBalancerOptions": {
                "Type": "LeastConnection"
            }
        }]
}

function revenueByDayRead() {
    return [
        {
            "DownstreamPathTemplate": "/api/v1/revenue-by-day",
            "UpstreamPathTemplate": "/api/v1/revenue-by-day",
            "UpstreamHttpMethod": [
                "Get"
            ],
            "DownstreamScheme": "http",
            "DownstreamHostAndPorts": [
                {
                    "Host": serviceAddress,
                    "Port": servicePort,
                }
            ],
            "LoadBalancerOptions": {
                "Type": "LeastConnection"
            }
        },
        {
            "DownstreamPathTemplate": "/api/v1/revenue-by-day/{everything}",
            "UpstreamPathTemplate": "/api/v1/revenue-by-day/{everything}",
            "UpstreamHttpMethod": [
                "Get"
            ],
            "DownstreamScheme": "http",
            "DownstreamHostAndPorts": [
                {
                    "Host": serviceAddress,
                    "Port": servicePort,
                }
            ],
            "LoadBalancerOptions": {
                "Type": "LeastConnection"
            }
        }]
}


module.exports = {
    revenueAllTimeRead,
    revenueByDayRead
}
