function eventOrganiserRead() {
    return [{
        "DownstreamPathTemplate": "/api/v1/event-organisers",
        "UpstreamPathTemplate": "/api/v1/event-organisers",
        "UpstreamHttpMethod": [
            "Get"
        ],
        "QoSOptions": {
            "ExceptionsAllowedBeforeBreaking": 3,
            "DurationOfBreak": 10,
            "TimeoutValue": 5000
        },
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
        "DownstreamPathTemplate": "/api/v1/event-organisers/{everything}",
        "UpstreamPathTemplate": "/api/v1/event-organisers/{everything}",
        "UpstreamHttpMethod": [
            "Get"
        ],
        "QoSOptions": {
            "ExceptionsAllowedBeforeBreaking": 3,
            "DurationOfBreak": 10,
            "TimeoutValue": 5000
        },
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
    }]
}

function eventOrganiserWrite() {
    return [{
        "DownstreamPathTemplate": "/api/v1/event-organisers/{everything}",
        "UpstreamPathTemplate": "/api/v1/event-organisers/{everything}",

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
        },

    }]
}

module.exports = {
    eventOrganiserRead,
    eventOrganiserWrite
}