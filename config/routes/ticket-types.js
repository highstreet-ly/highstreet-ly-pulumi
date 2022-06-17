function ticketTypesWrite() {
    return [{
        "DownstreamPathTemplate": "/api/v1/ticket-types/{everything}",
        "UpstreamPathTemplate": "/api/v1/ticket-types/{everything}",

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
    },
    {
        "DownstreamPathTemplate": "/api/v1/ticket-types",
        "UpstreamPathTemplate": "/api/v1/ticket-types",

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
    },
    ]
}

function ticketTypesRead() {
    return [{
        "DownstreamPathTemplate": "/api/v1/ticket-types",
        "UpstreamPathTemplate": "/api/v1/ticket-types",
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
        "DownstreamPathTemplate": "/api/v1/ticket-types/{everything}",
        "UpstreamPathTemplate": "/api/v1/ticket-types/{everything}",
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
    ticketTypesRead,
    ticketTypesWrite
}
