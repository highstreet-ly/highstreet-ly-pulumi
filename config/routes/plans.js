function plansRead() {
    return [
        {
            "DownstreamPathTemplate": "/api/v1/plans",
            "UpstreamPathTemplate": "/api/v1/plans",
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
            "DownstreamPathTemplate": "/api/v1/plans/{everything}",
            "UpstreamPathTemplate": "/api/v1/plans/{everything}",
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

function plansWrite() {
    return [{
        "DownstreamPathTemplate": "/api/v1/plans/{everything}",
        "UpstreamPathTemplate": "/api/v1/plans/{everything}",
        "UpstreamHttpMethod": [
            "Put",
            "Delete",
            "Post",
            "Patch"
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
    }, {
        "DownstreamPathTemplate": "/api/v1/plans",
        "UpstreamPathTemplate": "/api/v1/plans",
        "UpstreamHttpMethod": [
            "Put",
            "Delete",
            "Post",
            "Patch"
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
    },]
}

module.exports = {
    plansRead,
    plansWrite
}
