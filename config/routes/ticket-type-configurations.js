function ticketTypeConfigurationsWrite() {
    return [{
        "DownstreamPathTemplate": "/api/v1/ticket-type-configurations/{everything}",
        "UpstreamPathTemplate": "/api/v1/ticket-type-configurations/{everything}",

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
        "DownstreamPathTemplate": "/api/v1/ticket-type-configurations",
        "UpstreamPathTemplate": "/api/v1/ticket-type-configurations",

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

function ticketTypeConfigurationsRead() {
    return [{
        "DownstreamPathTemplate": "/api/v1/ticket-type-configurations",
        "UpstreamPathTemplate": "/api/v1/ticket-type-configurations",
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
        "DownstreamPathTemplate": "/api/v1/ticket-type-configurations/{everything}",
        "UpstreamPathTemplate": "/api/v1/ticket-type-configurations/{everything}",
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
    ticketTypeConfigurationsRead,
    ticketTypeConfigurationsWrite
}
