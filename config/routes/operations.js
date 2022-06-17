let serviceAddress = "sonatribe-ticketreservations-api" //  '192.168.1.97'//

let servicePort =80 // 8087 //  

function operationsWrite() {
    return [{
        "DownstreamPathTemplate": "/api/v1/operations/{everything}",
        "UpstreamPathTemplate": "/api/v1/reservations/operations/{everything}",
        "UpstreamHttpMethod": [
            "Put",
            "Delete",
            "Post",
            "Patch"
        ],
        "QoSOptions": {
            "ExceptionsAllowedBeforeBreaking": 3,
            "DurationOfBreak": 1000,
            "TimeoutValue": 500000
        },
        "DownstreamScheme": "http",
        "DownstreamHostAndPorts": [
            {
                "Host": serviceAddress,
                "Port": servicePort,
            }
        ],
        "DownstreamHostAndPorts": [
            {
                "Host": serviceAddress,
                "Port": servicePort,
            }
        ],
        "LoadBalancerOptions": {
            "Type": "LeastConnection"
        }
    }, {
        "DownstreamPathTemplate": "/api/v1/operations",
        "UpstreamPathTemplate": "/api/v1/reservations/operations",
        "UpstreamHttpMethod": [
            "Put",
            "Delete",
            "Post",
            "Patch"
        ],
        "QoSOptions": {
            "ExceptionsAllowedBeforeBreaking": 3,
            "DurationOfBreak": 1000,
            "TimeoutValue": 500000
        },
        "DownstreamScheme": "http",
        "DownstreamHostAndPorts": [
            {
                "Host": serviceAddress,
                "Port": servicePort,
            }
        ],
        "DownstreamHostAndPorts": [
            {
                "Host": serviceAddress,
                "Port": servicePort,
            }
        ],
        "LoadBalancerOptions": {
            "Type": "LeastConnection"
        }
    },]
}

module.exports = {
    operationsWrite
}
