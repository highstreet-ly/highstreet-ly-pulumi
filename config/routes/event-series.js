function eventSeriesUploadFiles() {
    return [{
        "DownstreamPathTemplate": "/api/v1/event-series/uploadfiles",
        "UpstreamPathTemplate": "/api/v1/event-series/uploadfiles",

        "UpstreamHttpMethod": [
            "Post"
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

function eventSeriesWrite() {
    return [{
        "DownstreamPathTemplate": "/api/v1/event-series/{everything}",
        "UpstreamPathTemplate": "/api/v1/event-series/{everything}",
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
        "DownstreamPathTemplate": "/api/v1/event-series",
        "UpstreamPathTemplate": "/api/v1/event-series",

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


function eventSeriesRead() {
    return [{
        "DownstreamPathTemplate": "/api/v1/event-series",
        "UpstreamPathTemplate": "/api/v1/event-series",
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
        //"FileCacheOptions": { "TtlSeconds": 15 }
    },
    {
        "DownstreamPathTemplate": "/api/v1/event-series/{everything}",
        "UpstreamPathTemplate": "/api/v1/event-series/{everything}",
        "UpstreamHttpMethod": [
            "Get"
        ],
        "QoSOptions": {
            "ExceptionsAllowedBeforeBreaking": 3,
            "DurationOfBreak": 10,
            "TimeoutValue": 5000
        },
        "DownstreamScheme": "http",
        //"ServiceName":  "sonatribe-ticketmanagement-api",
        "DownstreamHostAndPorts": [
            {
                "Host": "sonatribe-ticketmanagement-api",
                "Port": 80,
            }
        ],
        "LoadBalancerOptions": {
            "Type": "LeastConnection"
        },
        //"FileCacheOptions": { "TtlSeconds": 15 }
    }]
}

module.exports = {
    eventSeriesRead,
    eventSeriesUploadFiles,
    eventSeriesWrite
}