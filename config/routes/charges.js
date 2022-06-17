function chargesRead() {
    return [{
        "DownstreamPathTemplate": "/api/v1/charges",
        "UpstreamPathTemplate": "/api/v1/charges",
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
        "DownstreamPathTemplate": "/api/v1/charges/{everything}",
        "UpstreamPathTemplate": "/api/v1/charges/{everything}",
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
        "DownstreamHostAndPorts": [
            {
                "Host": "sonatribe-payments-api",
                "Port": 80,
            }
        ],
        "LoadBalancerOptions": {
            "Type": "LeastConnection"
        }
    },]
}

function chargesWrite() {
    return [{
        "DownstreamPathTemplate": "/api/v1/charges/{everything}",
        "UpstreamPathTemplate": "/api/v1/charges/{everything}",
        "UpstreamHttpMethod": [
            "Put",
            "Delete",
            "Post",
            "Patch"
        ],
        "DownstreamScheme": "http",
        "DownstreamHostAndPorts": [
            {
                "Host": "sonatribe-payments-api",
                "Port": 80,
            }
        ],
        "DownstreamHostAndPorts": [
            {
                "Host": "sonatribe-payments-api",
                "Port": 80,
            }
        ],
        "LoadBalancerOptions": {
            "Type": "LeastConnection"
        }
    }, {
        "DownstreamPathTemplate": "/api/v1/charges",
        "UpstreamPathTemplate": "/api/v1/charges",
        "UpstreamHttpMethod": [
            "Put",
            "Delete",
            "Post",
            "Patch"
        ],
        "DownstreamScheme": "http",
        "DownstreamHostAndPorts": [
            {
                "Host": "sonatribe-payments-api",
                "Port": 80,
            }
        ],
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
    chargesWrite,
    chargesRead
}
