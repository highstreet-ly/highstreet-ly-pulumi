let serviceAddress = "sonatribe-ticketmanagement-api" //'192.168.1.130' // 

let servicePort = 80 //  8087 //    

function eventInstanceUploadFiles() {
    return [{
        "DownstreamPathTemplate": "/api/v1/event-instances/uploadfiles",
        "UpstreamPathTemplate": "/api/v1/event-instances/uploadfiles",

        "UpstreamHttpMethod": [
            "Post"
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
    }];
}
function eventInstanceUsage() {
    return [{
        "DownstreamPathTemplate": "/api/v1/event-instances/usage",
        "UpstreamPathTemplate": "/api/v1/event-instances/usage",

        "UpstreamHttpMethod": [
            "Put",
            "Delete",
            "Post",
            "Patch"
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
    }];
}

function eventInstanceWrite() {
    return [{
        "DownstreamPathTemplate": "/api/v1/event-instances",
        "UpstreamPathTemplate": "/api/v1/event-instances",
        "UpstreamHttpMethod": [
            "Put",
            "Delete",
            "Post",
            "Patch"
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
        "DownstreamPathTemplate": "/api/v1/event-instances/{everything}",
        "UpstreamPathTemplate": "/api/v1/event-instances/{everything}",
        "UpstreamHttpMethod": [
            "Put",
            "Delete",
            "Post",
            "Patch"
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

function eventInstanceRead() {
    return [{
        "DownstreamPathTemplate": "/api/v1/event-instances",
        "UpstreamPathTemplate": "/api/v1/event-instances",
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
                "Host": serviceAddress,
                "Port": servicePort,
            }
        ],
        "LoadBalancerOptions": {
            "Type": "LeastConnection"
        },
    },
    {
        "DownstreamPathTemplate": "/api/v1/event-instances/{everything}",
        "UpstreamPathTemplate": "/api/v1/event-instances/{everything}",
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
                "Host": serviceAddress,
                "Port": servicePort,
            }
        ],
        "LoadBalancerOptions": {
            "Type": "LeastConnection"
        },
    }];
}

module.exports = {
    eventInstanceRead,
    eventInstanceWrite,
    eventInstanceUploadFiles,
    eventInstanceUsage
}