function claimsRead() {
    return [
        {
            "DownstreamPathTemplate": "/api/v1/claims",
            "UpstreamPathTemplate": "/api/v1/claims",
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
            "DownstreamPathTemplate": "/api/v1/claims/{everything}",
            "UpstreamPathTemplate": "/api/v1/claims/{everything}",
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

function claimsWrite() {
    return [{
        "DownstreamPathTemplate": "/api/v1/claims/{everything}",
        "UpstreamPathTemplate": "/api/v1/claims/{everything}",
        "UpstreamHttpMethod": [
            "Put",
            "Delete",
            "Post",
            "Patch"
        ],
        "DownstreamScheme": "http",
        "DownstreamHostAndPorts": [
            {
                "Host": "sonatribe-permissions-api",
                "Port": 80,
            }
        ],
        "DownstreamHostAndPorts": [
            {
                "Host": "sonatribe-permissions-api",
                "Port": 80,
            }
        ],
        "LoadBalancerOptions": {
            "Type": "LeastConnection"
        }
    }, {
        "DownstreamPathTemplate": "/api/v1/claims",
        "UpstreamPathTemplate": "/api/v1/claims",
        "UpstreamHttpMethod": [
            "Put",
            "Delete",
            "Post",
            "Patch"
        ],
        "DownstreamScheme": "http",
        "DownstreamHostAndPorts": [
            {
                "Host": "sonatribe-permissions-api",
                "Port": 80,
            }
        ],
        "DownstreamHostAndPorts": [
            {
                "Host": "sonatribe-permissions-api",
                "Port": 80,
            }
        ],
        "LoadBalancerOptions": {
            "Type": "LeastConnection"
        }
    },]
}

module.exports = {
    claimsRead,
    claimsWrite
}
